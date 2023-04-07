import { rest } from "msw";
import { snickerNutrients } from "./nutrients";

export const handlers = [
  rest.get("/api/candy/snickers", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          candyName: "snickers",
          fdcId: "169589",
          imageUrl: "https://i.imgur.com/GA8grvo.png",
          portion: 100,
          nutrients: snickerNutrients,
        },
      ])
    );
  }),
];
