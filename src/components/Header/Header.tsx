"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button/Button";
import styles from "./Header.module.scss";
import Nav from "./Nav/Nav";

const menu = {
  open: {
    width: "clamp(315px, 90vw, 480px)",
    height: "clamp(420px, 70vh, 650px)",
    top: "-25px",
    right: "-25px",
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    width: "100px",
    height: "40px",
    top: "0px",
    right: "0px",
    transition: {
      duration: 0.75,
      delay: 0.35,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function Index() {
  const [isActive, setIsActive] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleMenuTransition = () => {
    if(isTransitioning) return;
    setIsActive(!isActive);
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <div className={styles.header}>
      <motion.div
        className={styles.menu}
        variants={menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>{isActive && <Nav isMenuOpen={isActive} setIsMenuOpen={setIsActive} />}</AnimatePresence>
      </motion.div>
      <Button
        isActive={isActive}
        toggleMenu={handleMenuTransition}
      />
    </div>
  );
}
