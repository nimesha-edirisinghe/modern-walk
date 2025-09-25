import React from "react";
import { render, screen } from "@testing-library/react";
import { CategoryTile } from "../CategoryTile";

describe("CategoryTile Component", () => {
  const defaultProps = {
    title: "Test Category",
    href: "/test-category",
    variant: "mens" as const,
  };

  it("renders with mens variant", () => {
    render(<CategoryTile {...defaultProps} />);

    const link = screen.getByRole("link", { name: /test category/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test-category");
    expect(link).toHaveClass("bg-brand-green");
  });

  it("renders with womens variant", () => {
    render(<CategoryTile {...defaultProps} variant="womens" />);

    const link = screen.getByRole("link", { name: /test category/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass("bg-brand-pink");
  });

  it("applies custom className", () => {
    render(<CategoryTile {...defaultProps} className="custom-class" />);

    const link = screen.getByRole("link", { name: /test category/i });
    expect(link).toHaveClass("custom-class");
  });

  it("renders title correctly", () => {
    render(<CategoryTile {...defaultProps} title="Custom Title" />);

    const heading = screen.getByRole("heading", { name: /custom title/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("text-3xl", "font-bold");
  });
});
