import Image from "next/image";
import styles from "./CharsCard.module.scss";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TransitionLink } from "@/components/TransitionLink";

const CharsCard = ({
  scale,
  filterBrightness,
  src,
  alt,
  title,
  name,
  centerLeft
}: {
  scale: MotionValue<number>;
  filterBrightness: MotionValue<string>;
  src: string;
  alt: string;
  title: string;
    name: string;
  centerLeft: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.content}>
        <motion.div
          style={{ y, scale, filter: filterBrightness }}
          className={styles.imageContainer}
        >
          <Image
            src={src}
            alt={alt}
            width={3840}
            height={1632}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: centerLeft ? "center left" : "center",
            }}
          />
        </motion.div>
        <motion.div  className={styles.textContainer}>
          <div>
            <p>{title}</p>
          </div>
          <div>
            <h1>{name}</h1>
          </div>
          <TransitionLink href={"/"}>
            <div className={styles.button}>
              <p>Ver Detalhes</p>
            </div>
          </TransitionLink>
        </motion.div>
      </div>
    </div>
  );
};

export default CharsCard;
