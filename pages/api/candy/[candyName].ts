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

    res.status(200);
    res.json(nutrients);
  } catch (error) {
    console.log(error);
    res.status(504);
    res.json({ error: "Unable to retreive nutrition data." });
  }
}

export default handler;
