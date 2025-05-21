"use client";

import AnimatedTitle from "@/app/(sections)/About/components/AnimatedTitle/AnimatedTitle";
import styles from "./About.module.scss";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const About = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "polygon(20% 30%, 80% 30%, 80% 75%, 20% 75%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ]
  );
  const rotateY = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const marginTop = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section className={styles.about}>
      <div className={styles.aboutText}>
        <div className={styles.aboutIntroText}>
          <div className={styles.aboutTextIntro}>Bem-vindos a Runeterra</div>
          <AnimatedTitle title="conhe<b>c</b>a o <br/> m<b>u</b>ndo <br/> de <b>a</b>rcane" />
        </div>
        <div className={styles.stickyImageContainer}>
          <motion.div
            style={{ clipPath, rotateY, marginTop }}
            className={styles.stickyImage}
          >
            <Image
              src="/images/arcane_piltover/piltover.webp"
              width={3840}
              height={1632}
              alt="Piltover"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </motion.div>
        </div>
      </div>
      <div ref={targetRef} className={styles.target}></div>
    </section>
  );
};

export default About;
