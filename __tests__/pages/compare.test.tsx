import Compare from "@/pages/compare";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Page where candy can be compared", () => {
  test("Contains searchbox, search button and compare button", () => {
    render(<Compare />);

    const searchbox = screen.getByRole("searchbox");
    expect(searchbox).toBeInTheDocument();
    const searchBtn = screen.getByTestId("search-button");
    expect(searchBtn).toBeInTheDocument();
    const compareBtn = screen.getByText("Compare");
    expect(compareBtn).toBeInTheDocument();
  });

  test("Results are displayed on button click and Enter key press", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));

    render(<Compare />);

    let candyName = "snickers";
    const searchbox = screen.getByRole("searchbox");
    const searchBtn = screen.getByTestId("search-button");

    fireEvent.change(searchbox, { target: { value: candyName } });
    fireEvent.click(searchBtn);

    let altText = candyName + " image";

    waitFor(() => expect(screen.getByAltText(altText)).toBeInTheDocument());
  });

  test("Candy can be added with '+' button and displayed", async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));

    render(<Compare />);
    //Search for 'SNICKERS and expect results
    let candyName = "SNICKERS";
    let searchbox = screen.getByRole("searchbox");
    let searchBtn = screen.getByTestId("search-button");

    fireEvent.change(searchbox, { target: { value: candyName } });
    fireEvent.click(searchBtn);

    //SNICKERS candy is added to list of candy to compare
    let addBtn = await screen.findByTestId("add-btn");

    fireEvent.click(addBtn);

    let compareBtn = screen.getByText("Compare");
    fireEvent.click(compareBtn);

    expect(await screen.findByText(candyName)).toBeInTheDocument();

    //Go back to search component and search for TWIX and add to list of candy to compare
    let addItemBtn = screen.getByText("Add Item");
    fireEvent.click(addItemBtn);
    candyName = "TWIX";

    searchbox = screen.getByRole("searchbox");
    searchBtn = screen.getByTestId("search-button");
    fireEvent.change(searchbox, { target: { value: candyName } });
    fireEvent.click(searchBtn);
    addBtn = await screen.findByTestId("add-btn");
    compareBtn = screen.getByText("Compare");

    fireEvent.click(addBtn);
    fireEvent.click(compareBtn);

    //Both SNICKERS and TWIX should display since both were added to list of candy to compare
    expect(screen.getByText(candyName)).toBeInTheDocument();
    candyName = "SNICKERS";
    expect(screen.getByText(candyName)).toBeInTheDocument();
  });
});
