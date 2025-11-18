export interface Ambulance {
  id: string;
  title: string;
  description: string;
  location: string;
  image?: string;
  latitude?: number;
  longitude?: number;
  contactNumber: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  id: string;
  title: string;
  description: string;
  location: string;
  image?: string;
  latitude?: number;
  longitude?: number;
  specialization: string;
  contactNumber: string;
  isAvailable: boolean;
  experience: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type ServiceType = "ambulances" | "doctors";
