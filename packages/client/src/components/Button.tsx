import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  handleClick?: () => void;
  naked?: boolean;
};

export function Button({
  children,
  handleClick,
  naked = false,
}: ButtonProps): JSX.Element {
  return (
    <button
      onClick={handleClick}
      className={clsx(styles.button, naked && styles.naked)}
    >
      {children}
    </button>
  );
}
