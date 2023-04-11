import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";
import { fetchNutrientsWithFdcId } from "util/nutrientsApi";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const fdcId: string | undefined = String(req.query.fdcId);

  try {
    //Fetch candy info from database matching an FDC ID
    const candy = await prisma.candies.findFirst({
      where: {
        fdc_id: fdcId,
      },
      include: {
        candy_images: true,
      },
    });

    //Fetch nutritional data from USDA API
    const nutrients = await fetchNutrientsWithFdcId(candy ? [candy] : []);

    if (nutrients.length) {
      res.status(200);
      res.json(nutrients.pop());
    } else {
      res.status(404);
      res.json({ error: "No candy found with that FDC ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ error: "Server error." });
  }
}

export default handler;
