import styles from "./Button.module.scss";
import classNames from "classnames";

const Button = ({
  title,
  rightIcon,
  leftIcon,
  variant = "default",
  style,
  dark,
  onClick,
}: {
  title: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  variant?:
    | "chars"
    | "default"
    | "hero"
    | "voltar"
    | "assistaAgora"
    | "fechar"
    | "anterior"
    | "ghost";
  dark?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}) => {
  return (
    <button
      style={style}
      className={classNames(
        styles.baseButton,
        styles[variant],
        dark ? styles.dark : ""
      )}
      onClick={onClick}
    >
      <div className={styles.firstText}>
        {leftIcon}
        <span className={styles.textWrapper}>
          <p>{title}</p>
        </span>
        {rightIcon}
      </div>
      <div className={styles.secondText}>
        {leftIcon}
        <span className={styles.textWrapper}>
          <p>{title}</p>
        </span>
        {rightIcon}
      </div>
    </button>
  );
};

export default Button;
