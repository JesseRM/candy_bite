import { http, HttpResponse } from "msw";
import { snickers, twix } from "./candy";

export const handlers = [
  http.get("/api/candy/snickers", ({ request, params, cookies }) => {
    return HttpResponse.json([snickers]);
  }),
  http.get("/api/candy/fdcid/169589", ({ request, params, cookies }) => {
    return HttpResponse.json(snickers);
  }),
  http.get("/api/candy/twix", ({ request, params, cookies }) => {
    return HttpResponse.json([twix]);
  }),
  http.get("/api/candy/fdcid/168768", ({ request, params, cookies }) => {
    return HttpResponse.json(twix);
  }),
];
