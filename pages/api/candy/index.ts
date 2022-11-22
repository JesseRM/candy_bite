import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const candies = await prisma.candies.findMany();

    res.status(200);
    res.json(candies);
  } catch (error) {
    res.status(500);
    res.json({ error: "Unable to retreive information from db" });
  }
}

export default handler;
