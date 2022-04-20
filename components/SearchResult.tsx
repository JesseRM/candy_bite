import CandyBiteContext from "../context/state";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/SearchResult.module.css";
import { useContext } from "react";

const SearchResult = ({ found }: {found: any}) => {
  const { setSelectedCandy } = useContext(CandyBiteContext);

  function handleClick(index: number) {
    setSelectedCandy(found[index]);
  }
  
  return (
    <div className={styles['main-container']}>
      {found && found.map((candy: any, index: any) => {
        return(
          <div key={index} className={styles['card']} onClick={() => handleClick(index)}>
            <Link href='/nutrients' passHref={true}>
            <div className={styles['image-container']}>
              <Image 
                src={candy.imageUrl} 
                alt={`${candy.candyName} image`} 
                layout='fill'
                objectFit='contain'
              />
            </div>
            </Link>
            <Link href='/nutrients' passHref={true}>
            <div className={styles['info-container']}>
              <span>{candy.candyName.toUpperCase()}</span>
            </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default SearchResult;