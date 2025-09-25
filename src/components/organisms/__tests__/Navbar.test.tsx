import React from "react";
import { render, screen } from "@testing-library/react";
import { Navbar } from "../Navbar";

jest.mock("@/components/molecules", () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher">Theme Switcher</div>,
}));

describe("Navbar Component", () => {
  it("renders the navbar with logo and theme switcher", () => {
    render(<Navbar />);

    const logoLink = screen.getByRole("link", { name: /modern walk/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/");

    const logoText = screen.getByText("Modern Walk");
    expect(logoText).toBeInTheDocument();
    expect(logoText).toHaveClass("font-bold", "text-3xl");

    const themeSwitcher = screen.getByTestId("theme-switcher");
    expect(themeSwitcher).toBeInTheDocument();
  });

  it("renders with correct styling", () => {
    render(<Navbar />);

    const navbar = screen.getByRole("navigation");
    expect(navbar).toHaveClass(
      "sticky",
      "top-0",
      "z-50",
      "w-full",
      "border-b",
      "bg-background",
      "backdrop-blur",
    );

    // Check inner container styling
    const innerContainer = navbar.firstElementChild;
    expect(innerContainer).toHaveClass(
      "container",
      "mx-auto",
      "flex",
      "h-16",
      "items-center",
      "justify-between",
      "px-4",
    );
  });

  it("has correct layout structure", () => {
    const { container } = render(<Navbar />);
    const navbarSections =
      container.firstElementChild?.firstElementChild?.childNodes;
    expect(navbarSections).toHaveLength(3);
  });

  it("renders logo link with correct attributes", () => {
    render(<Navbar />);

    const logoLink = screen.getByRole("link", { name: /modern walk/i });
    expect(logoLink).toHaveClass("flex", "items-center", "space-x-2");
  });
});
