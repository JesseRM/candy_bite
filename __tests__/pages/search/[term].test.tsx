import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CandyBiteProvider } from "@/context/state";
import { useRouter } from "next/router";
import React from "react";
import Search from "@/pages/search/[term]";
import { snickers } from "@/mocks/candy";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Search page with results", () => {
  test("Contains h1 with search term", () => {
    const term = "snickers";
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: { term },
      isReady: true,
    }));

    render(
      <CandyBiteProvider>
        <Search />
      </CandyBiteProvider>
    );

    expect(screen.getByRole("heading")).toHaveTextContent(term);
  });

  test("Contains searchbox and search button", () => {
    render(
      <CandyBiteProvider>
        <Search />
      </CandyBiteProvider>
    );

    const searchbox = screen.getByRole("searchbox");
    expect(searchbox).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("Contains image of searched candy", async () => {
    const term = "snickers";
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: { term },
      isReady: true,
    }));

    const altText = term + " image";

    render(
      <CandyBiteProvider>
        <Search />
      </CandyBiteProvider>
    );

    await waitFor(() =>
      expect(screen.getByAltText(altText)).toBeInTheDocument()
    );
  });

  test("Candy card click navigates to nutrition page", async () => {
    const term = "snickers";
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: { term },
      isReady: true,
      push,
    }));

    render(
      <CandyBiteProvider>
        <Search />
      </CandyBiteProvider>
    );

    await waitFor(() => screen.getByRole("link"));

    const candyCard = screen.getByRole("link");
    fireEvent.click(candyCard);

    const url = "/nutrients/" + snickers.fdcId;
    expect(push).toHaveBeenCalledWith(url);
  });
});
