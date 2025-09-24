import { Product } from "@/types/product";
import { apiClient } from "../client";

export const productService = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>("/products");
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(
      `/products/category/${encodeURIComponent(category)}`
    );
    return response.data;
  },

  // Get single product by ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    const response = await apiClient.get<string[]>("/products/categories");
    return response.data;
  },

  // Get top rated products
  getTopRatedProducts: async (limit: number = 4): Promise<Product[]> => {
    const allProducts = await productService.getProducts();
    return allProducts
      .filter((product) => product.rating.rate >= 4.0)
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, limit);
  },
};
