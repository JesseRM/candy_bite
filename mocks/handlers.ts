import { rest } from "msw";
import { snickers, twix } from "./candy";

export const handlers = [
  rest.get("/api/candy/snickers", (req, res, ctx) => {
    return res(ctx.json([snickers]));
  }),
  rest.get("/api/candy/fdcid/169589", (req, res, ctx) => {
    return res(ctx.json(snickers));
  }),
  rest.get("/api/candy/twix", (req, res, ctx) => {
    return res(ctx.json([twix]));
  }),
  rest.get("/api/candy/fdcid/168768", (req, res, ctx) => {
    return res(ctx.json(twix));
  }),
];
