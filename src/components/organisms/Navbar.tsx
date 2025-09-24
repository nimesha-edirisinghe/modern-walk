"use client";

import Link from "next/link";
import { ThemeSwitcher } from "@/components/molecules";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-lg">Modern Walk</span>
        </Link>
        <div className="flex items-center">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
