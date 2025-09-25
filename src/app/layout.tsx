import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { HydrationSafeBody } from "@/components/templates";
import { HydrationBoundary } from "@/providers/HydrationBoundary";
import { Navbar } from "@/components/organisms";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Modern Walk - Fashion E-commerce",
  description:
    "Discover the latest fashion trends with Modern Walk. Shop men's and women's clothing with amazing flash sales and deals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden bg-background`}
        suppressHydrationWarning
      >
        <HydrationBoundary>
          <HydrationSafeBody>
            <QueryProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Navbar />
                <main>{children}</main>
              </ThemeProvider>
            </QueryProvider>
          </HydrationSafeBody>
        </HydrationBoundary>
      </body>
    </html>
  );
}
