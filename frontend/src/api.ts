// src/api.ts
import axios from "axios";

const API_URL = "http://localhost:8000";

// Types matching your FastAPI models
export type UserCredentials = {
  email: string;
  password: string;
};

export type UserRegistration = {
  username: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  access_token: string;
  token_type: string;
};

// Axios instance with base config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const errorMessage = error.response.data?.detail || "An error occurred";
      return Promise.reject(new Error(errorMessage));
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (userData: UserRegistration) => {
  const response = await api.post("/auth/create-user", userData);
  return response.data;
};

export const loginUser = async (credentials: UserCredentials) => {
  const params = new URLSearchParams();
  params.append("username", credentials.email);
  params.append("password", credentials.password);

  const response = await api.post("/auth/authorize", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response.data as AuthResponse;
};

export const getCurrentUser = async (token: string) => {
  const response = await api.get("/users/current", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
