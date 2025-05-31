"use client";

import { useRef } from "react";
import styles from "./AnimatedColumns.module.scss";

import { motion, useScroll, useTransform } from "framer-motion";
import TransitionCard from "@/components/TransitionCard/TransitionCard";

const AnimatedColumns = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const height0 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const height1 = useTransform(scrollYProgress, [0.2, 1], ["0%", "100%"]);
  const height2 = useTransform(scrollYProgress, [0.4, 1], ["0%", "100%"]);
  const height3 = useTransform(scrollYProgress, [0.6, 1], ["0%", "100%"]);

  const heightsList = [height3, height2, height1, height0];

  return (
    <div className={styles.container}>
      <div className={styles.stickyContainer}>
        <div className={styles.sticky}>
          <h1>Switch</h1>
        </div>
      </div>
      <div ref={containerRef} className={styles.columnsContainer}>
        {[...Array(4)].map((column, index) => (
          <motion.div
            key={index}
            style={{ height: heightsList[index] }}
            className={styles.column}
          />
        ))}
      </div>
      <TransitionCard initial={false} marginTop={-1} />
    </div>
  );
};

export default AnimatedColumns;
