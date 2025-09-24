import { ProductCard } from "@/components/molecules";
import { getProductsByCategory } from "@/data/products";

export default function WomensClothing() {
  const womensProducts = getProductsByCategory("women's clothing");

  return (
    <div className="bg-gray-50">
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {womensProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                className="h-full"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
