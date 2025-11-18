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
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
