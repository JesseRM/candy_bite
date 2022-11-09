import styles from "../styles/NoResult.module.css";

const NoResult = () => {
  return (
    <div className={styles["main-container"]}>
      <p className={styles["message"]}>
        Sorry, no results matching that term. Please try a different term.
      </p>
    </div>
  );
};

export default NoResult;
