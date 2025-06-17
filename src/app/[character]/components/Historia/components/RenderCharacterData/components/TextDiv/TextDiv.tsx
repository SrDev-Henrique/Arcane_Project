import styles from "./TextDiv.module.scss";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { textVariants } from "./anime";
import classNames from "classnames";

const TextDiv = ({ content, theme }: { content: string; theme: string }) => {
  const textRef = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(textRef, { amount: 0.3, once: true });
  return (
    <motion.div
      variants={textVariants}
      initial="hidden"
      animate={isInView ? "visible" : ""}
      ref={textRef}
      className={classNames(
        styles.charContent,
        theme === "zaun" ? styles.dark : ""
      )}
    >
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </motion.div>
  );
};

export default TextDiv;
