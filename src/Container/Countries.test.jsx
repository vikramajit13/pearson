import { render, unmountComponentAtNode } from "react-dom";
import "@testing-library/jest-dom";
import { act, screen } from "@testing-library/react";
import { CountriesContainer } from "./Countries";

describe("should test countries container", () => {
  let container;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("should match the snapshot", () => {
    act(() => render(<CountriesContainer />, container));
    expect(container).toMatchSnapshot();
  });

  it("should contain text", () => {
    act(() => render(<CountriesContainer />, container));
    const textElement = screen.getAllByText(/Country/i);
    expect(textElement[0]).toBeInTheDocument();
  });
});
