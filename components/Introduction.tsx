import styles from "../styles/Introduction.module.css";

const Introduction = () => {
  return (
    <div className={styles["main-container"]}>
      <div className={styles["info-container"]}>
        <h2 className={styles["info-header"]}>Nutrition</h2>
        <p className={styles["info-text"]}>
          Get nutrient content such as calories, fat, sugar and more
        </p>
      </div>
      <div className={styles["info-container"]}>
        <h2 className={styles["info-header"]}>Compare</h2>
        <p className={styles["info-text"]}>
          Select multiple candy to compare various nutrient contents
        </p>
      </div>
    </div>
  );
};

export default Introduction;
