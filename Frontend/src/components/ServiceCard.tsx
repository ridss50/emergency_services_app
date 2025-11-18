import React from "react";
import styled from "styled-components";
import { Ambulance, Doctor } from "../types";

const Card = styled.div`
  background: white;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.div<{ $imageUrl?: string }>`
  height: 200px;
  background: ${(props) =>
    props.$imageUrl
      ? `url(${props.$imageUrl}) center/cover`
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const CardContent = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
`;

const CardTitle = styled.h3`
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.dark};
`;

const CardDescription = styled.p`
  color: ${(props) => props.theme.colors.secondary};
  margin-bottom: ${(props) => props.theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.secondary};
  font-size: 0.9rem;
`;

const StatusBadge = styled.span<{ $available: boolean }>`
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  background: ${(props) =>
    props.$available ? props.theme.colors.success : props.theme.colors.danger};
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
`;

interface ServiceCardProps {
  service: Ambulance | Doctor;
  type: "ambulance" | "doctor";
  onEdit?: (service: Ambulance | Doctor) => void;
  onDelete?: (id: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  type,
  onEdit,
  onDelete,
}) => {
  const isDoctor = type === "doctor";
  const doctor = service as Doctor;

  return (
    <Card>
      <CardImage $imageUrl={service.image}>
        {!service.image && (isDoctor ? "👨‍⚕️" : "🚑")}
      </CardImage>
      <CardContent>
        <CardTitle>{service.title}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
        <CardDetails>
          <DetailItem>📍 {service.location}</DetailItem>
          <DetailItem>📞 {service.contactNumber}</DetailItem>
          {isDoctor && (
            <>
              <DetailItem>🎯 {doctor.specialization}</DetailItem>
              <DetailItem>💼 {doctor.experience} years experience</DetailItem>
            </>
          )}
          <DetailItem>
            <StatusBadge $available={service.isAvailable}>
              {service.isAvailable ? "Available" : "Unavailable"}
            </StatusBadge>
          </DetailItem>
        </CardDetails>
        {(onEdit || onDelete) && (
          <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
            {onEdit && (
              <button
                onClick={() => onEdit(service)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(service.id)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Delete
              </button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
