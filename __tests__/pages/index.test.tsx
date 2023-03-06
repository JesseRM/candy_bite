import { render, screen, fireEvent } from "@testing-library/react";
import { CandyBiteProvider } from "@/context/state";
import { useRouter } from "next/router";
import Home from "@/pages/index";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Index page (Home)", () => {
  test("Contains searchbox and search button", () => {
    render(
      <CandyBiteProvider>
        <Home />
      </CandyBiteProvider>
    );

    const searchbox = screen.getByRole("searchbox");
    expect(searchbox).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("Navigates to search page with provided term on search button click", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));

    render(
      <CandyBiteProvider>
        <Home />
      </CandyBiteProvider>
    );

    let candyName = "snicker";
    const searchbox = screen.getByRole("searchbox");
    const button = screen.getByRole("button");

    fireEvent.change(searchbox, { target: { value: candyName } });
    fireEvent.click(button);

    expect(push).toHaveBeenCalledWith(`/search/${candyName}`);
  });

  test("Navigates to search page with provided term on pressing Enter key", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));

    render(
      <CandyBiteProvider>
        <Home />
      </CandyBiteProvider>
    );

    let candyName = "twix";
    const searchbox = screen.getByRole("searchbox");

    fireEvent.change(searchbox, { target: { value: candyName } });
    fireEvent.keyDown(searchbox, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(push).toHaveBeenCalledWith(`/search/${candyName}`);
  });
});
