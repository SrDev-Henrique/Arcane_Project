import Image from "next/image";
import styles from "./RenderAbout.module.scss";
import { AboutBlock } from "@/types/CharacterTypes";
import classNames from "classnames";

import { motion } from "framer-motion";
import {
  currentImageContainerVariants,
  prevImageContainerVariants,
  nextImageContainerVariants,
  prevTextVariants,
  nextTextVariants,
  currentTextVariants,
} from "./anime";
import { useEffect, useState } from "react";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const RenderAbout = ({
  item,
  setActiveTrace,
  isTraceActive,
  setIsTransitioning,
  trace,
  theme,
  currentIndex,
  setCurrentIndex,
}: {
  item: AboutBlock;
  setActiveTrace: (trace: string) => void;
  isTraceActive: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
  trace: string;
  theme: string;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) => {
  const [canAnimate, setCanAnimate] = useState(false);
  const { src, title: titles, content } = item;

  const handleNextClick = async () => {
    setActiveTrace(trace);
    setIsTransitioning(true);
    await sleep(600);
    setCurrentIndex(0);
    await sleep(1400);
    setIsTransitioning(false);
  };

  useEffect(() => {
    if (isTraceActive) {
      setTimeout(() => {
        setCanAnimate(true);
      }, 1200);
    } else {
      setCanAnimate(false);
    }
  }, [isTraceActive]);

  return (
    <div className={styles.container}>
      <div
        className={classNames(
          styles.content,
          theme === "zaun" ? styles.dark : ""
        )}
      >
        {titles.map((title, index) => (
          <div
            className={classNames(
              styles.aboutContent,
              theme === "zaun" ? styles.dark : ""
            )}
            key={title}
          >
            <div className={styles.imageDiv}>
              <motion.div
                variants={
                  currentIndex === index
                    ? currentImageContainerVariants
                    : index === currentIndex - 1
                    ? prevImageContainerVariants
                    : index === currentIndex + 1
                    ? nextImageContainerVariants
                    : prevImageContainerVariants
                }
                initial="initial"
                animate={
                  currentIndex === index && isTraceActive
                    ? "visible"
                    : currentIndex !== index && isTraceActive
                    ? "hidden"
                    : "initial"
                }
                custom={canAnimate}
                className={styles.imageContainer}
                style={{
                  zIndex: currentIndex === index && isTraceActive ? 2 : 1,
                }}
              >
                <Image
                  src={src[index]}
                  alt={title}
                  width={736}
                  height={1308}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    transform:
                      currentIndex === index
                        ? "translateX(0%)"
                        : index === currentIndex - 1
                        ? "translateX(-50%)"
                        : index === currentIndex + 1
                        ? "translateX(50%)"
                        : "",
                    transition: "transform 1s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </motion.div>
            </div>
            <div className={styles.textDiv}>
              <motion.div
                variants={
                  currentIndex === index
                    ? currentTextVariants
                    : index === currentIndex - 1
                    ? prevTextVariants
                    : index === currentIndex + 1
                    ? nextTextVariants
                    : currentTextVariants
                }
                initial="hidden"
                animate={
                  currentIndex === index && isTraceActive
                    ? "visible"
                    : currentIndex !== index && isTraceActive
                    ? "hidden"
                    : "initial"
                }
                className={styles.textContainer}
                style={{
                  zIndex: currentIndex === index && isTraceActive ? 2 : 1,
                }}
              >
                <div className={styles.titleContainer}>
                  <h1>{title}</h1>
                </div>
                <div className={styles.contentContainer}>
                  <p>{content[index]}</p>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
        <div
          style={{
            opacity: isTraceActive ? 1 : 0,
            transition: "opacity 1s cubic-bezier(0.76, 0, 0.24, 1)",
          }}
          className={styles.nextTrace}
        >
          <p>Próximo:</p>
          <button onClick={handleNextClick}>{trace}</button>
        </div>
      </div>
    </div>
  );
};

export default RenderAbout;
