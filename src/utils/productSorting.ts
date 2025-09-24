import { Product } from "@/types/product";

/**
 * Product sorting utilities
 */

export enum ProductSortOrder {
  LATEST_FIRST = "latest_first",
  OLDEST_FIRST = "oldest_first",
  RATING_DESC = "rating_desc",
  RATING_ASC = "rating_asc",
  PRICE_ASC = "price_asc",
  PRICE_DESC = "price_desc",
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
}

type SortCompareFn = (a: Product, b: Product) => number;

/**
 * Sorting functions for different product criteria
 */
const sortingFunctions: Record<ProductSortOrder, SortCompareFn> = {
  [ProductSortOrder.LATEST_FIRST]: (a, b) => b.id - a.id,
  [ProductSortOrder.OLDEST_FIRST]: (a, b) => a.id - b.id,
  [ProductSortOrder.RATING_DESC]: (a, b) => b.rating.rate - a.rating.rate,
  [ProductSortOrder.RATING_ASC]: (a, b) => a.rating.rate - b.rating.rate,
  [ProductSortOrder.PRICE_ASC]: (a, b) => a.price - b.price,
  [ProductSortOrder.PRICE_DESC]: (a, b) => b.price - a.price,
  [ProductSortOrder.NAME_ASC]: (a, b) => a.title.localeCompare(b.title),
  [ProductSortOrder.NAME_DESC]: (a, b) => b.title.localeCompare(a.title),
};

/**
 * Sort products by the specified order
 * @param products - Array of products to sort
 * @param sortOrder - Sort order to apply
 * @returns Sorted array of products (new array, original is not mutated)
 */
export const sortProducts = (
  products: Product[],
  sortOrder: ProductSortOrder = ProductSortOrder.LATEST_FIRST
): Product[] => {
  if (!products || products.length === 0) {
    return [];
  }

  const sortFn = sortingFunctions[sortOrder];
  if (!sortFn) {
    console.warn(`Unknown sort order: ${sortOrder}. Using default sort.`);
    return [...products].sort(sortingFunctions[ProductSortOrder.LATEST_FIRST]);
  }

  return [...products].sort(sortFn);
};

/**
 * Get display name for sort order (useful for UI dropdowns)
 */
export const getSortOrderDisplayName = (
  sortOrder: ProductSortOrder
): string => {
  const displayNames: Record<ProductSortOrder, string> = {
    [ProductSortOrder.LATEST_FIRST]: "Latest First",
    [ProductSortOrder.OLDEST_FIRST]: "Oldest First",
    [ProductSortOrder.RATING_DESC]: "Highest Rated",
    [ProductSortOrder.RATING_ASC]: "Lowest Rated",
    [ProductSortOrder.PRICE_ASC]: "Price: Low to High",
    [ProductSortOrder.PRICE_DESC]: "Price: High to Low",
    [ProductSortOrder.NAME_ASC]: "Name: A to Z",
    [ProductSortOrder.NAME_DESC]: "Name: Z to A",
  };

  return displayNames[sortOrder] || "Unknown";
};
