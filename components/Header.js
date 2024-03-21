import styles from './Header.module.css';

export default function Header() {
  return (
    <header>
    <nav>
    <ul className={styles.ul}>
      <li><a href="/">Home</a></li>
    </ul>
    </nav>
    </header>
    );
  }