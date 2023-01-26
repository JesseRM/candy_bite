import { useEffect, useState } from "react";
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

  function handleKeyUp(event: any) {
    const ENTER_KEY: number = 13;

    if (event.keyCode === ENTER_KEY) {
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
        onKeyUp={handleKeyUp}
      />
      <button className={styles["search-btn"]} onClick={handleclick}>
        <IoSearch />
      </button>
    </div>
  );
};

export default SearchBar;
