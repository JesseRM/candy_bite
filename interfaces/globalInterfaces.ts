export interface CandyInfo {
  candyName: string;
  fdcId: string;
  imageUrl: string;
  portion: number;
  nutrients: FoodNutrients[];
}

export interface FoodNutrients {
  type: string;
  nutrient: Nutrient;
  id: number;
  amount: number;
}

export interface Nutrient {
  id: number;
  number: string;
  name: string;
  rank: number;
  unitName: string;
}
