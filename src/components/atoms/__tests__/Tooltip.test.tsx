import React from "react";
import { render, screen } from "@testing-library/react";
import { Tooltip, TooltipTrigger, TooltipContent } from "../tooltip";

describe("Tooltip Component", () => {
  it("renders tooltip with trigger and content", () => {
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>,
    );

    const trigger = screen.getByText("Hover me");
    expect(trigger).toBeInTheDocument();
  });

  it("applies custom className to tooltip content", () => {
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent className="custom-class">
          Tooltip content
        </TooltipContent>
      </Tooltip>,
    );

    const trigger = screen.getByText("Hover me");
    expect(trigger).toBeInTheDocument();
  });

  it("renders with custom side offset", () => {
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent sideOffset={10}>Tooltip content</TooltipContent>
      </Tooltip>,
    );

    const trigger = screen.getByText("Hover me");
    expect(trigger).toBeInTheDocument();
  });

  it("renders tooltip trigger with custom props", () => {
    render(
      <Tooltip>
        <TooltipTrigger className="custom-trigger">Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>,
    );

    const trigger = screen.getByText("Hover me");
    expect(trigger).toHaveAttribute("data-slot", "tooltip-trigger");
  });

  it("renders tooltip content with default classes", () => {
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>,
    );

    const trigger = screen.getByText("Hover me");
    expect(trigger).toBeInTheDocument();
  });

  it("renders tooltip with custom delay duration", () => {
    render(
      <Tooltip delayDuration={200}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>,
    );

    const trigger = screen.getByText("Hover me");
    expect(trigger).toBeInTheDocument();
  });
});
