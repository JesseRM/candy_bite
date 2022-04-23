import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import styles from '../styles/SearchBar.module.css';

interface SearchBarProps {
  setFound: Dispatch<SetStateAction<null>>;
  setFetching: Dispatch<SetStateAction<boolean>>;
  setNoResults: Dispatch<SetStateAction<boolean>>;
}

const SearchBar = ({ setFound, setFetching, setNoResults }: SearchBarProps) => {  
  const [term, setTerm] = useState("");
  
  function handleclick() {
    fetchCandy();
  }

  function handleKeyUp(event:any) {
    const ENTER_KEY: number = 13;

    if (event.keyCode === ENTER_KEY) {
      fetchCandy();

      if (term && term.trim().length > 0) setFetching(true);
    }
  }

  function fetchCandy() {
    if (!term || term.trim().length === 0) return;
    
    const url = `/api/candy/${term.toLowerCase()}`;
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        setFetching(false);
        setFound(data);
        setNoResults(data.length === 0 ? true : false);
      });
  }

  //Clear input element on refresh
  useEffect(() => {
    const inputEl = document.querySelector("input");
    
    if (inputEl) inputEl.value = "";
    
  }, []);
  
  return (
    <div className={styles['main-container']}>
      <input
        className={styles['search-input']} 
        type="search" 
        placeholder="Search candy" 
        onChange={(event) => setTerm(event.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button 
        className={styles['search-btn']} 
        onClick={handleclick}
      >
        <IoSearch />
      </button>
    </div>
  )
}

export default SearchBar;