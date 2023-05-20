import { useEffect, useState, KeyboardEvent } from "react";
import { IoSearch } from "react-icons/io5";
import styles from "../styles/SearchBar.module.css";

interface SearchBarProps {
  searchHandler: (s: string) => void;
}

const SearchBar = ({ searchHandler }: SearchBarProps) => {
  const [term, setTerm] = useState("");

  function handleclick() {
    searchHandler(term);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const ENTER_KEY: string = "Enter";

    if (event.key === ENTER_KEY) {
      searchHandler(term);
    }
  }

  //Clear input element on mount
  useEffect(() => {
    const inputEl = document.querySelector("input");

    if (inputEl) inputEl.value = "";
  }, []);

  return (
    <div className={styles["main-container"]}>
      <input
        className={styles["search-input"]}
        type="search"
        placeholder="     Search candy"
        onChange={(event) => setTerm(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className={styles["search-btn"]}
        onClick={handleclick}
        data-testid="search-button"
      >
        <IoSearch />
      </button>
    </div>
  );
};

export default SearchBar;
