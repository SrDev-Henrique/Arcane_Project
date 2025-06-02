import { useRef } from "react";
import CharsCard from "../CharsCard/CharsCard";
import styles from "./RenderCharsCard.module.scss";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";

import { cardsInfo } from "./data";

const RenderCharsCard = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: finalProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Progresso do scroll:", latest);
  });

  const scale1 = useTransform(scrollYProgress, [0, 0.25], [1, 0.8]);
  const scale2 = useTransform(scrollYProgress, [0.25, 0.5], [1, 0.8]);
  const scale3 = useTransform(scrollYProgress, [0.5, 0.75], [1, 0.8]);
  const scale4 = useTransform(scrollYProgress, [0.75, 1], [1, 0.8]);
  const scale5 = useTransform(finalProgress, [0, 1], [1, 0.8]);

  const scaleList = [scale1, scale2, scale3, scale4, scale5];

  const filter1 = useTransform(
    scrollYProgress,
    [0, 0.25],
    ["brightness(0.8)", "brightness(0.1)"]
  );
  const filter2 = useTransform(
    scrollYProgress,
    [0.25, 0.5],
    ["brightness(0.8)", "brightness(0.1)"]
  );
  const filter3 = useTransform(
    scrollYProgress,
    [0.5, 0.75],
    ["brightness(0.8)", "brightness(0.1)"]
  );
  const filter4 = useTransform(
    scrollYProgress,
    [0.75, 1],
    ["brightness(0.8)", "brightness(0.1)"]
  );
  const filter5 = useTransform(
    finalProgress,
    [0, 1],
    ["brightness(0.8)", "brightness(0.1)"]
  );

  const filterList = [filter1, filter2, filter3, filter4, filter5];

  return (
    <div ref={containerRef} className={styles.container}>
      {cardsInfo.map((card, i) => {
        const { title, name, src, alt } = card;
        return (
          <CharsCard
            key={i}
            filterBrightness={filterList[i]}
            scale={scaleList[i]}
            title={title}
            name={name}
            src={src}
            alt={alt}
            centerLeft={i === 0}
          />
        );
      })}
    </div>
  );
};

export default RenderCharsCard;
