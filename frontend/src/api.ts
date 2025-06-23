import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

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

export type TotalDurationResponse = {
  total_duration: number;
};

const api = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const errorMessage = error.response.data?.detail || "An error occurred";
      alert(`Error: ${errorMessage}`);
      return Promise.reject(new Error(errorMessage));
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (userData: UserRegistration) => {
  console.log(VITE_API_URL);
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

export const create_pomo = async (token: string, duration: number) => {
  const response = await api.post(
    "/pomodoro_sessions/create-pomo",
    { duration },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getPomosLastDay = async (token: string): Promise<number> => {
  const response = await api.get<TotalDurationResponse>(
    "/pomodoro_sessions/pomos-last-day",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data.total_duration;
};

export const getPomosLastWeek = async (token: string): Promise<number> => {
  const response = await api.get<TotalDurationResponse>(
    "/pomodoro_sessions/pomos-last-week",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data.total_duration;
};

export const getPomosLastMonth = async (token: string): Promise<number> => {
  const response = await api.get<TotalDurationResponse>(
    "/pomodoro_sessions/pomos-last-month",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data.total_duration;
};

export type PomoSummary = {
  last_day_total: number;
  last_week_total: number;
  last_month_total: number;
};

export const getPomoSummary = async (token: string): Promise<PomoSummary> => {
  const [last_day_total, last_week_total, last_month_total] = await Promise.all(
    [getPomosLastDay(token), getPomosLastWeek(token), getPomosLastMonth(token)]
  );

  return { last_day_total, last_week_total, last_month_total };
};
