import { JSX, useRef } from "react";
import styles from "./AnimatedText.module.scss";
import { motion, useInView } from "framer-motion";

export const AnimatedText = ({
  text,
  stagger,
  el: Wrapper = "p",
  scale,
  skew,
  blur,
  x,
  y,
  once,
}: {
  text: string | string[];
  stagger?: number;
  el?: keyof JSX.IntrinsicElements;
  scale?: number;
  skew?: number;
  blur?: number;
  x?: number;
  y?: number;
  once?: boolean;
}) => {
  const textRef = useRef<HTMLSpanElement | null>(null);

  const onceAnimation = once || false;

  const textArray = Array.isArray(text) ? text : [text];
  const isInView = useInView(textRef, { amount: 0.5, once: onceAnimation });

  const staggerChildren = stagger || 0.005;
  const scaleAnimation = scale || 1;
  const skewAnimation = skew || 0;
  const blurAnimation = blur || 0;
  const xAnimation = x || 0;
  const yAnimation = y || 0;

  const charsAnimations = {
    hidden: {
      opacity: 0,
      x: xAnimation,
      y: yAnimation,
      scale: scaleAnimation,
      skewX: `${skewAnimation}deg`,
      filter: `blur(${blurAnimation}px)`,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      skewX: "0deg",
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Wrapper className={styles.wrapper}>
      <span className={styles.srOnly}>{text}</span>
      <motion.span
        ref={textRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren,
            },
          },
          hidden: {},
        }}
        role="presentation"
        aria-hidden
      >
        {textArray.map((line, index) => (
          <span style={{ display: "block" }} key={index}>
            {line.split(" ").map((word, index) => (
              <span key={index}>
                {word.split("").map((char, i) => (
                  <motion.span
                    style={{
                      willChange: isInView ? "transform, opacity" : "none",
                      display: "inline-block",
                    }}
                    variants={charsAnimations}
                    key={i}
                  >
                    {char}
                  </motion.span>
                ))}
                <span>&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export const AnimatedTitle = ({
  text,
  delay,
}: {
  text: string | string[];
  delay?: number;
}) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const textArray = Array.isArray(text) ? text : [text];

  const isInView = useInView(titleRef, { amount: 0.5 });

  const transitionDelay = delay || 0;

  const titleAnimation = {
    hidden: {
      y: 125,
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
        delay: transitionDelay,
      },
    },
  };

  return (
    <h1 className={styles.wrapper}>
      <span className={styles.srOnly}>{text}</span>
      <motion.span
        ref={titleRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
          hidden: {},
        }}
        aria-hidden
      >
        {textArray.map((word, index) => (
          <motion.span
            style={{ display: "inline-block" }}
            key={index}
            variants={titleAnimation}
          >
            {word}
            <span>&nbsp;</span>
          </motion.span>
        ))}
      </motion.span>
    </h1>
  );
};
