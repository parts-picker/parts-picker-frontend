import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /parts picker/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
