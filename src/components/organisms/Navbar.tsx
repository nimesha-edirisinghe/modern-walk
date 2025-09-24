"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-3xl">Modern Walk</span>
        </Link>
      </div>
    </nav>
  );
}
