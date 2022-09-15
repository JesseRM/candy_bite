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
      let response: Response | null = null;
      let result: any;

      /*
        For some reason USDA API frequently returns 404 error when making requests.
        Will eventually proivde data after a few attempts. We need to continue
        to make request until we don't get a 404. Also, the API is very slow overall,
        especially when having to make requests for multiple items.
      */

      let attempts = 0;
      let statusCode = null;
      const SUCCESS_CODE = 200;
      const ATTEMPT_LIMIT = 10;

      while (statusCode !== SUCCESS_CODE) {
        response = await fetch(usdaApi);
        statusCode = response.status;

        attempts++;
        
        if (attempts > ATTEMPT_LIMIT) throw new Error("Fetch attempt limit reached. USDA API did not respond with data.");
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
    console.log(error);
    res.status(504);
    res.json({error: "Unable to retreive nutrition data."})
  }
}

export default handler;