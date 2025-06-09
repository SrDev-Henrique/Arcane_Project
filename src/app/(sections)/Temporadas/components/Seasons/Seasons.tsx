import Button from "@/components/Button/Button";
import styles from "./Seasons.module.scss";
import { AnimatedText } from "@/components/AnimatedText/AnimatedText";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { imageList, buttonVariants } from "./anime";
import { useRef, useState } from "react";
import { TransitionLink } from "@/components/TransitionLink";

const Seasons = ({
  season,
  text,
  href,
}: {
  season: string;
  text: string;
  href: string;
}) => {
  const [transformStyle, setTransformStyle] = useState("");
  const [secondtransformStyle, setSecondTransformStyle] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRef = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(containerRef, {
    amount: 0.75,
    once: true,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeX - 0.5) * 30;
    const tiltY = (relativeY - 0.5) * 30;

    const newTransform = `perspective(1000px) translateX(${tiltX}px) translateY(${tiltY}px) scale3d(0.98, 0.98, 0.98)`;

    const secondTransform = `perspective(1000px) translateX(${
      tiltX * 1.5
    }px) translateY(${tiltY * 1.5}px) scale3d(0.98, 0.98, 0.98)`;

    setTransformStyle(newTransform);
    setSecondTransformStyle(secondTransform);
  };

  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      className={styles.container}
    >
      <div className={styles.textContainer}>
        <div className={styles.title}>
          <AnimatedText text={text} blur={8} stagger={0.02} once />
        </div>
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <TransitionLink color="#0a0a0a" href={href}>
            <Button title="Ver detalhes" variant="ghost" />
          </TransitionLink>
        </motion.div>
      </div>
      <motion.div
        ref={containerRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          staggerChildren: 0.05,
          delay: 0.6,
        }}
        className={styles.frontImages}
      >
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            variants={imageList[index]}
            className={styles.imageContainer}
            style={{}}
          >
            <Image
              alt={`${text} - imagem ${index + 1}`}
              src={`/images/Temporadas/${season}/section-${index + 1}.webp`}
              width={1080}
              height={920}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "0.35rem",
                transform:
                  index % 2 !== 0 ? transformStyle : secondtransformStyle,
                transition: "all 0.3s ease-out",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Seasons;
