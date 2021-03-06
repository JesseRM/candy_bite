import type { NextPage } from 'next'
import { useContext, useState } from 'react'
import Introduction from '../components/Introduction'
import NoResult from '../components/NoResult'
import SearchBar from '../components/SearchBar'
import SearchResult from '../components/SearchResult'
import Spinner from '../components/Spinner'
import CandyBiteContext from '../context/state'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { searchResults, setSearchResults, attemptedSearch } = useContext(CandyBiteContext);
  const [fetching, setFetching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  
  return (
    <div>
      <div className={styles['welcome-container']}>
        <div className={styles['background-image']}></div>
        <h1 className={styles['welcome']}>Nutritional Information of Your Favorite Candy</h1>
      </div>
      <SearchBar 
        setSearchResults={setSearchResults} 
        setFetching={setFetching}
        setNoResults={setNoResults} 
      />
      {(!attemptedSearch && !fetching && searchResults.length === 0) &&
        <Introduction />
      }
      {fetching && 
        <Spinner />
      }
      {(noResults && !fetching) &&
        <NoResult />
      }
      {!fetching &&
        <SearchResult searchResults={searchResults} />
      }
    </div>
  )
}

export default Home;
