import styles from "./Intro.module.scss";
import { columnImages } from "./data";
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { columnsVariants } from "./anime";

const Intro = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const checkInViewRef = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(checkInViewRef, {
    amount: 0.1,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start center"],
  });

  const { scrollYProgress: columnsProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "end start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#EAD8C0", "#7a7454"]
  );

  const rawX0 = useTransform(columnsProgress, [0, 1], ["-3%", "45%"]);

  const rawX1 = useTransform(columnsProgress, [0, 1], ["-5%", "45%"]);

  const rawX2 = useTransform(columnsProgress, [0, 1], ["-7%", "45%"]);

  const rawX3 = useTransform(columnsProgress, [0, 1], ["-9%", "45%"]);

  const rawX4 = useTransform(columnsProgress, [0, 1], ["-11%", "45%"]);

  const smoothX0 = useSpring(rawX0, {
    damping: 10,
    stiffness: 50,
    mass: 0.5,
  });

  const smoothX1 = useSpring(rawX1, {
    damping: 10,
    stiffness: 50,
    mass: 0.5,
  });

  const smoothX2 = useSpring(rawX2, {
    damping: 10,
    stiffness: 50,
    mass: 0.5,
  });

  const smoothX3 = useSpring(rawX3, {
    damping: 10,
    stiffness: 50,
    mass: 0.5,
  });

  const smoothX4 = useSpring(rawX4, {
    damping: 10,
    stiffness: 50,
    mass: 0.5,
  });

  const smoothList = [smoothX0, smoothX1, smoothX2, smoothX3, smoothX4];

  return (
    <motion.div
      ref={containerRef}
      className={styles.container}
      style={{
        backgroundColor,
      }}
    >
      <motion.div
        ref={contentRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={columnsVariants}
        className={styles.content}
      >
        <div ref={checkInViewRef} className={styles.checkInView} />
        {columnImages.map((personagens, index) => {
          const { nome } = personagens;
          return (
            <motion.div
              key={index}
              layoutScroll={false}
              className={styles.columns}
              style={{
                x: smoothList[index],
                willChange: "transform",
              }}
            >
              {personagens.image.map((src, index) => (
                <div
                  style={{ width: "40vw" }}
                  key={index}
                  className={styles.imageContainer}
                >
                  <Image
                    alt={`${nome} - ${index}`}
                    src={src}
                    width={736}
                    height={736}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    loading="eager"
                  />
                </div>
              ))}
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Intro;
