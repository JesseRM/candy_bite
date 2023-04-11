import { NextPage } from "next";
import { ChangeEvent, useContext, useState } from "react";
import CompareInstructions from "../components/CompareInstructions";
import CompareList from "../components/CompareList";
import CompSearchResults from "../components/CompSearchResults";
import ErrorMessage from "../components/ErrorMessage";
import NoResult from "../components/NoResult";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import CandyBiteContext from "../context/state";
import { CandyInfo } from "../interfaces/globalInterfaces";
import styles from "../styles/Compare.module.css";

const Compare: NextPage = () => {
  const [nutrIndex, setNutrIndex] = useState(3);
  const [sortOrder, setSortOrder] = useState("descending");
  const [selected, setSelected] = useState<CandyInfo[]>([]);
  const [searchMode, setSearchMode] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Oops, something went wrong."
  );
  const {
    searchResults,
    setSearchResults,
    displayErrorMessage,
    setDisplayErrorMessage,
  } = useContext(CandyBiteContext);

  function handleNutrChange(event: ChangeEvent<HTMLSelectElement>) {
    setNutrIndex(parseInt(event.target.value));
  }

  function handleSortChange(event: ChangeEvent<HTMLSelectElement>) {
    setSortOrder(event.target.value);
  }

  function handleAddClick() {
    setSearchMode(true);
  }

  function handleDoneClick() {
    setSearchMode(false);
    setSearchResults([]);
    setNoResults(false);
  }

  function searchHandler(term: string) {
    if (!term || term.trim().length === 0) return;

    fetchCandy(term);
    setFetching(true);
  }

  function fetchCandy(term: string) {
    if (!term || term.trim().length === 0) return;

    setFetching(true);

    const url = `/api/candy/${term.toLowerCase()}`;

    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Unable to retrieve candy data.");
        }

        return response.json();
      })
      .then((data) => {
        setFetching(false);
        setSearchResults(data);
        setNoResults(data.length === 0 ? true : false);
      })
      .catch((error) => {
        console.log(error);
        setFetching(false);
        setDisplayErrorMessage(true);
      });
  }

  return (
    <div>
      <h1 className={styles["title"]}>Compare Nutrients</h1>
      {searchMode && (
        <>
          <SearchBar searchHandler={searchHandler} />
          <div className={styles["compare-btn-container"]}>
            <button className={styles["compare-btn"]} onClick={handleDoneClick}>
              Compare
            </button>
          </div>
          {!fetching && (
            <CompSearchResults
              searchResults={searchResults}
              selected={selected}
              setSelected={setSelected}
            />
          )}
        </>
      )}
      {searchResults.length === 0 &&
        searchMode &&
        !fetching &&
        !noResults &&
        !displayErrorMessage && <CompareInstructions />}
      {noResults && !fetching && <NoResult />}
      {displayErrorMessage && !fetching && (
        <ErrorMessage message={errorMessage} />
      )}
      {fetching && <Spinner />}
      {!searchMode && (
        <>
          <div className={styles["controls-container"]}>
            <div>
              <select
                value={nutrIndex}
                className={styles["nutrient"]}
                onChange={handleNutrChange}
              >
                <option value={3}>Calories</option>
                <option value={1}>Fat</option>
                <option value={4}>Sugar</option>
                <option value={0}>Protein</option>
                <option value={2}>Carbohydrate</option>
                <option value={5}>Sodium</option>
              </select>
            </div>
            <div>
              <select
                value={sortOrder}
                className={styles["sort"]}
                onChange={handleSortChange}
              >
                <option value={"descending"}>High to low</option>
                <option value={"ascending"}>Low to high</option>
              </select>
            </div>
            <button className={styles["add-btn"]} onClick={handleAddClick}>
              Add Item
            </button>
          </div>
          <CompareList
            nutrIndex={nutrIndex}
            selected={selected}
            sortOrder={sortOrder}
          />
        </>
      )}
    </div>
  );
};

export default Compare;
