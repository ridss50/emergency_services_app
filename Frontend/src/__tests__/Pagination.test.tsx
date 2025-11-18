import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Pagination from "../components/Pagination";
import { ThemeProvider } from "styled-components";

const theme = {
  spacing: { sm: "4px", md: "8px", lg: "16px", xl: "24px", xs: "2px" },
  colors: { primary: "#007bff", secondary: "#6c757d", dark: "#000" },
  borderRadius: { sm: "4px" },
};

const wrapper = (ui: any) => <ThemeProvider theme={theme}>{ui}</ThemeProvider>;

describe("Pagination Component", () => {
  test("renders correct pages", () => {
    render(
      wrapper(
        <Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />
      )
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("calls onPageChange when clicking next", () => {
    const onPageChange = jest.fn();

    render(
      wrapper(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={onPageChange}
        />
      )
    );

    fireEvent.click(screen.getByText("Next"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test("previous button disabled on first page", () => {
    render(
      wrapper(
        <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
      )
    );

    expect(screen.getByText("Previous")).toBeDisabled();
  });

  test("next button disabled on last page", () => {
    render(
      wrapper(
        <Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />
      )
    );

    expect(screen.getByText("Next")).toBeDisabled();
  });
});
