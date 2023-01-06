/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import CandyBiteContext from "../context/state";
import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";
import styles from "../styles/Nutrients.module.css";
import Link from "next/link";

interface NutrientState {
  amountPer100: number;
  amount: number;
}

const Nutrients: NextPage = () => {
  const { selectedCandy } = useContext(CandyBiteContext);

  /*
    Nutrition information provided by USDA API is based on a 100 gram portion.
    This base value will be used to calculate nutrient content of other portions.
  */
  const caloriesPer100 = selectedCandy
    ? selectedCandy["nutrients"][2]["amount"]
    : 0;
  const fatPer100 = selectedCandy ? selectedCandy["nutrients"][4]["amount"] : 0;
  const sugarPer100 = selectedCandy
    ? selectedCandy["nutrients"][8]["amount"]
    : 0;
  const proteinPer100 = selectedCandy
    ? selectedCandy["nutrients"][3]["amount"]
    : 0;
  const carbohydratePer100 = selectedCandy
    ? selectedCandy["nutrients"][6]["amount"]
    : 0;
  const sodiumPer100 = selectedCandy
    ? selectedCandy["nutrients"][15]["amount"]
    : 0;

  const [portion, setPortion] = useState("100");
  const [calories, setCalories] = useState<NutrientState>({
    amountPer100: caloriesPer100,
    amount: Math.round(caloriesPer100),
  });
  const [fat, setFat] = useState<NutrientState>({
    amountPer100: fatPer100,
    amount: Math.round(fatPer100),
  });
  const [sugar, setSugar] = useState<NutrientState>({
    amountPer100: sugarPer100,
    amount: Math.round(sugarPer100),
  });
  const [protein, setProtein] = useState<NutrientState>({
    amountPer100: proteinPer100,
    amount: Math.round(proteinPer100),
  });
  const [carbohydrate, setCarbohydrate] = useState<NutrientState>({
    amountPer100: carbohydratePer100,
    amount: Math.round(carbohydratePer100),
  });
  const [sodium, setSodium] = useState<NutrientState>({
    amountPer100: sodiumPer100,
    amount: Math.round(sodiumPer100),
  });

  const caloriesUnit: string = selectedCandy
    ? selectedCandy["nutrients"][2]["nutrient"]["unitName"]
    : "";
  const fatUnit: string = selectedCandy
    ? selectedCandy["nutrients"][4]["nutrient"]["unitName"]
    : "";
  const sugarUnit: string = selectedCandy
    ? selectedCandy["nutrients"][8]["nutrient"]["unitName"]
    : "";
  const proteinUnit: string = selectedCandy
    ? selectedCandy["nutrients"][3]["nutrient"]["unitName"]
    : "";
  const carbohydrateUnit: string = selectedCandy
    ? selectedCandy["nutrients"][6]["nutrient"]["unitName"]
    : "";
  const sodiumUnit: string = selectedCandy
    ? selectedCandy["nutrients"][15]["nutrient"]["unitName"]
    : "";

  const nutrientSetters = [
    setCalories,
    setFat,
    setSugar,
    setProtein,
    setCarbohydrate,
    setSodium,
  ];

  function handlePortionInput(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    const onlyNums = inputValue.replace(/[^0-9]/g, "");

    if (onlyNums.length) {
      const newPortion = parseInt(onlyNums);

      if (newPortion < 1 || newPortion > 1000) {
        alert("Please enter a number between 1 and 1000");
      } else {
        updateNutrientValues(nutrientSetters, newPortion);
      }
    }

    setPortion(onlyNums);
  }

  function updateNutrientValues(
    setters: Dispatch<SetStateAction<NutrientState>>[],
    portion: number
  ) {
    for (const setter of setters) {
      setter((prevState) => {
        const newAmount = Math.round((prevState.amountPer100 * portion) / 100);
        return {
          ...prevState,
          amount: newAmount,
        };
      });
    }
  }

  if (!selectedCandy) {
    return <div>You have not selected a candy yet</div>;
  }

  return (
    <div>
      <h1 className={styles.welcome}>
        {selectedCandy.candyName.toUpperCase()}
      </h1>
      <div className={styles["image-container"]}>
        <div className={styles["image"]}>
          {/* <Image
            src={selectedCandy.imageUrl}
            alt={selectedCandy.candyName}
            layout="fill"
            objectFit="contain"
          /> */}
          <img
            className={styles["candy-image"]}
            src={selectedCandy.imageUrl}
            alt={`${selectedCandy.candyName} image`}
          />
        </div>
      </div>
      <div className={styles["back-btn-container"]}>
        <Link href="/" passHref={true}>
          <button className={styles["back-btn"]}>
            <IoArrowBack />
          </button>
        </Link>
      </div>
      <div className={styles["portion-container"]}>
        <span className={styles["portion-title"]}>Portion: </span>
        <input
          className={styles["portion-input"]}
          onChange={handlePortionInput}
          value={portion}
          type="tel"
        />{" "}
        g
      </div>
      <div className={styles["table-container"]}>
        <table className={styles["main-table"]}>
          <thead>
            <tr>
              <th>Nutrient</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Calories</td>
              <td>{`${calories.amount} ${caloriesUnit}`}</td>
            </tr>
            <tr>
              <td>Fat</td>
              <td>{`${fat.amount} ${fatUnit}`}</td>
            </tr>
            <tr>
              <td>Sugar</td>
              <td>{`${sugar.amount} ${sugarUnit}`}</td>
            </tr>
            <tr>
              <td>Protein</td>
              <td>{`${protein.amount} ${proteinUnit}`}</td>
            </tr>
            <tr>
              <td>Carbohydrate</td>
              <td>{`${carbohydrate.amount} ${carbohydrateUnit}`}</td>
            </tr>
            <tr>
              <td>Sodium</td>
              <td>{`${sodium.amount} ${sodiumUnit}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Nutrients;
