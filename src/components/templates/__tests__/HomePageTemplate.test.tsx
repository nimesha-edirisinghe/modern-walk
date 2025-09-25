import React from "react";
import { render, screen } from "@testing-library/react";
import { HomePageTemplate } from "../HomePageTemplate";
import { useTopRatedProducts } from "@/lib/api/queries/productQueries";
import { Product } from "@/types/product";

jest.mock("@/lib/api/queries/productQueries", () => ({
  useTopRatedProducts: jest.fn(),
}));

jest.mock("@/components/molecules", () => ({
  CategoryTile: ({ title, variant }: { title: string; variant: string }) => (
    <div data-testid={`category-tile-${variant}`}>{title}</div>
  ),
  ErrorState: ({ message }: { message: string }) => (
    <div data-testid="error-state">{message}</div>
  ),
}));

jest.mock("@/components/organisms", () => ({
  ProductCarousel: ({
    products,
    title,
    isLoading,
  }: {
    products: Product[];
    title: string;
    isLoading: boolean;
  }) => (
    <div data-testid="product-carousel">
      <h2>{title}</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>Products: {products.length}</div>
      )}
    </div>
  ),
}));

describe("HomePageTemplate Component", () => {
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
      category: "women's clothing",
      image: "/image2.jpg",
      rating: { rate: 4.0, count: 80 },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default props", () => {
    (useTopRatedProducts as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });

    render(<HomePageTemplate />);

    expect(screen.getByText("Flash Sale")).toBeInTheDocument();
    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getByText("Men's Clothing")).toBeInTheDocument();
    expect(screen.getByText("Women's Clothing")).toBeInTheDocument();
  });

  it("renders with custom props", () => {
    (useTopRatedProducts as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });

    render(
      <HomePageTemplate
        flashSaleTitle="Special Sale"
        categoriesTitle="Shop By Category"
        flashSaleProductCount={3}
      />,
    );

    expect(screen.getByText("Special Sale")).toBeInTheDocument();
    expect(screen.getByText("Shop By Category")).toBeInTheDocument();
    expect(useTopRatedProducts).toHaveBeenCalledWith(3);
  });

  it("renders loading state correctly", () => {
    (useTopRatedProducts as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<HomePageTemplate />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state with default error message", () => {
    (useTopRatedProducts as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Failed to fetch"),
    });

    render(<HomePageTemplate />);

    expect(screen.getByTestId("error-state")).toHaveTextContent(
      "Failed to load products. Please try again later.",
    );
  });

  it("renders error state with custom error message", () => {
    (useTopRatedProducts as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Failed to fetch"),
    });

    const customError = "Custom error message";
    render(<HomePageTemplate errorMessage={customError} />);

    expect(screen.getByTestId("error-state")).toHaveTextContent(customError);
  });

  it("renders category tiles with correct variants", () => {
    (useTopRatedProducts as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });

    render(<HomePageTemplate />);

    expect(screen.getByTestId("category-tile-mens")).toBeInTheDocument();
    expect(screen.getByTestId("category-tile-womens")).toBeInTheDocument();
  });

  it("renders with correct layout structure", () => {
    (useTopRatedProducts as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });

    render(<HomePageTemplate />);

    const sections = document.querySelectorAll("section");
    expect(sections).toHaveLength(2);

    const categoryGrid = document.querySelector(".grid");
    expect(categoryGrid).toHaveClass("grid-cols-1", "lg:grid-cols-2", "gap-6");
  });

  it("passes correct props to ProductCarousel", () => {
    (useTopRatedProducts as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });

    render(<HomePageTemplate />);

    const carousel = screen.getByTestId("product-carousel");
    expect(carousel).toBeInTheDocument();
    expect(carousel).toHaveTextContent("Products: 2");
  });
});
