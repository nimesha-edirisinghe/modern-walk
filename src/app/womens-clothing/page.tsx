"use client";

import { ProductCard } from "@/components/molecules";
import { useProductsByCategory } from "@/lib/api/queries/productQueries";
import { useSortedProducts } from "@/hooks/useSortedProducts";
import { ProductSortOrder } from "@/utils/productSorting";

export default function WomensClothing() {
  const {
    data: womensProducts,
    isLoading,
    error,
  } = useProductsByCategory("women's clothing");

  const sortedWomensProducts = useSortedProducts(
    womensProducts,
    ProductSortOrder.LATEST_FIRST
  );

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600">
            Failed to load women&apos;s clothing. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-bold text-gray-900 mb-8">
            Women&apos;s Clothing
          </h1>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-96 bg-gray-200 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedWomensProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className="h-full"
                  priority={index < 8}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
