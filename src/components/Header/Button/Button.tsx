import { motion } from "framer-motion";
import styles from "./Button.module.scss";

export default function Button({
  isActive,
  toggleMenu,
  ref,
}: {
  isActive: boolean;
  toggleMenu: () => void;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={ref} className={styles.button}>
      <motion.div
        className={styles.slider}
        animate={{ top: isActive ? "-100%" : "0%" }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className={styles.el}
          onClick={() => {
            toggleMenu();
          }}
        >
          <PerspectiveText label="Menu" />
        </div>
        <div
          className={styles.el}
          onClick={() => {
            toggleMenu();
          }}
        >
          <PerspectiveText label="Fechar" />
        </div>
      </motion.div>
    </div>
  );
}

function PerspectiveText({ label }: { label: string }) {
  return (
    <div className={styles.perspectiveText}>
      <p>{label}</p>
      <p>{label}</p>
    </div>
  );
}
