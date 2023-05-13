import { snickers } from "@/mocks/candy";
import Nutrients from "@/pages/nutrients/[fdcId]";
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Nutrients page", () => {
  test("Candy name and image render on page", async () => {
    const fdcId = snickers.fdcId;
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: { fdcId },
      isReady: true,
    }));

    render(<Nutrients />);

    await waitFor(() =>
      expect(screen.getByRole("heading")).toHaveTextContent(
        snickers.candyName.toUpperCase()
      )
    );

    const altText = snickers.candyName + " image";
    expect(screen.getByAltText(altText)).toBeInTheDocument();
  });

  test("Page contains back button, portion input and table", async () => {
    const fdcId = snickers.fdcId;
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: { fdcId },
      isReady: true,
    }));

    render(<Nutrients />);

    await waitFor(() =>
      expect(screen.getByRole("heading")).toHaveTextContent(
        snickers.candyName.toUpperCase()
      )
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
