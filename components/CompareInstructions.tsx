import styles from "../styles/CompareInstructions.module.css";
import { IoAddCircle } from "react-icons/io5";

const CompareInstructions = () => {
  return (
    <div className={styles["main-container"]}>
      <p className={styles["message"]}>
        Try searching for and adding <IoAddCircle /> candy to compare
      </p>
    </div>
  );
};

export default CompareInstructions;
