"use client";

import styles from "./Historia.module.scss";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { sectionRefs } from "@/utils/sectionRefs";
import useDimension from "@/utils/useDimension";
import RenderContent from "./components/RenderContent/RenderContent";
import { historiaItems } from "./data";

const Historia = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { width } = useDimension();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start center"],
  });

  const { scrollYProgress: finalBackgroundProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end center"],
  });

  const { scrollYProgress: progress } = useScroll({
    target: contentRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: diskProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "start start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#EAD8C0", "#F4E7E1"]
  );

  const finalBackground = useTransform(
    finalBackgroundProgress,
    [0, 1],
    ["#EAD8C0", "#7a7454"]
  );

  const background = useTransform(
    scrollYProgress,
    [0, 1],
    ["#F4E7E1", "#EAD8C0"]
  );

  const rotate = useTransform(diskProgress, [0, 1], ["180deg", "360deg"]);

  const fontSize = useTransform(
    progress,
    [0, 0.5, 0.7, 1],
    [
      "clamp(3.5rem, 7vw + 0.5rem, 6.3rem)",
      "clamp(3.5rem, 5vw + 0.5rem, 1.6rem)",
      "clamp(3.5rem, 5vw + 0.5rem, 1.6rem)",
      "clamp(3.5rem, 9vw + 0.5rem, 8.3rem)",
    ]
  );

  const bottom = useTransform(
    progress,
    [0, 0.3, 0.8, 1],
    ["20%", "50%", "50%", "5%"]
  );

  useEffect(() => {
    if (width !== null) {
      setIsMobile(width < 768);
    }
  }, [isMobile, width]);

  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["piltover-historia"] = el as HTMLElement;
      }}
    >
      <motion.div
        style={{
          backgroundColor,
        }}
        ref={containerRef}
        className={styles.container}
      >
        <motion.div
          style={{
            background,
            rotate,
            x: "50%",
            y: "-50%",
            position: "absolute",
            top: "0%",
            right: "50%",
          }}
          className={styles.disk}
        >
          <span>Switch</span>
        </motion.div>
        <div ref={titleRef} className={styles.titleContainer}>
          <motion.h1
            style={{
              fontSize: isMobile
                ? "clamp(3.5rem, 7vw + 0.5rem, 3.5rem)"
                : fontSize,
              bottom: isMobile ? "20%" : bottom,
            }}
          >
            História
          </motion.h1>
        </div>
        <motion.div
          ref={contentRef}
          style={{ background: finalBackground }}
          className={styles.contentContainer}
        >
          {historiaItems.map((item, index) => (
            <RenderContent
              key={index}
              title={item.title}
              text={item.content}
              image={item.imagePath}
              alt={item.alt}
              alignEnd={index % 2 !== 0}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Historia;
