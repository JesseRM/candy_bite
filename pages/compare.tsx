import { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import CompareInstructions from "../components/CompareInstructions";
import CompareList from "../components/CompareList";
import CompSearchResults from "../components/CompSearchResults";
import NoResult from "../components/NoResult";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import styles from "../styles/Compare.module.css";

const Compare: NextPage = () => {
  const [nutrIndex, setNutrIndex] = useState(2);
  const [sortOrder, setSortOrder] = useState('descending');
  const [selected, setSelected] = useState([]);
  const [found, setFound] = useState(null);
  const [searchMode, setSearchMode] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  
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
    setFound(null);
    setNoResults(false);
  }
  
  return (
    <div>
      <h1 className={styles['title']}>Compare Nutrients</h1>
      {searchMode &&
        <>
          <SearchBar 
            setFound={setFound}  
            setFetching={setFetching}
            setNoResults={setNoResults} 
          />
          <div className={styles['done-btn-container']}>
            <button 
              className={styles['done-btn']} 
              onClick={handleDoneClick}
            >
              Done
            </button>
          </div>
          {!fetching && 
            <CompSearchResults 
              found={found} 
              selected={selected} 
              setSelected={setSelected} 
            />
          }
        </>
      }
      {(found === null && searchMode && !fetching) &&
        <CompareInstructions />
      }
      {(noResults && !fetching) &&
        <NoResult />
      }
      {fetching && 
        <Spinner />
      }
      {!searchMode && 
        <>
          <div className={styles['controls-container']}>
            <div>
              <select 
                value={nutrIndex} 
                className={styles['nutrient']} 
                onChange={handleNutrChange}
              >
                <option value={2}>Calories</option>
                <option value={4}>Fat</option>
                <option value={8}>Sugar</option>
                <option value={3}>Protein</option>
                <option value={6}>Carbohydrate</option>
                <option value={15}>Sodium</option>
              </select>
            </div>
            <div>
              <select 
                value={sortOrder} 
                className={styles['sort']}
                onChange={handleSortChange}
              >
                <option value={'descending'}>High to low</option>
                <option value={'ascending'}>Low to high</option>
              </select>
            </div>
            <button 
              className={styles['add']} 
              onClick={handleAddClick}
            >
              Add Item
            </button>
          </div>
          <CompareList 
            nutrIndex={nutrIndex} 
            selected={selected} 
            sortOrder={sortOrder} 
          />
        </>
      }
    </div> 
  )
}

export default Compare;