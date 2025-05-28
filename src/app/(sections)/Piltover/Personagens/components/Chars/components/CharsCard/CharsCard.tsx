import Image from "next/image";
import styles from "./CharsCard.module.scss";

import { TransitionLink } from "@/components/TransitionLink";

import { useEffect, useRef, useState } from "react";
import useDimension from "@/utils/useDimension";

import { motion, useInView, useScroll, useTransform } from "framer-motion";

const CharsCard = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  const { width } = useDimension();

  useEffect(() => {
    if (width !== null) {
      setIsMobile(width < 1024);
    }
  }, [isMobile, width]);

  //todo Framer Motion

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const cardWidth = useTransform(scrollYProgress, [0, 1], ["78svw", "98svw"]);

  const isInView = useInView(targetRef, { amount: 1 });

  const infoVariants = {
    original: {
      opacity: 1,
      width: isMobile ? "40vh" : "40vw",
      height: isMobile ? "60vh" : "70vh",
    },
    big: {
      opacity: 0,
      width: isMobile ? "50vh" : "50vw",
      height: isMobile ? "70vh" : "80vh",
    },
    transition: {
      duration: 1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  };

  const itemsVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2 + i * 0.1,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  return (
    <motion.div
      ref={targetRef}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: cardWidth,
        willChange: isMobile ? "height" : "width",
      }}
      className={styles.container}
    >
      <div className={styles.content}>
        <motion.div
          variants={infoVariants}
          initial={"big"}
          animate={isInView ? "original" : "big"}
          className={styles.charInfo}
        >
          <motion.div
            variants={itemsVariants}
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            className={styles.charImage}
          >
            <Image
              src={src}
              alt="Viktor icon"
              width={450}
              height={450}
              style={{
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
                height: "100%",
              }}
            />
          </motion.div>
          <motion.h1
            variants={itemsVariants}
            animate={isInView ? "visible" : "hidden"}
            custom={1}
          >
            {name}
          </motion.h1>
          <motion.p
            variants={itemsVariants}
            animate={isInView ? "visible" : "hidden"}
            custom={2}
          >
            {title}
          </motion.p>
          <TransitionLink href={"/"}>
            <motion.div
              variants={itemsVariants}
              animate={isInView ? "visible" : "hidden"}
              custom={3}
              className={styles.charButton}
            >
              Ver detalhes
            </motion.div>
          </TransitionLink>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CharsCard;
