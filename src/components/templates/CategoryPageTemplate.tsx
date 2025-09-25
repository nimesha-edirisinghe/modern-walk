"use client";

import { ProductCard, ErrorState } from "@/components/molecules";
import { useProductsByCategory } from "@/lib/api/queries/productQueries";
import { useSortedProducts } from "@/hooks/useSortedProducts";
import { ProductSortOrder } from "@/utils/productSorting";

interface CategoryPageTemplateProps {
  category: string;
  title: string;
  errorMessage?: string;
}

export function CategoryPageTemplate({
  category,
  title,
  errorMessage,
}: CategoryPageTemplateProps) {
  const { data: products, isLoading, error } = useProductsByCategory(category);

  const sortedProducts = useSortedProducts(
    products,
    ProductSortOrder.LATEST_FIRST,
  );

  if (error) {
    return (
      <ErrorState
        message={
          errorMessage ||
          `Failed to load ${title.toLowerCase()}. Please try again later.`
        }
      />
    );
  }

  return (
    <div className="bg-background">
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-bold text-foreground mb-8">{title}</h1>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-96 bg-skeleton rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product, index) => (
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
