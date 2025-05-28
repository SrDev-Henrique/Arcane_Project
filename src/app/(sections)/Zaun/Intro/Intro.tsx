"use client";

import { useRef } from "react";
import styles from "./Intro.module.scss";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { textVariants } from "./anime";
import Image from "next/image";

const Intro = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(textRef, { amount: 0.95 });

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["end center", "end start"],
  });

  const contentMaskImage = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "linear-gradient(to bottom, white 90%,transparent 100%)",
      "linear-gradient(to bottom, white -10%, transparent 0%)",
    ]
  );

  const imageMaskImage = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "linear-gradient(to top, white -20%, transparent 0%)",
      "linear-gradient(to top, white 78%, transparent 98%)",
    ]
  );

  const { scrollYProgress: topProgress } = useScroll({
    target: contentRef,
    offset: ["start center", "end end"],
  });

  const top = useTransform(topProgress, [0, 1], ["50vh", "70vh"]);
  const fontSize = useTransform(
    topProgress,
    [0, 1],
    ["clamp(3rem, 10vw, 9rem)", "clamp(6.675rem, 18vw, 14rem)"]
  );

  return (
    <div ref={containerRef} className={styles.container}>
      <motion.div
        ref={contentRef}
        style={{
          maskImage: contentMaskImage,
          WebkitMaskImage: contentMaskImage,
        }}
        className={styles.content}
      >
        <motion.div
          style={{
            top,
          }}
          className={styles.sticky}
        >
          <motion.h1
            style={{
              fontSize,
            }}
          >
            Zaun
          </motion.h1>
        </motion.div>
        <motion.div
          ref={textRef}
          variants={textVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={styles.introText}
        >
          <p>A cidade das sombras</p>
        </motion.div>
      </motion.div>
      <div className={styles.introImage}>
        <motion.div style={{
          maskImage: imageMaskImage,
          WebkitMaskImage: imageMaskImage,
        }} className={styles.imageContainer}>
          <Image
            src="/images/arcane_zaun/intro.webp"
            alt="Vi olhando para a cidade de Zaun"
            width={3840}
            height={1632}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Intro;
