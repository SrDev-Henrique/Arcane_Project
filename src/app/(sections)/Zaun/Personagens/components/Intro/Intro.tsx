import styles from "./Intro.module.scss";
import { images } from "./data";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Card from "./components/Card/Card";

const Intro = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start center", "end center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const filterBlur = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["blur(8px)", "blur(0px)"]
  );

  return (
    <div className={styles.container}>
      <div ref={contentRef} className={styles.content}>
        <div className={styles.stickyTitle}>
          <motion.h1
            style={{
              opacity,
              filter: filterBlur,
            }}
          >
            Personagens
          </motion.h1>
        </div>
        <div>
          {images.map((image, i) => {
            const { alt, src } = image;
            return (
              <Card key={i} src={src} alt={alt} y={i % 2 === 0 ? y2 : y} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Intro;
