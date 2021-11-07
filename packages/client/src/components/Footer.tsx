import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.contents}>
        <span className={styles.footerTitle}>ClerkApartments Inc.</span>
      </div>
    </footer>
  );
}
