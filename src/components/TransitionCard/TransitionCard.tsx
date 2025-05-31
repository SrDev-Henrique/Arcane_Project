"use client";

import { useRef } from "react";
import styles from "./TransitionCard.module.scss";
import { motion, useScroll, useTransform } from "framer-motion";

const TransitionCard = ({ initial, marginBottom, marginTop }: { initial: boolean, marginBottom?: number, marginTop?: number }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress: initialProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start start"],
  });

  const initialClipPath = useTransform(
    initialProgress,
    [0, 0.6, 0.6, 1],
    [
      "polygon(20% 50%, 80% 50%, 100% 100%, 0% 100%)",
      "polygon(20% 10%, 80% 10%, 100% 100%, 0% 100%)",
      "polygon(20% 10%, 80% 10%, 100% 100%, 0% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ]
  );

  const { scrollYProgress: endingProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const endingClipPath = useTransform(
    endingProgress,
    [0, 0.6, 0.6, 1],
    [
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      "polygon(0% 0%, 100% 0%, 80% 90%, 20% 90%)",
      "polygon(0% 0%, 100% 0%, 80% 90%, 20% 90%)",
      "polygon(0% 0%, 100% 0%, 80% 50%, 20% 50%)",
    ]
  );

  return (
    <motion.div
      ref={targetRef}
      style={{
        clipPath: initial ? initialClipPath : endingClipPath,
        marginBottom: marginBottom,
        marginTop: marginTop,
      }}
      className={styles.container}
    />
  );
};

export default TransitionCard;
