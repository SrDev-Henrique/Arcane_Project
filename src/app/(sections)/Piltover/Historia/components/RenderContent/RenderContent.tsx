import Image from "next/image";
import styles from "./RenderContent.module.scss";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const RenderContent = ({
  title,
  text,
  image,
  alt,
  alignEnd,
}: {
  title: string;
  text: string;
  image: string;
  alt: string;
  alignEnd?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={contentVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`${styles.container} ${
        alignEnd ? styles.alignEnd : styles.alignStart
      }`}
    >
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{text}</p>
      <div className={styles.imageContainer}>
        <Image
          alt={alt}
          src={image}
          width={1080}
          height={1080}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
    </motion.div>
  );
};

export default RenderContent;
