import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/productService";
import { productKeys } from "../keys";

const STALE_TIME = 20 * 60 * 1000;

const defaultOptions = {
  staleTime: STALE_TIME,
  refetchOnMount: true,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
  retry: 3,
  retryDelay: 1000,
};

export const useProducts = () => {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: productService.getProducts,
    ...defaultOptions,
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: productKeys.list({ category }),
    queryFn: () => productService.getProductsByCategory(category),
    enabled: !!category,
    ...defaultOptions,
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
    ...defaultOptions,
  });
};

export const useTopRatedProducts = (limit?: number) => {
  return useQuery({
    queryKey: productKeys.list({ topRated: true, limit }),
    queryFn: () => productService.getTopRatedProducts(limit),
    ...defaultOptions,
  });
};
