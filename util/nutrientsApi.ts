import { candies, candy_images } from "@prisma/client";
import { CandyInfo } from "interfaces/globalInterfaces";

type candy = candies & {
  candy_images: candy_images[];
};

export async function fetchNutrientsWithFdcId(candies: candy[]) {
  //Fetch nutritional data from USDA API for each hit returned from database
  const data: CandyInfo[] = [];
  /*
      208 - Calories
      204 - Fat 
      269 - Sugar
      203 - Protein
      205 - Carbohydrate
      307 - Sodium
  */
  const nutrientCodes: number[] = [208, 204, 269, 203, 205, 307];
  const fdcIds: string[] = [];

  for (const candy of candies) {
    fdcIds.push(candy.fdc_id);
  }

  while (fdcIds.length) {
    const fdcIdsToFetch: string[] = [];
    const LIMIT = 20; //USDA API allows up to 20 FDC ID searches per request

    //Extract FDC IDs to insert into API URL
    for (let i = 0; i < LIMIT; i++) {
      const fdcId = fdcIds.pop();

      if (fdcId !== undefined) {
        fdcIdsToFetch.push(fdcId);
      } else {
        break;
      }
    }

    const usdaApi = `https://api.nal.usda.gov/fdc/v1/foods?fdcIds=${fdcIdsToFetch.join()}&nutrients=${nutrientCodes.join()}&api_key=${
      process.env.USDA_API_KEY
    }`;

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

      if (attempts > ATTEMPT_LIMIT)
        throw new Error(
          "Fetch attempt limit reached. USDA API did not respond with data."
        );
    }

    if (response) {
      result = await response.json();

      for (const candy of candies) {
        const currentFdcId = candy.fdc_id;
        const candyName = candy.candy_name;
        const imageUrl = candy.candy_images[0].image_url;
        const portion: number = 100; //Default is 100 grams
        const candyInfo = result.find(
          ({ fdcId }: { fdcId: number }) => String(fdcId) === currentFdcId
        );

        if (candyInfo) {
          const nutrients = candyInfo["foodNutrients"].sort(
            (a: any, b: any) =>
              Number(a["nutrient"]["number"]) - Number(b["nutrient"]["number"])
          );

          const info: CandyInfo = {
            candyName,
            fdcId: currentFdcId,
            imageUrl,
            portion,
            nutrients,
          };

          data.push(info);
        }
      }
    }
  }

  return data;
}
