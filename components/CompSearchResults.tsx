/* eslint-disable @next/next/no-img-element */
import { Dispatch, SetStateAction, MouseEvent } from "react";
import { IoAddCircle } from "react-icons/io5";
import { CandyInfo } from "../interfaces/globalInterfaces";
import styles from "../styles/CompSearchResults.module.css";

interface CompSearchResultsProps {
  searchResults: CandyInfo[];
  selected: CandyInfo[];
  setSelected: Dispatch<SetStateAction<CandyInfo[]>>;
}

const CompSearchResults = ({
  searchResults,
  selected,
  setSelected,
}: CompSearchResultsProps) => {
  function handleAddClick(
    event: MouseEvent<SVGElement, globalThis.MouseEvent>,
    candy: CandyInfo
  ) {
    const added = selected.find(
      (element: any) => element.candyName === candy.candyName
    );
    let newSelected: any;

    if (added) {
      newSelected = selected.filter(
        (element: any) => element.candyName !== candy.candyName
      );
    } else {
      newSelected = [...selected, candy];
    }

    setSelected(newSelected);
  }

  return (
    <div className={styles["main-container"]}>
      {searchResults &&
        searchResults.map((candy: CandyInfo, index: number) => {
          const alreadySelected = selected.find(
            (element: any) => element.candyName === candy.candyName
          );

          return (
            <div key={index} className={styles["card"]}>
              <div className={styles["image-container"]}>
                {/* <Image
                  src={candy.imageUrl}
                  alt={`${candy.candyName} image`}
                  layout="fill"
                  objectFit="contain"
                /> */}
                <img
                  className={styles["candy-image"]}
                  src={candy.imageUrl}
                  alt={`${candy.candyName} image`}
                />
              </div>
              <div className={styles["name-container"]}>
                <span>{candy.candyName.toUpperCase()}</span>
              </div>
              <div className={styles["btn-container"]}>
                <IoAddCircle
                  className={styles["add"]}
                  onClick={(event) => handleAddClick(event, candy)}
                  data-selected={alreadySelected ? true : false}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CompSearchResults;
