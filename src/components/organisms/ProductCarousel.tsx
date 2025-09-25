"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/molecules";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  isLoading?: boolean;
  showNavigationAlways?: boolean;
  className?: string;
}

export function ProductCarousel({
  products,
  title,
  isLoading = false,
  showNavigationAlways = false,
  className,
}: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      setShowNavigation(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      const targetScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <div className={cn("w-full", className)}>
        {title && (
          <h2 className="text-xl font-bold text-foreground mb-6">{title}</h2>
        )}
        <div className="flex gap-6 overflow-hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-96 bg-skeleton rounded-lg animate-pulse"
              style={{
                width: "calc((100% - 4.5rem) / 4)",
                minWidth: "250px",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className={cn("w-full", className)}>
        {title && (
          <h2 className="text-xl font-bold text-foreground mb-6">{title}</h2>
        )}
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full relative", className)}>
      {title && (
        <h2 className="text-xl font-bold text-foreground mb-6">{title}</h2>
      )}

      <div className="relative group">
        {showNavigation && (showNavigationAlways || canScrollLeft) && (
          <button
            onClick={() => scroll("left")}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card/90 hover:bg-card border hover:border-border shadow-lg rounded-full p-2 transition-all duration-200",
              "opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0",
              canScrollLeft
                ? "cursor-pointer hover:shadow-xl"
                : "cursor-not-allowed opacity-50",
            )}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
        )}

        {showNavigation && (showNavigationAlways || canScrollRight) && (
          <button
            onClick={() => scroll("right")}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card/90 hover:bg-card border hover:border-border shadow-lg rounded-full p-2 transition-all duration-200",
              "opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0",
              canScrollRight
                ? "cursor-pointer hover:shadow-xl"
                : "cursor-not-allowed opacity-50",
            )}
            disabled={!canScrollRight}
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={checkScrollability}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0"
              style={{
                width: "calc((100% - 4.5rem) / 4)",
                minWidth: "275px",
              }}
            >
              <ProductCard
                product={product}
                className="h-full"
                priority={index < 6}
              />
            </div>
          ))}
        </div>

        {showNavigation && products.length > 4 && (
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({
              length: Math.ceil(products.length / 4),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const scrollAmount =
                      scrollContainerRef.current.clientWidth * index;
                    scrollContainerRef.current.scrollTo({
                      left: scrollAmount,
                      behavior: "smooth",
                    });
                  }
                }}
                className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-500 transition-colors duration-200"
              />
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
