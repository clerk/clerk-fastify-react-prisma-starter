import styles from "./GridLayout.module.css";

export function GridLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.apartments}>
      <div className={styles.grid}>{children}</div>
    </div>
  );
}
