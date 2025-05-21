"use client";

import { useRef } from "react";
import styles from "./AnimatedTitle.module.scss";

import { animatedWordsVariants } from "./anime";
import { motion, useInView } from "framer-motion";

interface AnimatedTitleProps {
  title: string;
}

const AnimatedTitle = ({ title }: AnimatedTitleProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { amount: 1, once: true });
  return (
    <motion.div
      ref={containerRef}
      className={styles.animatedTitle}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        staggerChildren: 0.1,
      }}
    >
      {title.split("<br/>").map((line, index) => (
        <motion.div
          variants={animatedWordsVariants}
          key={index}
          className={styles.titles}
        >
          {line.split(" ").map((word, index) => (
            <span
              key={index}
              className={styles.words}
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedTitle;
