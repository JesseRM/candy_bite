import styles from "../styles/SearchResult.module.css";
import { CandyInfo } from "../interfaces/globalInterfaces";
import { useRouter } from "next/router";

interface SearchResultProps {
  searchResults: CandyInfo[];
}

const SearchResult = ({ searchResults }: SearchResultProps) => {
  const router = useRouter();

  function handleClick(candy: CandyInfo) {
    const url = "/nutrients/" + candy.fdcId;
    router.push(url);
  }

  return (
    <div className={styles["main-container"]}>
      {searchResults &&
        searchResults.map((candy: CandyInfo, index: number) => {
          return (
            <div
              className={styles["card"]}
              key={index}
              role="link"
              onClick={() => handleClick(candy)}
            >
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
              <div className={styles["info-container"]}>
                <span>{candy.candyName.toUpperCase()}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SearchResult;
