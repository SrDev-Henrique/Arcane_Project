import styles from "./ImageDiv.module.scss";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { imageVariants } from "./anime";
import classNames from "classnames";

const ImageDiv = ({
  src,
  title,
  index,
  quote,
  theme,
}: {
  src: string;
  title: string;
  index: number;
  quote?: string;
  theme: string;
}) => {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(imageRef, { amount: 0.4, once: true });
  return (
    <div
      ref={imageRef}
      className={classNames(
        styles.imageSection,
        theme === "zaun" ? styles.dark : ""
      )}
    >
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate={isInView ? "visible" : ""}
        className={styles.imageContainer}
      >
        <Image
          src={src}
          alt={`${title} imagem-${index}`}
          width={736}
          height={736}
        />
      </motion.div>
      {quote && (
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
              transition: {
                duration: 1,
                ease: [0.76, 0, 0.24, 1],
              },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : ""}
          className={styles.quoteContainer}
        >
          <p>{quote}</p>
        </motion.div>
      )}
    </div>
  );
};

export default ImageDiv;
