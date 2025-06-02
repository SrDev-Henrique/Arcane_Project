"use client";

import { useRef } from "react";
import styles from "./AnimatedColumns.module.scss";

import { motion, useScroll, useTransform } from "framer-motion";
import TransitionCard from "@/components/TransitionCard/TransitionCard";

const AnimatedColumns = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const transform0 = useTransform(scrollYProgress, [0, 1], ["scaleY(0)", "scaleY(1)"]);
  const transform1 = useTransform(scrollYProgress, [0.2, 1], ["scaleY(0)", "scaleY(1)"]);
  const transform2 = useTransform(scrollYProgress, [0.4, 1], ["scaleY(0)", "scaleY(1)"]);
  const transform3 = useTransform(scrollYProgress, [0.6, 1], ["scaleY(0)", "scaleY(1)"]);

  const transformList = [transform3, transform2, transform1, transform0];

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
            style={{ transform: transformList[index] }}
            className={styles.column}
          />
        ))}
      </div>
      <TransitionCard initial={false} marginTop={-1} />
    </div>
  );
};

export default AnimatedColumns;
