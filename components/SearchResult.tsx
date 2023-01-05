/* eslint-disable @next/next/no-img-element */
import CandyBiteContext from "../context/state";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/SearchResult.module.css";
import { useContext } from "react";
import { CandyInfo } from "../interfaces/globalInterfaces";

interface SearchResultProps {
  searchResults: CandyInfo[];
}

const SearchResult = ({ searchResults }: SearchResultProps) => {
  const { setSelectedCandy } = useContext(CandyBiteContext);

  function handleClick(index: number) {
    setSelectedCandy(searchResults[index]);
  }

  return (
    <div className={styles["main-container"]}>
      {searchResults &&
        searchResults.map((candy: CandyInfo, index: number) => {
          return (
            <div
              key={index}
              className={styles["card"]}
              onClick={() => handleClick(index)}
            >
              <Link href="/nutrients" passHref={true}>
                <div className={styles["image-container"]}>
                  {/* <Image
                    src={candy.imageUrl}
                    alt={`${candy.candyName} image`}
                    layout="fill"
                    objectFit="contain"
                    priority
                  /> */}
                  <img
                    className={styles["candy-image"]}
                    src={candy.imageUrl}
                    alt={`${candy.candyName} image`}
                  />
                </div>
              </Link>
              <Link href="/nutrients" passHref={true}>
                <div className={styles["info-container"]}>
                  <span>{candy.candyName.toUpperCase()}</span>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default SearchResult;
