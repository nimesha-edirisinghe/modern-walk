import { useMemo } from "react";
import { Product } from "@/types/product";
import { sortProducts, ProductSortOrder } from "@/utils/productSorting";

/**
 * Custom hook for sorting products with memoization
 * @param products - Array of products to sort
 * @param sortOrder - Sort order to apply (defaults to latest first)
 * @returns Memoized sorted array of products
 */
export const useSortedProducts = (
  products: Product[] | undefined,
  sortOrder: ProductSortOrder = ProductSortOrder.LATEST_FIRST
): Product[] => {
  return useMemo(() => {
    if (!products) return [];
    return sortProducts(products, sortOrder);
  }, [products, sortOrder]);
};
