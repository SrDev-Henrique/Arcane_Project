"use client";
import styles from "./Hero.module.scss";
import { FaQuoteLeft } from "react-icons/fa6";
import { motion } from "framer-motion";
import {
  columnsImages,
  descriptionVariants,
  nameVariants,
  quoteVariants,
} from "./anime";
import { useEffect, useState } from "react";

interface HeroProps {
  name: string;
  lastName: string;
  activeTab: string;
  color: string;
  heroImage: string;
  theme: string;
  quote: string;
  description: string;
}

const Hero = ({
  name,
  lastName,
  activeTab,
  color,
  theme,
  quote,
  description,
  heroImage,
}: HeroProps) => {
  const tab = "perfil";
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsFirstLoad(false);
    }, 2800);
  }, []);

  return (
    <section
      className={`${styles.heroSection} ${
        activeTab !== tab ? styles.hidden : ""
      }`}
    >
      <div
        style={{ color: theme === "piltover" ? "#0a0a0a" : "#ffffff" }}
        className={styles.container}
      >
        <motion.div
          style={{
            backgroundColor: theme === "piltover" ? "#f4e7e1" : "#0a0a0a",
            isolation: theme === "piltover" ? "auto" : "auto",
            mixBlendMode: theme === "piltover" ? "darken" : "normal",
          }}
          className={styles.imagesWrapper}
          initial="hidden"
          animate={activeTab === "perfil" ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: isFirstLoad ? 1.1 : 0.8,
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {[...Array(3)].map((_, i) => {
            const shapeClasses = [
              styles.firstImage,
              styles.middleImage,
              styles.lastImage,
            ];

            return (
              <motion.div
                variants={columnsImages}
                key={i}
                className={`${styles.imageBlock} ${shapeClasses[i]}`}
                style={{
                  backgroundColor: theme === "piltover" ? "#000" : "#ffff",
                }}
              />
            );
          })}

          <div
            className={styles.imageOverlay}
            style={{
              backgroundImage: `url(${heroImage})`,
              mixBlendMode: theme === "piltover" ? "lighten" : "darken",
            }}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={activeTab === "perfil" ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: isFirstLoad ? 0.5 : 0,
                staggerChildren: 0.1,
              },
            },
          }}
          className={styles.quoteContainer}
        >
          <motion.div variants={quoteVariants}>
            <FaQuoteLeft className={styles.quoteIcon} style={{ color }} />
          </motion.div>
          <motion.h3
            variants={quoteVariants}
            className={`${styles.quoteText}`}
            style={{ borderBottom: `${color} 1px solid` }}
          >
            {quote}
          </motion.h3>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={activeTab === "perfil" ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: isFirstLoad ? 0.8 : 0.3,
                staggerChildren: 0.1,
              },
            },
          }}
          className={styles.characterName}
        >
          <div className={`${styles.firstNameWrapper}`}>
            <motion.h1
              variants={nameVariants}
              className={`${styles.firstName}`}
              style={{
                color,
              }}
            >
              {name}
            </motion.h1>
          </div>
          <div className={styles.lastNameWrapper}>
            <motion.h1
              variants={nameVariants}
              className={`${styles.lastName} ${
                lastName === "Talis"
                  ? styles.marginTalis
                  : lastName === "Heimerdinger"
                  ? styles.sizeHeimerdinger
                  : ""
              }`}
              style={{ color }}
            >
              {lastName}
            </motion.h1>
          </div>
        </motion.div>

        <div className={styles.descriptionWrapper}>
          <motion.p
            variants={descriptionVariants}
            initial="hidden"
            animate={activeTab === "perfil" ? "visible" : "hidden"}
            custom={isFirstLoad}
            className={styles.descriptionText}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
