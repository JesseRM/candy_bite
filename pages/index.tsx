import type { NextPage } from 'next'
import { useState } from 'react'
import Introduction from '../components/Introduction'
import NoResult from '../components/NoResult'
import SearchBar from '../components/SearchBar'
import SearchResult from '../components/SearchResult'
import Spinner from '../components/Spinner'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [found, setFound] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  
  return (
    <div>
      <div className={styles['welcome-container']}>
        <div className={styles['background-image']}> </div>
        <h1 className={styles['welcome']}>Nutritional Information of Your Favorite Candy</h1>
      </div>
      <SearchBar 
        setFound={setFound} 
        setFetching={setFetching}
        setNoResults={setNoResults} 
      />
      {(found === null && !fetching) &&
        <Introduction />
      }
      {fetching && 
        <Spinner />
      }
      {noResults &&
        <NoResult />
      }
      {!fetching &&
        <SearchResult found={found} />
      }
    </div>
  )
}

export default Home;
