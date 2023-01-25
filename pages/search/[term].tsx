import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import NoResult from "../../components/NoResult";
import SearchBar from "../../components/SearchBar";
import SearchResult from "../../components/SearchResult";
import Spinner from "../../components/Spinner";
import CandyBiteContext from "../../context/state";
import styles from "../../styles/[term].module.css";

const Search: NextPage = () => {
  const router = useRouter();
  const [term, setTerm] = useState(router.query["term"] as string);
  const [fetching, setFetching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const {
    searchResults,
    setSearchResults,
    displayErrorMessage,
    setDisplayErrorMessage,
  } = useContext(CandyBiteContext);

  useEffect(() => {
    if (searchResults.length === 0) {
      fetchCandy(term);
    }
  }, []);

  function fetchCandy(term: string) {
    if (!term || term.trim().length === 0) return;

    setFetching(true);

    const url = `/api/candy/${term.toLowerCase()}`;

    fetch(url)
      .then((response) => response.json())
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

  function searchHandler(term: string) {
    if (!term || term.trim().length === 0) return;

    setTerm(term);
    fetchCandy(term);
    setSearchResults([]);
    setFetching(true);
  }

  return (
    <div>
      <h1 className={styles["term"]}>{term}</h1>
      <SearchBar searchHandler={searchHandler} />
      <SearchResult searchResults={searchResults} />
      {fetching && <Spinner />}
      {noResults && !fetching && <NoResult />}
      {displayErrorMessage && !fetching && <ErrorMessage />}
    </div>
  );
};

export default Search;
