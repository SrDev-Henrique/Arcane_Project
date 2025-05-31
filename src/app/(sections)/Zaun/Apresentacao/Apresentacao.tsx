"use client";

import styles from "./Apresentacao.module.scss";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import CardAside from "./components/CardAside/CardAside";
import { intro } from "./data";
import { sectionRefs } from "@/utils/sectionRefs";
import AnimatedColumns from "./components/AnimatedColumns/AnimatedColumns";

const Apresentacao = () => {
  const marqueesRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress: marqueesProgress } = useScroll({
    target: marqueesRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(marqueesProgress, [0, 1], ["-60%", "-12%"]);

  const smoothX = useSpring(x, {
    damping: 10,
    stiffness: 50,
    mass: 0.5,
  });

  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["zaun-apresentação"] = el as HTMLElement;
      }}
      className={styles.container}
    >
      <div ref={marqueesRef} className={styles.marquees}>
        <motion.div
          style={{
            x: smoothX,
            y: "-50%",
          }}
          className={styles.marqueesText}
        >
          <span>apresentação</span> - apresentação - <span>apresentação</span>
        </motion.div>
      </div>
      <div className={styles.cardsContainer}>
        {intro.map((item, index) => {
          const { alt, src, title, text } = item;
          return (
            <CardAside
              key={index}
              alt={alt}
              src={src}
              title={title}
              text={text}
            />
          );
        })}
      </div>
      <AnimatedColumns />
    </section>
  );
};

export default Apresentacao;
