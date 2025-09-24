"use client";

import { CategoryTile } from "@/components/molecules";
import { ProductCarousel } from "@/components/organisms";
import { useTopRatedProducts } from "@/lib/api/queries/productQueries";

export default function Home() {
  const { data: flashSaleProducts, isLoading, error } = useTopRatedProducts(5);

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600">
            Failed to load products. Please try again later.
          </p>
        </div>
      </div>
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
