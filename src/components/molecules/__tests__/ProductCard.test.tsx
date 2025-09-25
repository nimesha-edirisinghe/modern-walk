import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "../ProductCard";
import { Product } from "@/types/product";

jest.mock("@/hooks/useTextTruncation", () => ({
  useTextTruncation: () => [null, false],
}));

describe("ProductCard Component", () => {
  const mockProduct: Product = {
    id: 1,
    title: "Test Product",
    price: 99.99,
    description: "Test product description",
    category: "men's clothing",
    image: "/test-image.jpg",
    rating: {
      rate: 4.5,
      count: 100,
    },
  };

  it("renders product details correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("Test product description")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toBeInTheDocument();
  });

  it("applies correct color class for mens clothing", () => {
    render(<ProductCard product={mockProduct} />);

    const colorContainer = screen
      .getByText("$99.99")
      .closest("div")?.parentElement;
    expect(colorContainer).toHaveClass(
      "bg-brand-green",
      "text-brand-foreground",
    );
  });

  it("applies correct color class for womens clothing", () => {
    const womensProduct = { ...mockProduct, category: "women's clothing" };
    render(<ProductCard product={womensProduct} />);

    const colorContainer = screen
      .getByText("$99.99")
      .closest("div")?.parentElement;
    expect(colorContainer).toHaveClass(
      "bg-brand-pink",
      "text-brand-foreground",
    );
  });

  it("applies custom className", () => {
    render(<ProductCard product={mockProduct} className="custom-class" />);

    const container = screen.getByText("Test Product").closest(".bg-card");
    expect(container).toHaveClass("custom-class");
  });

  it("formats price correctly", () => {
    const productWithDecimal = { ...mockProduct, price: 99.9 };
    render(<ProductCard product={productWithDecimal} />);

    expect(screen.getByText("$99.90")).toBeInTheDocument();
  });

  it("sets correct image loading priority", () => {
    render(<ProductCard product={mockProduct} priority={true} />);

    const image = screen.getByAltText("Test Product");
    expect(image).toHaveAttribute("loading", "eager");
  });

  it("uses lazy loading by default", () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText("Test Product");
    expect(image).toHaveAttribute("loading", "lazy");
  });

  it("renders with correct base styles", () => {
    render(<ProductCard product={mockProduct} />);

    const container = screen.getByText("Test Product").closest(".bg-card");
    expect(container).toHaveClass("rounded-lg", "shadow-lg", "overflow-hidden");
  });

  it("renders title with correct styles", () => {
    render(<ProductCard product={mockProduct} />);

    const title = screen.getByText("Test Product");
    expect(title).toHaveClass(
      "font-semibold",
      "text-foreground",
      "text-center",
    );
  });

  it("renders description with correct styles", () => {
    render(<ProductCard product={mockProduct} />);

    const description = screen.getByText("Test product description");
    expect(description).toHaveClass("text-sm", "leading-relaxed");
  });
});
