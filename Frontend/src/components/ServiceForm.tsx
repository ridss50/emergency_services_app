import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Ambulance, Doctor, ServiceType } from '../types';

const Form = styled.form`
  background: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-weight: bold;
  color: ${props => props.theme.colors.dark};
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid #ddd;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid #ddd;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid #ddd;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 1rem;
  cursor: pointer;
  background: ${props => 
    props.$variant === 'secondary' ? props.theme.colors.secondary : props.theme.colors.primary
  };
  color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${props => 
      props.$variant === 'secondary' ? '#5a6268' : '#0056b3'
    };
  }

  &:disabled {
    background: ${props => props.theme.colors.secondary};
    cursor: not-allowed;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
`;

interface ServiceFormProps {
  type: ServiceType;
  service?: Ambulance | Doctor | null;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ 
  type, 
  service, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    contactNumber: '',
    latitude: '',
    longitude: '',
    isAvailable: true,
    ...(type === 'doctors' && {
      specialization: '',
      experience: ''
    })
  });

  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        location: service.location,
        contactNumber: service.contactNumber,
        latitude: service.latitude?.toString() || '',
        longitude: service.longitude?.toString() || '',
        isAvailable: service.isAvailable,
        ...(type === 'doctors' && {
          specialization: (service as Doctor).specialization,
          experience: (service as Doctor).experience?.toString() || ''
        })
      });
    }
  }, [service, type]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('contactNumber', formData.contactNumber);
    formDataToSend.append('latitude', formData.latitude);
    formDataToSend.append('longitude', formData.longitude);
    formDataToSend.append('isAvailable', formData.isAvailable.toString());

    if (type === 'doctors') {
      formDataToSend.append('specialization', (formData as any).specialization);
      formDataToSend.append('experience', (formData as any).experience);
    }

    if (image) {
      formDataToSend.append('image', image);
    }

    onSubmit(formDataToSend);
  };

  const isDoctor = type === 'doctors';

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="title">Title *</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="description">Description *</Label>
        <TextArea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="location">Location *</Label>
        <Input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="contactNumber">Contact Number *</Label>
        <Input
          type="tel"
          id="contactNumber"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleInputChange}
          required
        />
      </FormGroup>

      {isDoctor && (
        <>
          <FormGroup>
            <Label htmlFor="specialization">Specialization *</Label>
            <Input
              type="text"
              id="specialization"
              name="specialization"
              value={(formData as any).specialization}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="experience">Experience (years) *</Label>
            <Input
              type="number"
              id="experience"
              name="experience"
              value={(formData as any).experience}
              onChange={handleInputChange}
              min="0"
              required
            />
          </FormGroup>
        </>
      )}

      <FormGroup>
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          type="number"
          id="latitude"
          name="latitude"
          step="any"
          value={formData.latitude}
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          type="number"
          id="longitude"
          name="longitude"
          step="any"
          value={formData.longitude}
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="image">Image</Label>
        <Input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </FormGroup>

      <FormGroup>
        <CheckboxLabel>
          <Checkbox
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleInputChange}
          />
          Available
        </CheckboxLabel>
      </FormGroup>

      <ButtonGroup>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : (service ? 'Update' : 'Create')}
        </Button>
        <Button type="button" $variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default ServiceForm;