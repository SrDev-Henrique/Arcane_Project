"use client";

import styles from "./RenderContent.module.scss";
import TransitionCard from "@/components/TransitionCard/TransitionCard";
import { useEffect, useRef, useState } from "react";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { contentVariants, hiddenTextVariants, textVariants } from "./anime";
import AnimatedLine from "@/components/AnimatedLine";
import useDimension from "@/utils/useDimension";

const RenderContent = ({ title, text }: { title: string; text: string }) => {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const [isVertical, setIsVertical] = useState(false);

  const isInView = useInView(contentRef, { amount: !isVertical ? 0.8 : 0.96 });

  const { width } = useDimension();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ]
  );

  useEffect(() => {
    if (width !== null) {
      setIsVertical(width > 1023);
    }
  }, [width]);

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className={styles.container}>
      <TransitionCard initial marginBottom={-1} />
      <div ref={targetRef} className={styles.contentContainer}>
        <motion.div
          ref={contentRef}
          variants={contentVariants}
          initial="outOfView"
          animate={isInView ? "inView" : "outOfView"}
          className={styles.content}
        >
          <div className={styles.leftSide}>
            <div className={styles.titleContainer}>
              <motion.h1
                variants={textVariants}
                initial="outOfView"
                animate={isInView ? "inView" : "outOfView"}
              >
                {title}
              </motion.h1>
              {isVertical && (
                <AnimatedLine
                  color={isInView ? "#84D323" : "#333333"}
                  inView={contentRef}
                />
              )}
            </div>
            <div className={styles.progressIndicator}>
              <div className={styles.progressIndicatorCircleContainer}>
                <svg className={styles.progressCircle} width="60" height="60">
                  <circle
                    className={styles.progressCircleBg}
                    cx="30"
                    cy="30"
                    r="27"
                    stroke={isInView ? "#333333" : "#8a9a5b"}
                  />
                  <motion.circle
                    cx="30"
                    cy="30"
                    r="27"
                    stroke={isInView ? "#84D323" : "#0d0d0d"}
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="169.65"
                    style={{
                      pathLength,
                    }}
                  />
                </svg>
              </div>
            </div>
          </div>
          {isVertical && (
            <AnimatedLine
              color={isInView ? "#84D323" : "#333333"}
              vertical={isVertical}
              inView={contentRef}
            />
          )}
          <div className={styles.rightSide}>
            <div className={styles.contentText}>
              <motion.p
                variants={hiddenTextVariants}
                initial="outOfView"
                animate={isInView ? "inView" : "outOfView"}
              >
                {text}
              </motion.p>
            </div>
            <div className={styles.overlayText}>
              <motion.p
                variants={textVariants}
                initial="outOfView"
                animate={isInView ? "inView" : "outOfView"}
                style={{ clipPath }}
                ref={textRef}
              >
                {text}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
      <TransitionCard initial={false} marginTop={-1} />
    </div>
  );
};

export default RenderContent;
