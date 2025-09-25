import { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const simulateDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  if (process.env.NODE_ENV === "development") {
    await simulateDelay();
  }
  return config;
};

export const setupRequestInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.request.use(requestInterceptor);
};
