import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Introduction from "../components/Introduction";
import SearchBar from "../components/SearchBar";
import CandyBiteContext from "../context/state";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();
  const { setSearchResults } = useContext(CandyBiteContext);

  useEffect(() => {
    setSearchResults([]);
  }, []);

  function searchHandler(term: string) {
    if (!term || term.trim().length === 0) return;

    const url = "/search/" + term;
    router.push(url);
  }

  return (
    <div>
      <div className={styles["welcome-container"]}>
        <h1 className={styles["welcome"]}>
          Nutritional Information of Your Favorite Candy
        </h1>
        <p className={styles["welcome-sub"]}>
          Nutrient content based on portion size.
        </p>
        <p className={styles["welcome-sub"]}>
          Select and compare vaious candy.
        </p>
        <hr />
        <SearchBar searchHandler={searchHandler} />
      </div>
      <Introduction />
    </div>
  );
};

export default Home;
