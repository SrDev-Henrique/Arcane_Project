"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AnimatedLine = ({ color }: { color: string }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(targetRef, { amount: 0.1, once: true });

  const lineVariants = {
    hidden: {
      scaleX: 0,
    },
    visible: {
      scaleX: 1,
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
        width: "100%",
        height: "1px",
        backgroundColor: color,
        transformOrigin: "left",
      }}
      initial="hidden"
      variants={lineVariants}
      animate={isInView ? "visible" : "hidden"}
    />
  );
};

export default AnimatedLine;
