"use client";

import { CategoryTile, ErrorState } from "@/components/molecules";
import { ProductCarousel } from "@/components/organisms";
import { useTopRatedProducts } from "@/lib/api/queries/productQueries";

export default function Home() {
  const { data: flashSaleProducts, isLoading, error } = useTopRatedProducts(5);

  if (error) {
    return (
      <ErrorState message="Failed to load products. Please try again later." />
    );
  }

  return (
    <div className="bg-gray-50">
      <section className="py-12">
        <div className="container mx-auto px-4">
          <ProductCarousel
            products={flashSaleProducts || []}
            title="Flash Sale"
            isLoading={isLoading}
            showNavigationAlways={true}
          />
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Categories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryTile
              title="Men's Clothing"
              href="/mens-clothing"
              variant="mens"
            />
            <CategoryTile
              title="Women's Clothing"
              href="/womens-clothing"
              variant="womens"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
