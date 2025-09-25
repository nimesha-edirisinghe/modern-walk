"use client";

import Link from "next/link";
import { ThemeSwitcher } from "@/components/molecules";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div></div>
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-3xl">Modern Walk</span>
        </Link>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
