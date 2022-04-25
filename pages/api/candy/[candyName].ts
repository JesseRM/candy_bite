import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client';

interface CandyInfo {
  candyName: String;
  imageUrl: String;
  portion: number;
  nutrients: Object[]
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const candyName: string | undefined = String(req.query.candyName);

  try {
    const candies = await prisma.candy.findMany({
      where: {
        candy_name : {
          contains: candyName
        }
      }
    });

    const fdcIds = [];

    for (const candy of candies) {
      fdcIds.push(candy.fdc_id);
    }

    const usda_api = `https://api.nal.usda.gov/fdc/v1/foods?fdcIds=${fdcIds.join()}&api_key=${process.env.USDA_API_KEY}`;

    const data: CandyInfo[] = [];

    const results = await fetch(usda_api).then(res => res.json());

    for (let i = 0; i < results.length; i++) {
      const current: any = results[i];

      const candyName = candies[i].candy_name;
      const imageUrl = candies[i].image_url;
      const portion: number = current['inputFoods'][0]['ingredientWeight'];
      const nutrients = current['foodNutrients'];
      
      
      const info: CandyInfo = {
        candyName,
        imageUrl,
        portion,
        nutrients
      }

      data.push(info);
    }
    
    res.status(200);
    res.json(data);
  } catch (error) {
    res.status(500);
    res.json({error: "Unable to retreive information from db"})
  }
}

export default handler;