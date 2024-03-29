import { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import CompareInstructions from "../components/CompareInstructions";
import CompareList from "../components/CompareList";
import CompSearchResults from "../components/CompSearchResults";
import ErrorMessage from "../components/ErrorMessage";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import { CandyInfo } from "../interfaces/globalInterfaces";
import styles from "../styles/Compare.module.css";

const Compare: NextPage = () => {
  const [nutrIndex, setNutrIndex] = useState(3);
  const [sortOrder, setSortOrder] = useState("descending");
  const [selected, setSelected] = useState<CandyInfo[]>([]);
  const [searchMode, setSearchMode] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchResults, setSearchResults] = useState<CandyInfo[]>([]);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  function handleNutrChange(event: ChangeEvent<HTMLSelectElement>) {
    setNutrIndex(parseInt(event.target.value));
  }

  function handleSortChange(event: ChangeEvent<HTMLSelectElement>) {
    setSortOrder(event.target.value);
  }

  function handleAddClick() {
    setSearchMode(true);
    setDisplayErrorMessage(false);
  }

  function handleDoneClick() {
    setSearchMode(false);
    setSearchResults([]);
  }

  function searchHandler(term: string) {
    if (!term || term.trim().length === 0) return;

    fetchCandy(term);
    setFetching(true);
  }

  function fetchCandy(term: string) {
    if (!term || term.trim().length === 0) return;

    setSearchResults([]);
    setFetching(true);
    setDisplayErrorMessage(false);

    const url = `/api/candy/${term.toLowerCase()}`;
    let responseStatus = 0;

    fetch(url)
      .then((response) => {
        responseStatus = response.status;

        return response.json();
      })
      .then((data) => {
        setFetching(false);

        if (responseStatus === 200) {
          setSearchResults(data);
          setDisplayErrorMessage(false);
        } else if (responseStatus === 404) {
          setErrorMessage("No candy found matching that term.");
          setDisplayErrorMessage(true);
        } else {
          throw new Error(data.error);
        }
      })
      .catch((error) => {
        console.log(error);
        setFetching(false);
        setErrorMessage(error.message);
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
        !displayErrorMessage && <CompareInstructions />}
      {displayErrorMessage && searchMode && (
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
