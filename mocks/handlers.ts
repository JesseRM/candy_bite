import { rest } from "msw";
import { snickers } from "./candy";

export const handlers = [
  rest.get("/api/candy/snickers", (req, res, ctx) => {
    return res(ctx.json([snickers]));
  }),
];
