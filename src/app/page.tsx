import { ProductCard, CategoryTile } from "@/components/molecules";
import { getTopRatedProducts } from "@/data/products";

export default function Home() {
  const flashSaleProducts = getTopRatedProducts();

  return (
    <div className="bg-gray-50">
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Flash Sale</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSaleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                className="h-full"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Categories</h2>

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
