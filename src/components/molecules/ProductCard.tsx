"use client";

import Image from "next/image";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const cardColorClass =
    product.category === "men's clothing"
      ? "bg-green-300 text-green-800"
      : "bg-pink-300 text-pink-800";

  return (
    <div
      className={cn("bg-white rounded-lg shadow-lg overflow-hidden", className)}
    >
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-center">
          {product.title}
        </h3>
        {/* Product Image */}
        <div className="h-52 relative  mt-3 rounded-md overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain px-6 py-2"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      </div>

      <div className="h-full">
        <div
          className={cn("rounded-lg p-3 text-center h-full", cardColorClass)}
        >
          <div className="text-lg font-bold mb-2">
            Rs {product.price.toFixed(2)}
          </div>
          <p className="text-sm leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
