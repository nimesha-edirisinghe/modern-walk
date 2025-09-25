import axios, { AxiosInstance } from "axios";
import { setupRequestInterceptor } from "./interceptors/request.interceptor";
import { setupResponseInterceptor } from "./interceptors/response.interceptor";

export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

setupRequestInterceptor(apiClient);
setupResponseInterceptor(apiClient);
