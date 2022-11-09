import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/NavBar.module.css";
import { IoMenu, IoClose } from "react-icons/io5";
import CandyBiteContext from "../context/state";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { setSearchResults, setAttemptedSearch, setDisplayErrorMessage } =
    useContext(CandyBiteContext);

  function displayMenu() {
    setShowMenu(showMenu ? false : true);
  }

  function handleLinkClick() {
    setSearchResults([]);
    setAttemptedSearch(false);
    setDisplayErrorMessage(false);
  }

  return (
    <header className={`${styles["primary-header"]} ${styles.flex}`}>
      <div className={styles["logo-container"]}>
        <Image
          src={"https://i.imgur.com/zlfVrsv.png"}
          alt="Candy Bite logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={styles.title}>
        <span className={styles["site-name-1"]}>Candy</span>{" "}
        <span className={styles["site-name-2"]}>Bite</span>
      </div>
      {showMenu && (
        <IoClose className={styles["nav-toggle"]} onClick={displayMenu} />
      )}
      {!showMenu && (
        <IoMenu className={styles["nav-toggle"]} onClick={displayMenu} />
      )}
      <nav className={styles["primary-nav"]}>
        <ul
          className={`${styles["links-container"]} ${styles.flex}`}
          onClick={displayMenu}
          data-visible={showMenu}
        >
          <li onClick={handleLinkClick}>
            <Link href="/">Home</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/compare">Compare</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
