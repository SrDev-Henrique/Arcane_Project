import { JSX, useRef } from "react";
import styles from "./AnimatedText.module.scss";
import { motion, useInView } from "framer-motion";

export const AnimatedText = ({
  text,
  stagger,
  el: Wrapper = "p",
  scale,
}: {
  text: string | string[];
  stagger?: number;
  el?: keyof JSX.IntrinsicElements;
  scale?: number;
}) => {
  const textRef = useRef<HTMLSpanElement | null>(null);

  const textArray = Array.isArray(text) ? text : [text];
  const isInView = useInView(textRef, { amount: 0.5, once: true });

  const staggerChildren = stagger || 0.005;
  const scaleAnimation = scale || 1;

  const charsAnimations = {
    hidden: {
      opacity: 0,
      x: -20,
      scale: scaleAnimation,
    },
    visible: {
      opacity: 1,
      x: 0,
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
                  <motion.span variants={charsAnimations} key={i}>
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
      y: -125,
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
