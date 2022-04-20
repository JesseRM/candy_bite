import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/NavBar.module.css';
import { IoMenu, IoClose } from 'react-icons/io5';

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  function displayMenu() {
    setShowMenu(showMenu ? false : true);
  }
  
  return (
    <header className={`${styles["primary-header"]} ${styles.flex}`}>
      <div className={styles['logo-container']}>
        <Image 
          src={'https://i.imgur.com/zlfVrsv.png'} 
          alt='Candy Bite logo' 
          layout='fill' 
          objectFit='contain'
        /> 
      </div>
      <div className={styles.title}>
        <span className={styles['site-name-1']}>Candy</span> <span className={styles['site-name-2']}>Bite</span>
      </div>
      {showMenu && 
        <IoClose className={styles["nav-toggle"]} onClick={displayMenu} />
      }
      {!showMenu && 
        <IoMenu className={styles["nav-toggle"]} onClick={displayMenu} />
      }
      <nav className={styles["primary-nav"]}>
        <ul onClick={displayMenu} className={`${styles["links-container"]} ${styles.flex}`} data-visible={showMenu}>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/compare'>Compare</Link>
          </li>
          <li>
            <Link href='/about'>About</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default NavBar;