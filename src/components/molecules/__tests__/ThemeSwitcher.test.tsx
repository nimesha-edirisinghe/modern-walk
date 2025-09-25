import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { useTheme } from "next-themes";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

describe("ThemeSwitcher Component", () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders theme switcher button with correct attributes", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
    });

    render(<ThemeSwitcher />);

    const button = screen.getByRole("button", { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Toggle theme");
    expect(button).toHaveClass("cursor-pointer");
  });

  it("toggles theme from light to dark when clicked", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
    });

    render(<ThemeSwitcher />);

    const button = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("toggles theme from dark to light when clicked", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "dark",
      setTheme: mockSetTheme,
    });

    render(<ThemeSwitcher />);

    const button = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("renders sun and moon icons", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
    });

    render(<ThemeSwitcher />);

    const sunIcon = document.querySelector(".scale-100");
    const moonIcon = document.querySelector(".scale-0");

    expect(sunIcon).toBeInTheDocument();
    expect(moonIcon).toBeInTheDocument();
  });

  it("includes screen reader text", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
    });

    render(<ThemeSwitcher />);

    expect(screen.getByText("Toggle theme")).toHaveClass("sr-only");
  });

  it("returns null when not mounted", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
    });

    const useState = jest.spyOn(React, "useState");
    useState.mockImplementationOnce(() => [false, jest.fn()]);

    const { container } = render(<ThemeSwitcher />);
    expect(container.firstChild).toBeNull();
  });
});
