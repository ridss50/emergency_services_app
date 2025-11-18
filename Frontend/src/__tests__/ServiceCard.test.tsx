import { render, fireEvent, screen } from "@testing-library/react";
import ServiceCard from "../components/ServiceCard";
import { ThemeProvider } from "styled-components";

const theme = {
  spacing: { sm: "4px", md: "8px", lg: "16px" },
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    dark: "#000",
    success: "green",
    danger: "red",
  },
  borderRadius: { sm: "4px", lg: "8px" },
};

const wrapper = (ui: any) => <ThemeProvider theme={theme}>{ui}</ThemeProvider>;

const ambulance = {
  id: "1",
  title: "Ambulance A",
  description: "Fast ambulance",
  contactNumber: "999999999",
  location: "City",
  isAvailable: true,
  image: "",
};

describe("ServiceCard Component", () => {
  test("renders card title", () => {
    render(wrapper(<ServiceCard type="ambulance" service={ambulance} />));
    expect(screen.getByText("Ambulance A")).toBeInTheDocument();
  });

  test("calls onEdit", () => {
    const onEdit = jest.fn();
    render(
      wrapper(
        <ServiceCard type="ambulance" service={ambulance} onEdit={onEdit} />
      )
    );

    fireEvent.click(screen.getByText("Edit"));
    expect(onEdit).toHaveBeenCalledWith(ambulance);
  });

  test("calls onDelete", () => {
    const onDelete = jest.fn();
    render(
      wrapper(
        <ServiceCard type="ambulance" service={ambulance} onDelete={onDelete} />
      )
    );

    fireEvent.click(screen.getByText("Delete"));
    expect(onDelete).toHaveBeenCalledWith("1");
  });
});
