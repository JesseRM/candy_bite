import Image from "next/image";
import styles from "../styles/CompareList.module.css";

interface CompareListProps {
  nutrIndex: number;
  selected: any;
  sortOrder: string;
}

const CompareList = ({ nutrIndex, selected, sortOrder }: CompareListProps) => {
  const list = [...selected];
  const NUTRIENTS = {
    2: 'Calories',
    4: 'Fat',
    8: 'Sugar',
    3: 'Protein',
    6: 'Carbs',
    15: 'Sodium' 
  };
  
  if (sortOrder === "ascending") {
    list.sort((a, b) => {
      return a['nutrients'][nutrIndex]['amount'] - b['nutrients'][nutrIndex]['amount'];
    });
  }

  if (sortOrder === "descending") {
    list.sort((a, b) => {
      return b['nutrients'][nutrIndex]['amount'] - a['nutrients'][nutrIndex]['amount'];
    });
  }
  
  return (
    <div className={styles['main-container']}>
      {list && list.map((candy: any, index: any) => {
        const unitName = candy['nutrients'][nutrIndex]['nutrient']['unitName'];
        
        return(
          <div key={index} className={styles['card']}>
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
            <div className={styles['info-container']}>
              <div className={styles.nutrient}>
                <span>{NUTRIENTS[nutrIndex as keyof typeof NUTRIENTS]}:</span>
              </div>
              <div className={styles.amount}>
                <span>{candy['nutrients'][nutrIndex]['amount'] + ' ' + unitName}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CompareList;