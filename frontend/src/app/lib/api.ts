import { ApiResponse, User, Aliment, Recette } from '../types';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Users API
export const getUsers = () => 
  fetchApi<ApiResponse<User[]>>('/users');

export const getUser = (id: number) => 
  fetchApi<ApiResponse<User>>(`/users/${id}`);

export const createUser = (data: Omit<User, 'id'>) => 
  fetchApi<ApiResponse<User>>('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateUser = (id: number, data: Partial<User>) => 
  fetchApi<ApiResponse<User>>(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteUser = (id: number) => 
  fetchApi<ApiResponse<void>>(`/users/${id}`, {
    method: 'DELETE',
  });

// Aliments API
export const getAliments = () => 
  fetchApi<ApiResponse<Aliment[]>>('/aliments');

export const getAliment = (id: number) => 
  fetchApi<ApiResponse<Aliment>>(`/aliments/${id}`);

export const createAliment = (data: Omit<Aliment, 'id'>) => 
  fetchApi<ApiResponse<Aliment>>('/aliments', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateAliment = (id: number, data: Partial<Aliment>) => 
  fetchApi<ApiResponse<Aliment>>(`/aliments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteAliment = (id: number) => 
  fetchApi<ApiResponse<void>>(`/aliments/${id}`, {
    method: 'DELETE',
  });

// Recettes API
export const getRecettes = () => 
  fetchApi<ApiResponse<Recette[]>>('/recettes');

export const getRecette = (id: number) => 
  fetchApi<ApiResponse<Recette>>(`/recettes/${id}`);

export const createRecette = (data: Omit<Recette, 'id'>) => 
  fetchApi<ApiResponse<Recette>>('/recettes', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateRecette = (id: number, data: Partial<Recette>) => 
  fetchApi<ApiResponse<Recette>>(`/recettes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteRecette = (id: number) => 
  fetchApi<ApiResponse<void>>(`/recettes/${id}`, {
    method: 'DELETE',
  });

export const getRecettesByUser = (userId: number) => 
  fetchApi<ApiResponse<Recette[]>>(`/recettes/user/${userId}`);
