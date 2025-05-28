"use client";

import styles from "./Outro.module.scss";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Outro = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: barRef,
    offset: ["start center", "end center"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const containerBackground = useTransform(
    scrollYProgress,
    [0.4, 0.65],
    ["#ead8c0", "#1d1d1d"]
  );
  const barBackground = useTransform(
    scrollYProgress,
    [0.4, 0.65],
    ["#f4e7e1", "#b2ac88"]
  );
  const progressBackground = useTransform(
    scrollYProgress,
    [0.4, 0.65],
    ["#d6a77a", "#8a9a5b"]
  );

  return (
    <motion.div
      ref={containerRef}
      style={{
        backgroundColor: containerBackground,
      }}
      className={styles.container}
    >
      <h1 className={styles.piltover}>Piltover</h1>
      <motion.div
        ref={barRef}
        style={{
          backgroundColor: barBackground,
        }}
        className={styles.bar}
      >
        <motion.div
          ref={progressRef}
          style={{
            height: progress,
            backgroundColor: progressBackground,
          }}
          className={styles.barProgress}
        />
      </motion.div>
    </motion.div>
  );
};

export default Outro;
