import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import NoResult from "../../components/NoResult";
import SearchBar from "../../components/SearchBar";
import SearchResult from "../../components/SearchResult";
import Spinner from "../../components/Spinner";
import styles from "../../styles/[term].module.css";
import { CandyInfo } from "interfaces/globalInterfaces";

const Search: NextPage = () => {
  const router = useRouter();
  const [term, setTerm] = useState(router.query["term"] as string);
  const [fetching, setFetching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Oops, something went wrong."
  );
  const [searchResults, setSearchResults] = useState<CandyInfo[]>([]);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  useEffect(() => {
    const newTerm = router.query["term"] as string;

    setTerm(newTerm);
    setSearchResults([]);
    fetchCandy(newTerm);
  }, [router.query.term]);

  function fetchCandy(term: string) {
    if (!term || term.trim().length === 0) return;

    setFetching(true);

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

  function searchHandler(term: string) {
    if (!term || term.trim().length === 0) return;

    setDisplayErrorMessage(false);
    setTerm(term);
    setSearchResults([]);
    setFetching(true);

    //Update URL with new term
    router.push("/search/" + term);
  }

  return (
    <div>
      <h1 className={styles["term"]}>{term}</h1>
      <SearchBar searchHandler={searchHandler} />
      <SearchResult searchResults={searchResults} />
      {fetching && <Spinner />}
      {displayErrorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default Search;
