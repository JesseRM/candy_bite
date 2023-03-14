import { render, screen, fireEvent } from "@testing-library/react";
import { CandyBiteProvider } from "@/context/state";
import { useRouter } from "next/router";
import React from "react";
import Search from "@/pages/search/[term]";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockedResponse = {
  candyName: "snickers",
  imageUrl: "https://i.imgur.com/GA8grvo.png",
  portion: "",
  nutrients: {},
};

(global.fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockedResponse),
    status: 200,
  })
);

describe("Search page with results", () => {
  test("Url change and api call with term on search button click", () => {
    const push = jest.fn();
    const urlTerm = "test";
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
      query: { urlTerm },
      isReady: true,
    }));

    render(
      <CandyBiteProvider>
        <Search />
      </CandyBiteProvider>
    );

    const searchbox = screen.getByRole("searchbox");
    const button = screen.getByRole("button");
    const newTerm = "snickers";

    fireEvent.change(searchbox, { target: { value: newTerm } });
    fireEvent.click(button);

    expect(push).toHaveBeenCalledWith(`/search/${newTerm}`);

    const apiUrl = "/api/candy/" + newTerm;
    expect(global.fetch).toHaveBeenCalledWith(apiUrl);
  });

  test("URL change with term on pressing Enter key", () => {
    const push = jest.fn();
    const term = "test";
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
      query: { term },
      isReady: true,
    }));

    render(
      <CandyBiteProvider>
        <Search />
      </CandyBiteProvider>
    );

    const searchbox = screen.getByRole("searchbox");
    const newTerm = "twix";

    fireEvent.change(searchbox, { target: { value: newTerm } });
    fireEvent.keyDown(searchbox, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(push).toHaveBeenCalledWith(`/search/${newTerm}`);

    const apiUrl = "/api/candy/" + newTerm;
    expect(global.fetch).toHaveBeenCalledWith(apiUrl);
  });

  test("Contains h1 with search term", () => {
    const term = "hershey";
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

  test("Contains image of searched candy", () => {
    const term = "snickers";
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: { term },
      isReady: true,
    }));

    const mockUseContext = jest.spyOn(React, "useContext");
    mockUseContext.mockReturnValue({
      searchResults: [mockedResponse],
    });

    const altText = term + " image";

    render(
      <CandyBiteProvider>
        <Search />
      </CandyBiteProvider>
    );

    expect(screen.getByAltText(altText)).toBeInTheDocument();
  });
});
