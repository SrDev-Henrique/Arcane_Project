"use client";

import Image from "next/image";
import styles from "./Intro.module.scss";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const images = [
  "/images/Outro/Outro-1.webp",
  "/images/Outro/Outro-2.webp",
  "/images/Outro/Outro-3.webp",
  "/images/Outro/Outro-4.webp",
  "/images/Outro/Outro-5.webp",
];

const Intro = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: imagesScroll } = useScroll({
    target: containerRef,
    offset: ["start center", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0.2, 1], [10, 1]);
  const containerScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["0rem", "1.5rem"]
  );
  const opacity = useTransform(imagesScroll, [0, 1], [1, 0]);

  const paddingRight = useTransform(scrollYProgress, [0.2, 1], ["27rem", "0rem"]);

  const clipPath1 = useTransform(
    scrollYProgress,
    [0, 0.25],
    [
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      "polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)",
    ]
  );
  const clipPath2 = useTransform(
    scrollYProgress,
    [0.25, 0.5],
    [
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      "polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)",
    ]
  );
  const clipPath3 = useTransform(
    scrollYProgress,
    [0.5, 0.75],
    [
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      "polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)",
    ]
  );
  const clipPath4 = useTransform(
    scrollYProgress,
    [0.75, 1],
    [
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ]
  );

  const clipPathList = [clipPath4, clipPath3, clipPath2, clipPath1, clipPath1];

  const smoothScale = useSpring(scale, {
    damping: 10,
    stiffness: 50,
    mass: 0.5,
  });

  const smoothPadding = useSpring(paddingRight, {
    damping: 10,
    stiffness: 50,
    mass: 0.5,
  });

  return (
    <motion.div ref={containerRef} className={styles.container}>
      <div className={styles.stickyDiv}>
        <motion.div
          style={{ scale: containerScale, rotate, borderRadius }}
          className={styles.images}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              style={{ clipPath: clipPathList[index] }}
              className={styles.imageContainer}
            >
              <Image
                src={image}
                alt={`Outro-${index + 1}`}
                width={3840}
                height={1632}
              />
            </motion.div>
          ))}
        </motion.div>
        <motion.div style={{ scale: smoothScale }} className={styles.texts}>
          <motion.h1
            style={{
              paddingRight: smoothPadding,
            }}
            className={styles.firstText}
          >
            Arc
          </motion.h1>

          <h1 className={styles.secondText}>Ane</h1>
        </motion.div>
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#0a0a0a",
            zIndex: 3,
            opacity,
          }}
        />
      </div>
    </motion.div>
  );
};

export default Intro;
