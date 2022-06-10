import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import CandyBiteContext from '../context/state';
import { CandyInfo } from '../interfaces/globalInterfaces';
import styles from '../styles/SearchBar.module.css';

interface SearchBarProps {
  setSearchResults: React.Dispatch<React.SetStateAction<CandyInfo[]>>;
  setFetching: Dispatch<SetStateAction<boolean>>;
  setNoResults: Dispatch<SetStateAction<boolean>>;
}

const SearchBar = ({ setSearchResults, setFetching, setNoResults }: SearchBarProps) => {  
  const [term, setTerm] = useState("");
  const { setAttemptedSearch } = useContext(CandyBiteContext);
  
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
    setAttemptedSearch(true);

    if (!term || term.trim().length === 0) return;
    
    const url = `/api/candy/${term.toLowerCase()}`;
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        setFetching(false);
        setSearchResults(data);
        setNoResults(data.length === 0 ? true : false);
      });
  }

  //Clear input element on mount
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