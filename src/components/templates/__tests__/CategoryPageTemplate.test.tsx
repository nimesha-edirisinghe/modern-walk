import React from "react";
import { render, screen } from "@testing-library/react";
import { CategoryPageTemplate } from "../CategoryPageTemplate";
import { useProductsByCategory } from "@/lib/api/queries/productQueries";
import { Product } from "@/types/product";

jest.mock("@/lib/api/queries/productQueries", () => ({
  useProductsByCategory: jest.fn(),
}));

jest.mock("@/hooks/useSortedProducts", () => ({
  useSortedProducts: jest.fn((products) => products || []),
}));

jest.mock("@/components/molecules", () => ({
  ProductCard: ({ product }: { product: Product }) => (
    <div data-testid="product-card">{product.title}</div>
  ),
  ErrorState: ({ message }: { message: string }) => (
    <div data-testid="error-state">{message}</div>
  ),
}));

describe("CategoryPageTemplate Component", () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Product 1",
      price: 99.99,
      description: "Description 1",
      category: "men's clothing",
      image: "/image1.jpg",
      rating: { rate: 4.5, count: 100 },
    },
    {
      id: 2,
      title: "Product 2",
      price: 89.99,
      description: "Description 2",
      category: "men's clothing",
      image: "/image2.jpg",
      rating: { rate: 4.0, count: 80 },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state correctly", () => {
    (useProductsByCategory as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <CategoryPageTemplate category="men's clothing" title="Men's Clothing" />,
    );

    expect(screen.getByText("Men's Clothing")).toBeInTheDocument();
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons).toHaveLength(8);
  });

  it("renders error state with default error message", () => {
    (useProductsByCategory as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Failed to fetch"),
    });

    render(
      <CategoryPageTemplate category="men's clothing" title="Men's Clothing" />,
    );

    expect(screen.getByTestId("error-state")).toHaveTextContent(
      "Failed to load men's clothing. Please try again later.",
    );
  });

  it("renders error state with custom error message", () => {
    (useProductsByCategory as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Failed to fetch"),
    });

    const customError = "Custom error message";
    render(
      <CategoryPageTemplate
        category="men's clothing"
        title="Men's Clothing"
        errorMessage={customError}
      />,
    );

    expect(screen.getByTestId("error-state")).toHaveTextContent(customError);
  });

  it("renders products correctly", () => {
    (useProductsByCategory as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });

    render(
      <CategoryPageTemplate category="men's clothing" title="Men's Clothing" />,
    );

    expect(screen.getByText("Men's Clothing")).toBeInTheDocument();
    expect(screen.getAllByTestId("product-card")).toHaveLength(
      mockProducts.length,
    );
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("renders with correct layout classes", () => {
    (useProductsByCategory as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });

    render(
      <CategoryPageTemplate category="men's clothing" title="Men's Clothing" />,
    );

    const container = screen
      .getByText("Men's Clothing")
      .closest(".bg-background");
    expect(container).toBeInTheDocument();

    const grid = document.querySelector(".grid");
    expect(grid).toHaveClass(
      "grid-cols-1",
      "sm:grid-cols-2",
      "lg:grid-cols-3",
      "xl:grid-cols-4",
      "gap-6",
    );
  });

  it("sets priority correctly for product cards", () => {
    const manyProducts = Array.from({ length: 10 }, (_, i) => ({
      ...mockProducts[0],
      id: i + 1,
      title: `Product ${i + 1}`,
    }));

    (useProductsByCategory as jest.Mock).mockReturnValue({
      data: manyProducts,
      isLoading: false,
      error: null,
    });

    render(
      <CategoryPageTemplate category="men's clothing" title="Men's Clothing" />,
    );

    const productCards = screen.getAllByTestId("product-card");
    expect(productCards).toHaveLength(manyProducts.length);
  });
});
