import type { NextPage } from 'next'
import { useContext } from 'react'
import CandyBiteContext from '../context/state'
import Image from 'next/image'
import { IoArrowBack } from 'react-icons/io5';
import styles from '../styles/Nutrients.module.css'
import Link from 'next/link';

const Nutrients: NextPage = () => {
  const { selectedCandy } = useContext(CandyBiteContext);

  if (!selectedCandy) {
    return (
      <div>You have not selected a candy yet</div>
    )
  }
  
  const calories: number = selectedCandy['nutrients'][2]['amount'];
  const caloriesUnit: string = selectedCandy['nutrients'][2]['nutrient']['unitName'];
  const fat: number = selectedCandy['nutrients'][4]['amount'];
  const fatUnit: string = selectedCandy['nutrients'][4]['nutrient']['unitName'];
  const sugar: number = selectedCandy['nutrients'][8]['amount'];
  const sugarUnit: string = selectedCandy['nutrients'][8]['nutrient']['unitName'];
  const protein: number = selectedCandy['nutrients'][3]['amount'];
  const proteinUnit: string = selectedCandy['nutrients'][3]['nutrient']['unitName'];
  const carbohydrate: number = selectedCandy['nutrients'][6]['amount'];
  const carbohydrateUnit: string = selectedCandy['nutrients'][6]['nutrient']['unitName'];
  const sodium: number = selectedCandy['nutrients'][15]['amount'];
  const sodiumUnit: string = selectedCandy['nutrients'][15]['nutrient']['unitName'];
  
  return (
    <div>
      <h1 className={styles.welcome}>{selectedCandy.candyName.toUpperCase()}</h1>
      <div className={styles['image-container']}>
        <div className={styles['image']}>
          <Image 
            src={selectedCandy.imageUrl}
            alt={selectedCandy.candyName}
            layout='fill'
            objectFit='contain'
          />
        </div>
      </div>
      <div className={styles['back-btn-container']}>
        <Link 
          href='/' 
          passHref={true}
        >
          <button className={styles['back-btn']}>
            <IoArrowBack />
          </button>
        </Link>
      </div>
      <div className={styles['portion-container']}>
        <h2>Portion: 100 g</h2>
      </div>
      <div className={styles['table-container']}>
        <table className={styles['main-table']}>
          <thead>
            <tr>
              <th>Nutrient</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Calories</td>
              <td>{ `${calories} ${caloriesUnit}` }</td>
            </tr>
            <tr>
              <td>Fat</td>
              <td>{ `${fat} ${fatUnit}` }</td>
            </tr>
            <tr>
              <td>Sugar</td>
              <td>{ `${sugar} ${sugarUnit}` }</td>
            </tr>
            <tr>
              <td>Protein</td>
              <td>{ `${protein} ${proteinUnit}` }</td>
            </tr>
            <tr>
              <td>Carbohydrate</td>
              <td>{ `${carbohydrate} ${carbohydrateUnit}` }</td>
            </tr>
            <tr>
              <td>Sodium</td>
              <td>{ `${sodium} ${sodiumUnit}` }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Nutrients