import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ServiceForm from "../components/ServiceForm";
import { ThemeProvider } from "styled-components";

const theme = {
  spacing: { sm: "4px", md: "8px", lg: "16px", xl: "24px", xs: "2px" },
  colors: { primary: "#007bff", secondary: "#6c757d", dark: "#000" },
  borderRadius: { sm: "4px", md: "8px", lg: "12px" },
};

const wrapper = (ui: any) => (
  <ThemeProvider theme={theme}>{ui}</ThemeProvider>
);

describe("ServiceForm Component", () => {
  test("renders fields", () => {
    render(
      wrapper(
        <ServiceForm
          type="ambulances"
          onSubmit={() => {}}
          onCancel={() => {}}
        />
      )
    );
    expect(screen.getByLabelText("Title *")).toBeInTheDocument();
    expect(screen.getByLabelText("Description *")).toBeInTheDocument();
  });

  test("calls onSubmit with FormData", () => {
    const onSubmit = jest.fn();

    render(
      wrapper(
        <ServiceForm type="ambulances" onSubmit={onSubmit} onCancel={() => {}} />
      )
    );

    fireEvent.change(screen.getByLabelText("Title *"), {
      target: { value: "Test Ambulance" },
    });

    fireEvent.change(screen.getByLabelText("Description *"), {
      target: { value: "Desc" },
    });

    fireEvent.change(screen.getByLabelText("Location *"), {
      target: { value: "City" },
    });

    fireEvent.change(screen.getByLabelText("Contact Number *"), {
      target: { value: "9999999" },
    });

    fireEvent.click(screen.getByText("Create"));

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit.mock.calls[0][0]).toBeInstanceOf(FormData);
  });

  test("calls onCancel", () => {
    const onCancel = jest.fn();

    render(
      wrapper(
        <ServiceForm type="ambulances" onSubmit={() => {}} onCancel={onCancel} />
      )
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalled();
  });
});
