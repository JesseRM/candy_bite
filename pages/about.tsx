import { NextPage } from "next";
import styles from "../styles/About.module.css";

const About: NextPage = () => {
  return (
    <div className={styles['main-container']}>
      <h1>About</h1>
      <p className={styles['message']}>
        Candy Bite is a place where you can easily find and compare nutritional information on various candy.
        Nutritional information is sourced from the U.S Department of Agriculture (USDA) database which houses nutrient values based on
        various research studies and surveys.
      </p>
      <p className={styles['message']}>
        Candy Bite was created for demonstration purposes only.
      </p>
    </div>
  )
}

export default About;