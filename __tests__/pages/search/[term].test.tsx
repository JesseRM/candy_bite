import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CandyBiteProvider } from "@/context/state";
import { useRouter } from "next/router";
import React from "react";
import Search from "@/pages/search/[term]";

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
});
