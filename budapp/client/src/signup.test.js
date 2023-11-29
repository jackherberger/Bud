import { render, test, screen, expect } from "@testing-library/react";
import SignUp from "./signup";
import React from "react";

test("renders the empty form correctly", () => {
  render(<SignUp />);
  expect(screen.getByLabelText("Name")).toBeInTheDocument();
});
