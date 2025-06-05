import styles from "./Chars.module.scss";
import { AnimatedText } from "@/components/AnimatedText/AnimatedText";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CharsCard from "./components/CharsCard/CharsCard";
import { personagens } from "./data";

const Chars = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <div className={styles.container}>
      <motion.div
        ref={targetRef}
        style={{ scale }}
        className={styles.cardsContainer}
      >
        <div className={styles.titleContainer}>
          <AnimatedText
            text="Personagens"
            stagger={0.02}
            blur={5}
            x={-20}
            y={20}
            el={"h1"}
          />
        </div>
        {personagens.map((personagem, index) => {
          const { src, name, title } = personagem;
          return (
            <div key={index} className={styles.extraSpace}>
              <CharsCard src={src} name={name} title={title} />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Chars;
