import styles from "../styles/ErrorMessage.module.css";
import { HiOutlineEmojiSad } from 'react-icons/hi';

const ErrorMessage = () => {
  return (
    <div className={styles['main-container']}>
      <div className={styles['icon-container']}>
        <HiOutlineEmojiSad className={styles['icon-sadface']} />
      </div>
      <p className={styles['message']}>
        Oops! Seems something went wrong with the request.  Please try again.
      </p>
    </div>
  )
}

export default ErrorMessage;