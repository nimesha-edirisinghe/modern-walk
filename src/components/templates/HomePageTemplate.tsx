"use client";

import { CategoryTile, ErrorState } from "@/components/molecules";
import { ProductCarousel } from "@/components/organisms";
import { useTopRatedProducts } from "@/lib/api/queries/productQueries";

interface HomePageTemplateProps {
  flashSaleTitle?: string;
  flashSaleProductCount?: number;
  categoriesTitle?: string;
  errorMessage?: string;
}

export function HomePageTemplate({
  flashSaleTitle = "Flash Sale",
  flashSaleProductCount = 5,
  categoriesTitle = "Categories",
  errorMessage = "Failed to load products. Please try again later.",
}: HomePageTemplateProps) {
  const {
    data: flashSaleProducts,
    isLoading,
    error,
  } = useTopRatedProducts(flashSaleProductCount);

  if (error) {
    return <ErrorState message={errorMessage} />;
  }

  return (
    <div className="bg-background">
      <section className="py-12">
        <div className="container mx-auto px-4">
          <ProductCarousel
            products={flashSaleProducts || []}
            title={flashSaleTitle}
            isLoading={isLoading}
            showNavigationAlways={true}
          />
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-foreground mb-8">
            {categoriesTitle}
          </h2>
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
