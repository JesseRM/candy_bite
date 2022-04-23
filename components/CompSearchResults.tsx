import Image from "next/image";
import { Dispatch, SetStateAction, MouseEvent } from "react";
import { IoAddCircle} from 'react-icons/io5';
import styles from "../styles/CompSearchResults.module.css";

interface CompSearchResultsProps {
  found: any;
  selected: any;
  setSelected: Dispatch<SetStateAction<never[]>>;
}

const CompSearchResults = ({ found, selected,  setSelected}: CompSearchResultsProps) => {
  function handleAddClick(event: MouseEvent<SVGElement, globalThis.MouseEvent>, candy: any) {
    const added = selected.find((element: any) => element.candyName === candy.candyName);
    let newSelected: any;

    if (added) {
      newSelected = selected.filter((element: any) => element.candyName !== candy.candyName);
    } else {
      newSelected = [...selected, candy];
    }
    
    setSelected(newSelected);
  }

  return (
    <div className={styles['main-container']}>
      {found && found.map((candy: any, index: any) => {
        const alreadySelected = selected.find((element: any) => element.candyName === candy.candyName);
        
        return(
          <div 
            key={index} 
            className={styles['card']}
          >
            <div className={styles['image-container']}>
              <Image 
                src={candy.imageUrl} 
                alt={`${candy.candyName} image`} 
                layout='fill'
                objectFit='contain'
              />
            </div>
            <div className={styles['name-container']}>
              <span>{candy.candyName.toUpperCase()}</span>
            </div>
            <div className={styles['btn-container']}>
              <IoAddCircle 
                className={styles['add']} 
                onClick={(event) => handleAddClick(event, candy)} 
                data-selected={alreadySelected ? true : false} 
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CompSearchResults;