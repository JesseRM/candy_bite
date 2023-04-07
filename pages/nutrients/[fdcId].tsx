/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import CandyBiteContext from "../../context/state";
import { IoArrowBack } from "react-icons/io5";
import styles from "../../styles/Nutrients.module.css";
import { useRouter } from "next/router";
import { CandyInfo, FoodNutrients } from "interfaces/globalInterfaces";
import Spinner from "@/components/Spinner";
import { NutrientState, UnitNames } from "interfaces/searchPageInterfaces";

const Nutrients: NextPage = () => {
  const [candy, setCandy] = useState<CandyInfo | null>(null);
  const [fetching, setFetching] = useState(false);
  const [noResults, setNoResults] = useState(true);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const router = useRouter();

  /*
    Nutrition information provided by USDA API is based on a 100 gram portion.
    This base value will be used to calculate nutrient content of other portions.
  */
  const [portion, setPortion] = useState("100");
  const [calories, setCalories] = useState<NutrientState>({} as NutrientState);
  const [fat, setFat] = useState<NutrientState>({} as NutrientState);
  const [sugar, setSugar] = useState<NutrientState>({} as NutrientState);
  const [protein, setProtein] = useState<NutrientState>({} as NutrientState);
  const [carbohydrate, setCarbohydrate] = useState<NutrientState>(
    {} as NutrientState
  );
  const [sodium, setSodium] = useState<NutrientState>({} as NutrientState);

  const [unitNames, setUnitNames] = useState<UnitNames>({} as UnitNames);

  useEffect(() => {
    const fdcId = router.query.fdcId;

    if (fdcId) {
      fetchCandy(fdcId as string);
    }
  }, [router.query.fdcId]);

  useEffect(() => {
    if (candy) {
      updateAmountPer100();
      updateUnitNames();
    }
  }, [candy]);

  function fetchCandy(fdcId: string) {
    if (!fdcId || fdcId.trim().length === 0) return;

    setFetching(true);

    const url = `/api/candy/fdcid/${fdcId}`;

    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Unable to retrieve candy data.");
        }

        return response.json();
      })
      .then((data) => {
        setFetching(false);
        setCandy(data);
        setNoResults(false);
      })
      .catch((error) => {
        console.log(error);
        setFetching(false);
        setNoResults(true);
        setDisplayErrorMessage(true);
      });
  }

  function updateAmountPer100() {
    if (!candy) return;

    const nutrients = candy["nutrients"];
    const proteinPer100 = nutrients[0]["amount"];
    const fatPer100 = nutrients[1]["amount"];
    const carbohydratePer100 = nutrients[2]["amount"];
    const caloriesPer100 = nutrients[3]["amount"];
    const sugarPer100 = nutrients[4]["amount"];
    const sodiumPer100 = nutrients[5]["amount"];

    setProtein({ amount: proteinPer100, amountPer100: proteinPer100 });
    setFat({ amount: fatPer100, amountPer100: fatPer100 });
    setCarbohydrate({
      amount: carbohydratePer100,
      amountPer100: carbohydratePer100,
    });
    setCalories({ amount: caloriesPer100, amountPer100: caloriesPer100 });
    setSugar({ amount: sugarPer100, amountPer100: sugarPer100 });
    setSodium({ amount: sodiumPer100, amountPer100: sodiumPer100 });
  }

  function updateUnitNames() {
    if (!candy) return {};
    const nutrients = candy["nutrients"];
    const proteinUnit = nutrients[0]["nutrient"]["unitName"];
    const fatUnit = nutrients[1]["nutrient"]["unitName"];
    const carbohydrateUnit = nutrients[2]["nutrient"]["unitName"];
    const caloriesUnit = nutrients[3]["nutrient"]["unitName"];
    const sugarUnit = nutrients[4]["nutrient"]["unitName"];
    const sodiumUnit = nutrients[5]["nutrient"]["unitName"];

    setUnitNames({
      protein: proteinUnit,
      fat: fatUnit,
      carbohydrate: carbohydrateUnit,
      calories: caloriesUnit,
      sugar: sugarUnit,
      sodium: sodiumUnit,
    });
  }

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

  return (
    <div>
      {fetching && <Spinner />}
      {candy && (
        <>
          <h1 className={styles.welcome}>{candy.candyName.toUpperCase()}</h1>
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
                src={candy.imageUrl}
                alt={`${candy.candyName} image`}
              />
            </div>
          </div>
          <div className={styles["back-btn-container"]}>
            <button
              className={styles["back-btn"]}
              onClick={() => router.back()}
            >
              <IoArrowBack />
            </button>
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
                  <td>{`${calories.amount} ${unitNames.calories}`}</td>
                </tr>
                <tr>
                  <td>Fat</td>
                  <td>{`${fat.amount} ${unitNames.fat}`}</td>
                </tr>
                <tr>
                  <td>Sugar</td>
                  <td>{`${sugar.amount} ${unitNames.sugar}`}</td>
                </tr>
                <tr>
                  <td>Protein</td>
                  <td>{`${protein.amount} ${unitNames.protein}`}</td>
                </tr>
                <tr>
                  <td>Carbohydrate</td>
                  <td>{`${carbohydrate.amount} ${unitNames.carbohydrate}`}</td>
                </tr>
                <tr>
                  <td>Sodium</td>
                  <td>{`${sodium.amount} ${unitNames.sodium}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Nutrients;
