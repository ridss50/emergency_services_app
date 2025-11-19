import axios from "axios";
import { Ambulance, Doctor, PaginatedResponse } from "../types";

const API_BASE_URL = "http://localhost:5000/api";
// const API_BASE_URL = "https://emergency-services-app-2.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const ambulanceService = {
  getAll: (page: number = 1, limit: number = 10) =>
    api.get<PaginatedResponse<Ambulance>>(
      `/ambulances?page=${page}&limit=${limit}`
    ),

  getById: (id: string) => api.get<Ambulance>(`/ambulances/${id}`),

  create: (data: FormData) =>
    api.post<Ambulance>("/ambulances", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  update: (id: string, data: FormData) =>
    api.put<Ambulance>(`/ambulances/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  delete: (id: string) => api.delete(`/ambulances/${id}`),

  getCount: () => api.get<{ count: number }>("/ambulances/count"),
};

export const doctorService = {
  getAll: (page: number = 1, limit: number = 10) =>
    api.get<PaginatedResponse<Doctor>>(`/doctors?page=${page}&limit=${limit}`),

  getById: (id: string) => api.get<Doctor>(`/doctors/${id}`),

  create: (data: FormData) =>
    api.post<Doctor>("/doctors", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  update: (id: string, data: FormData) =>
    api.put<Doctor>(`/doctors/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  delete: (id: string) => api.delete(`/doctors/${id}`),

  getCount: () => api.get<{ count: number }>("/doctors/count"),
};



