import styles from "./Card.module.scss";

import Image from "next/image";
import React, { useRef } from "react";

import { motion, MotionValue, useInView } from "framer-motion";
import { imagesVariants } from "./anime";

const Card = ({
  src,
  alt,
  y,
}: {
  src: string;
  alt: string;
  y: MotionValue<string>;
}) => {
  const imagesContainerRef = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(imagesContainerRef, { amount: 0.2 });

  return (
    <motion.div
      ref={imagesContainerRef}
      variants={imagesVariants}
      initial="outOfView"
      animate={isInView ? "inView" : "outOfView"}
      className={styles.imageContainer}
      style={{
        y,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={736}
        height={736}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </motion.div>
  );
};

export default Card;
