"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryTileProps {
  title: string;
  href: string;
  variant: "mens" | "womens";
  className?: string;
}

export function CategoryTile({
  title,
  href,
  variant,
  className,
}: CategoryTileProps) {
  const colorClass = variant === "mens" ? "bg-brand-green" : "bg-brand-pink";

  return (
    <Link
      href={href}
      className={cn(
        "block rounded-2xl text-card text-center p-12 transition-colors duration-200",
        "min-h-[200px] flex items-center justify-center",
        colorClass,
        className,
      )}
    >
      <h2 className="text-3xl font-bold">{title}</h2>
    </Link>
  );
}
