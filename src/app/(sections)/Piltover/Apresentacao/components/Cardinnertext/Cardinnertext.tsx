import styles from "./Cardinnertext.module.scss";
import Image from "next/image";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedText } from "@/components/AnimatedText/AnimatedText";

const Cardinnertext = ({
  image,
  text,
  alt,
}: {
  image: string;
  text?: string | string[];
  alt: string;
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-210, 200]);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
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
      <div className={styles.textContainer}>
        {text && <AnimatedText text={text} stagger={0.01} />}
      </div>
    </div>
  );
};

export default Cardinnertext;
