import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { fetchNutrientsWithFdcId } from "util/nutrientsApi";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const candyName: string | undefined = String(req.query.candyName);

  try {
    //Fetch candy info from database matching user provided name
    const candies = await prisma.candies.findMany({
      where: {
        candy_name: {
          contains: candyName.toLowerCase(),
        },
      },
      include: {
        candy_images: true,
      },
    });

    //Fetch nutritional data from USDA API for each hit returned from database
    const nutrients = await fetchNutrientsWithFdcId(candies);

    if (nutrients.length) {
      res.status(200);
      res.json(nutrients);
    } else {
      res.status(404);
      res.json({ error: "No candy matches that term" });
    }
  } catch (error) {
    console.log(error);
    res.status(504);
    res.json({ error: "Server error." });
  }
}

export default handler;
