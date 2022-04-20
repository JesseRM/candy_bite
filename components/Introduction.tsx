import styles from "../styles/Introduction.module.css";

const Introduction = () => {
  return (
    <div className={styles['main-container']}>
      <div className={styles['info-container']}>
        <h2 className={styles['info-header']}>Search</h2>
        <p className={styles['info-text']}>Try searching for candy to get nutritional information</p>
      </div>
      <div className={styles['info-container']}>
        <h2 className={styles['info-header']}>Compare</h2>
        <p className={styles['info-text']}>Select multiple candy to compare various nutrient contents</p>
      </div>
    </div>
  )
}

export default Introduction;