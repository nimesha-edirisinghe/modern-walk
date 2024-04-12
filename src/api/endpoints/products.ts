import apiClient from 'api/axiosInstances/apiClient';
import { ProductResponseI } from 'types/response/productResponse';

export const getProductRequest = async (
  queryParams: any
): Promise<ProductResponseI[]> => {
  try {
    const response = await apiClient.get('/products', {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
