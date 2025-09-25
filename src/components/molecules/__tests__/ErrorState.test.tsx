import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorState } from "../ErrorState";

describe("ErrorState Component", () => {
  const defaultMessage = "An error occurred while processing your request.";

  it("renders with default title and provided message", () => {
    render(<ErrorState message={defaultMessage} />);

    const title = screen.getByRole("heading", {
      name: /oops! something went wrong/i,
    });
    const message = screen.getByText(defaultMessage);

    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    const customTitle = "Custom Error Title";
    render(<ErrorState title={customTitle} message={defaultMessage} />);

    const title = screen.getByRole("heading", { name: customTitle });
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass(
      "text-2xl",
      "font-bold",
      "text-destructive",
      "mb-4",
    );
  });

  it("applies custom className", () => {
    const customClass = "custom-error-state";
    render(<ErrorState message={defaultMessage} className={customClass} />);

    const container = screen
      .getByText(/oops! something went wrong/i)
      .closest("div");
    expect(container?.parentElement).toHaveClass(customClass);
  });

  it("renders message with correct styling", () => {
    render(<ErrorState message={defaultMessage} />);

    const message = screen.getByText(defaultMessage);
    expect(message).toHaveClass("text-muted-foreground");
  });

  it("renders with correct container styling", () => {
    render(<ErrorState message={defaultMessage} />);

    const container = screen
      .getByText(/oops! something went wrong/i)
      .closest("div");
    expect(container?.parentElement).toHaveClass(
      "bg-background",
      "min-h-screen",
      "flex",
      "items-center",
      "justify-center",
    );
  });

  it("renders with text center alignment", () => {
    render(<ErrorState message={defaultMessage} />);

    const contentContainer = screen
      .getByText(/oops! something went wrong/i)
      .closest("div");
    expect(contentContainer).toHaveClass("text-center");
  });
});
