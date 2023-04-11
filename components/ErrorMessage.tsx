import styles from "../styles/ErrorMessage.module.css";
import { HiOutlineEmojiSad } from "react-icons/hi";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className={styles["main-container"]}>
      <div className={styles["icon-container"]}>
        <HiOutlineEmojiSad className={styles["icon-sadface"]} />
      </div>
      <p className={styles["message"]}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
