import type { NextApiRequest, NextApiResponse } from 'next';
import { CandyInfo } from '../../../interfaces/globalInterfaces';
import prisma from '../../../prisma/client';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const candyName: string | undefined = String(req.query.candyName);

  try {
    const candies = await prisma.candy.findMany({
      where: {
        candy_name : {
          contains: candyName.toLowerCase()
        }
      }
    });

    const data: CandyInfo[] = [];

    for (const candy of candies) {
      const fdcId = candy.fdc_id;
      const usdaApi = `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${process.env.USDA_API_KEY}`;
      let statusCode = 404;
      let response: Response | null = null;
      let result: any;

      /*
        For some reason USDA API frequently returns 404 error when making requests.
        Will eventually proivde data after a few attempts. We need to continue
        to make request until we don't get a 404. Also, the API is very slow overall,
        especially when having to make requests for multiple items.
      */
      while (statusCode === 404) {
        response = await fetch(usdaApi);
        statusCode = response.status;
      }

      if (response) {
        result = await response.json();

        const candyName = candy.candy_name;
        const imageUrl = candy.image_url;
        const portion: number = result['inputFoods'][0]['ingredientWeight'];
        const nutrients = result['foodNutrients'];

        const info: CandyInfo = {
          candyName,
          imageUrl,
          portion,
          nutrients
        }

        data.push(info);
      }
    }
    
    res.status(200);
    res.json(data);
  } catch (error) {
    res.status(500);
    res.json({error: "Unable to retreive information from db"})
  }
}

export default handler;