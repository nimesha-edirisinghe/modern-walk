"use client";

import Image from "next/image";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/atoms";
import { useTextTruncation } from "@/hooks/useTextTruncation";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({
  product,
  className,
  priority = false,
}: ProductCardProps) {
  const [titleRef, isTitleTruncated] = useTextTruncation<HTMLHeadingElement>(
    product.title
  );
  const [descriptionRef, isDescriptionTruncated] =
    useTextTruncation<HTMLParagraphElement>(product.description);

  const cardColorClass =
    product.category === "men's clothing"
      ? "bg-brand-green text-brand-foreground"
      : "bg-brand-pink text-brand-foreground";

  return (
    <div
      className={cn("bg-white rounded-lg shadow-lg overflow-hidden", className)}
    >
      <div className="p-4">
        <div className="h-12 flex justify-center">
          {isTitleTruncated ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <h3
                  ref={titleRef}
                  className="font-semibold text-gray-900 text-center w-full px-2"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: "1.2em",
                    maxHeight: "2.4em",
                  }}
                >
                  {product.title}
                </h3>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-xs bg-white text-gray-900 border border-gray-200 shadow-lg"
              >
                <p>{product.title}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <h3
              ref={titleRef}
              className="font-semibold text-gray-900 text-center w-full px-2"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "1.2em",
                maxHeight: "2.4em",
              }}
            >
              {product.title}
            </h3>
          )}
        </div>

        <div className="h-40 relative  mt-3 rounded-md overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain px-6 py-2"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />
        </div>
      </div>

      <div className="h-40 flex flex-col">
        <div
          className={cn(
            "rounded-lg p-3 text-center flex-grow flex flex-col ",
            cardColorClass
          )}
        >
          <div className="text-lg font-bold mb-2">
            ${product.price.toFixed(2)}
          </div>
          {isDescriptionTruncated ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <p
                  ref={descriptionRef}
                  className="text-sm leading-relaxed flex-grow mb-4 text-card-foreground cursor-pointer"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.description}
                </p>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-sm bg-white text-gray-900 border border-gray-200 shadow-lg"
              >
                <p className="text-sm">{product.description}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <p
              ref={descriptionRef}
              className="text-sm leading-relaxed flex-grow mb-4 text-card-foreground"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {product.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
