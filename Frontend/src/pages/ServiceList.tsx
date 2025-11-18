import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Ambulance, Doctor, ServiceType } from "../types";
import { ambulanceService, doctorService } from "../services/api";
import ServiceCard from "../components/ServiceCard";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import ErrorMessage from "../components/Common/ErrorMessage";
import EmptyState from "../components/Common/EmptyState";
import ServiceForm from "../components/ServiceForm";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.xl};
`;

const Header = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.md};
`;

const Title = styled.h2`
  color: ${(props) => props.theme.colors.dark};
  margin: 0;
`;

const Stats = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme.colors.secondary};
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  background: white;
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatNumber = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
`;

const StatLabel = styled.span`
  font-size: 0.8rem;
  margin-top: ${(props) => props.theme.spacing.xs};
`;

const Actions = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  margin-left: auto;
`;

const Button = styled.button`
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.lg};
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${(props) => props.theme.spacing.xl};
`;

const ModalContent = styled.div`
  background: white;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

interface ServiceListProps {
  type: ServiceType;
}

const ServiceList: React.FC<ServiceListProps> = ({ type }) => {
  const [services, setServices] = useState<(Ambulance | Doctor)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<
    Ambulance | Doctor | null
  >(null);
  const [formLoading, setFormLoading] = useState(false);

  const serviceTypeLabel = type === "ambulances" ? "Ambulance" : "Doctor";
  const service = type === "ambulances" ? ambulanceService : doctorService;

  const fetchServices = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await service.getAll(page, 10);
      setServices(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalCount(response.data.total);
    } catch (err) {
      setError("Failed to fetch services. Please try again.");
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCount = async () => {
    try {
      const response = await service.getCount();
      setTotalCount(response.data.count);
    } catch (err) {
      console.error("Error fetching count:", err);
    }
  };

  useEffect(() => {
    fetchServices(currentPage);
    fetchCount();
  }, [type, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreate = () => {
    setEditingService(null);
    setShowForm(true);
  };

  const handleEdit = (service: Ambulance | Doctor) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await service.delete(id);
        fetchServices(currentPage);
        fetchCount();
      } catch (err) {
        setError("Failed to delete service. Please try again.");
        console.error("Error deleting service:", err);
      }
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    try {
      setFormLoading(true);
      if (editingService) {
        await service.update(editingService.id, formData);
      } else {
        await service.create(formData);
      }
      setShowForm(false);
      setEditingService(null);
      fetchServices(currentPage);
      fetchCount();
    } catch (err) {
      setError(
        `Failed to ${
          editingService ? "update" : "create"
        } service. Please try again.`
      );
      console.error("Error submitting form:", err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingService(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error && services.length === 0) {
    return <ErrorMessage message={error} />;
  }

  return (
    <Container>
      <Header>
        <Title>
          {serviceTypeLabel}s ({totalCount})
        </Title>
        <Stats>
          <StatItem>Total: {totalCount}</StatItem>
          <StatItem>
            Page: {currentPage} of {totalPages}
          </StatItem>
        </Stats>
        <Actions>
          <Button onClick={handleCreate}>Add {serviceTypeLabel}</Button>
        </Actions>
      </Header>

      {error && (
        <div style={{ marginBottom: "16px", color: "red" }}>{error}</div>
      )}

      {services.length === 0 ? (
        <EmptyState
          title={`No ${serviceTypeLabel}s Found`}
          description={`There are no ${serviceTypeLabel.toLowerCase()}s available at the moment.`}
          action={
            <Button onClick={handleCreate}>Add First {serviceTypeLabel}</Button>
          }
        />
      ) : (
        <>
          <Grid>
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                type={type === "ambulances" ? "ambulance" : "doctor"}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </Grid>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {showForm && (
        <Modal>
          <ModalContent>
            <ServiceForm
              type={type}
              service={editingService}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              isLoading={formLoading}
            />
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default ServiceList;
