"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AnimatedLine = ({
  color,
  vertical,
  once,
  inView,
}: {
  color: string;
  vertical?: boolean;
  once?: boolean;
  inView?: React.RefObject<HTMLDivElement | null>;
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(inView ? inView : targetRef, {
    amount: inView ? 0.99 : 0.1,
    once: once ? true : false,
  });

  const scaleY = vertical ? 0 : 1;

  const lineVariants = {
    hidden: {
      scaleX: vertical ? 1 : 0,
      scaleY,
      transition: {
        duration: 2,
        ease: [0.215, 1, 0.3, 1],
      },
    },
    visible: {
      scaleX: 1,
      scaleY: 1,
      transition: {
        duration: 2,
        ease: [0.215, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={targetRef}
      style={{
        width: vertical ? "1px" : "100%",
        height: vertical ? "100%" : "1px",
        backgroundColor: color,
        transformOrigin: vertical ? "top" : "left",
      }}
      initial="hidden"
      variants={lineVariants}
      animate={isInView ? "visible" : "hidden"}
    />
  );
};

export default AnimatedLine;
