import { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const responseInterceptor = {
  onFulfilled: (response: AxiosResponse) => response,
  onRejected: (error: AxiosError) => {
    if (error.response) {
      throw new ApiError(
        `API request failed: ${error.response.statusText}`,
        error.response.status,
        error.response.statusText,
      );
    } else if (error.request) {
      throw new ApiError("Network error occurred", 0, "Network Error");
    } else {
      throw new ApiError("Request setup error", 0, "Request Error");
    }
  },
};

export const setupResponseInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.response.use(
    responseInterceptor.onFulfilled,
    responseInterceptor.onRejected,
  );
};
