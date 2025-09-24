import axios, { AxiosInstance } from "axios";
import { requestInterceptor } from "./interceptors/request.interceptor";
import { responseInterceptor } from "./interceptors/response.interceptor";

export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use(
  responseInterceptor.onFulfilled,
  responseInterceptor.onRejected
);
