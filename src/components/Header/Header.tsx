"use client";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Header.module.scss";

const Nav = dynamic(() => import("./Nav/Nav"), {
  ssr: false,
  loading: () => (
    <div className={styles.navLoading}>
      <span className={styles.spinner} />
    </div>
  ),
});

const Button = dynamic(() => import("./Button/Button"), {
  ssr: false,
});

const menu = {
  open: {
    width: "clamp(315px, 90vw, 480px)",
    height: "clamp(420px, 75vh, 650px)",
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

  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const handleMenuTransition = () => {
    if (isTransitioning) return;
    setIsActive(!isActive);
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isActive &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsActive(!isActive);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  return (
    <div className={styles.header}>
      <motion.div
        ref={menuRef}
        className={styles.menu}
        variants={menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>
          {isActive && (
            <Nav
              isMenuOpen={isActive}
              setIsMenuOpen={setIsActive}
              isTransitioning={isTransitioning}
              setIsTransitioning={setIsTransitioning}
            />
          )}
        </AnimatePresence>
      </motion.div>
      <Button ref={buttonRef} isActive={isActive} toggleMenu={handleMenuTransition} />
    </div>
  );
}
