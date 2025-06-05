import styles from "./CardAside.module.scss";
import Image from "next/image";
import { AnimatedText } from "@/components/AnimatedText/AnimatedText";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CardAside = ({
  alt,
  src,
  title,
  text,
}: {
  alt: string;
  src: string;
  title: string;
  text: string;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-250, 250]);

  const textY = useTransform(scrollYProgress, [0, 1], ["-300%", "200%"]);

  return (
    <div ref={containerRef} className={styles.container}>
      <motion.div style={{ y }} className={styles.imageContainer}>
        <Image
          alt={alt}
          src={src}
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
      <div className={styles.textContainerWrapper}>
        <motion.div
          style={{ y: textY, left: "50%", x: "-50%" }}
          className={styles.textContainer}
        >
          <AnimatedText
            text={title}
            blur={8}
            skew={10}
            x={-20}
            y={10}
            stagger={0.02}
            el={"h1"}
          />
          <p>{text}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default CardAside;
