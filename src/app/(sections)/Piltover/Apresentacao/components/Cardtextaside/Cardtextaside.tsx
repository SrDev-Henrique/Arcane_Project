import styles from "./Cardtextaside.module.scss";
import Image from "next/image";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedText } from "@/components/AnimatedText/AnimatedText";

const Cardtextaside = ({
  image,
  text,
  alt,
  title,
  reverse,
}: {
  image: string;
  text: string;
  alt: string;
  reverse?: boolean;
  title?: string | string[];
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-200, 200]);

  return (
    <div className={`${styles.container} ${reverse ? styles.reverse : ""}`}>
      <div className={styles.textContainer}>
        <div className={styles.text}>
          {title && <AnimatedText text={title} stagger={0.01} el="h1" />}
        </div>
        <div className={styles.text}>
          <AnimatedText text={text} stagger={0.01} />
        </div>
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.image}>
          <motion.div ref={targetRef} style={{ y }} className={styles.image}>
            <Image
              alt={alt}
              src={image}
              width={3840}
              height={1632}
              style={{
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
                height: "100%",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cardtextaside;
