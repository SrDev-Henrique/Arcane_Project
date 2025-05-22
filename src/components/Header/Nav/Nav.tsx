import styles from "./Nav.module.scss";
import { motion } from "framer-motion";
import { links } from "./data";
import { perspective, slideIn } from "./anime";
import { useEffect, useState } from "react";
import { sectionRefs } from "@/utils/sectionRefs";
import {
  enterFullscreen,
  exitFullscreen,
  useFullscreenStatus,
} from "@/hooks/useFullscreen";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const Nav = ({
  isMenuOpen,
  setIsMenuOpen,
  isTransitioning,
  setIsTransitioning,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
}) => {
  const [focusedTitle, setFocusedTitle] = useState<string | null>(null);
  const isFullScreen = useFullscreenStatus();

  const toggleFullScreen = () => {
    if (isFullScreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  const handleTitleClick = (title: string) => {
    if (isTransitioning) return;
    if (title === "Início") {
      setIsTransitioning(true);
      scrollToTop();
      return;
    }

    if (focusedTitle === title) {
      setFocusedTitle(null);
    } else {
      setFocusedTitle(title);
    }
  };

  const scrollToSection = (title: string, content: string) => {
    const sectionId = `${title.toLowerCase()}-${content.toLowerCase()}`;
    const section = sectionRefs.current[sectionId];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    setFocusedTitle(null);
    setIsTransitioning(true);

    let fallbackTimeout: NodeJS.Timeout | null = null;

    const interval = setInterval(() => {
      const { top } = section.getBoundingClientRect();

      if (top <= 0 && top >= -100) {
        clearInterval(interval);
        if (fallbackTimeout) clearTimeout(fallbackTimeout);
        setIsMenuOpen(!isMenuOpen);
        setIsTransitioning(false);
      } else if (!fallbackTimeout) {
        fallbackTimeout = setTimeout(() => {
          clearInterval(interval);
          setIsTransitioning(false);
        }, 1000);
      }
    }, 10);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const interval = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(interval);
        setIsMenuOpen(!isMenuOpen);
        setIsTransitioning(false);
      } else {
        setTimeout(() => {
          setIsTransitioning(false);
        }, 1000);
      }
    }, 10);
  };

  useEffect(() => {
    if (!isMenuOpen) {
      setFocusedTitle(null);
    }
  }, [isMenuOpen]);

  return (
    <div className={styles.nav}>
      <div className={styles.body}>
        {links.map((link, i) => {
          const { title, content } = link;
          return (
            <div key={`b_${i}`} className={styles.linkContainer}>
              <motion.div
                custom={i}
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <div
                  className={`${styles.linkItems} ${
                    focusedTitle === title ? styles.active : ""
                  }`}
                >
                  <div className={styles.titleContainer}>
                    <h3 onClick={() => handleTitleClick(title)}>{title}</h3>
                    {content &&
                      (focusedTitle === title ? <FaMinus /> : <FaPlus />)}
                  </div>
                  <div className={styles.linkContent}>
                    {content &&
                      content.map((content, index) => (
                        <motion.p
                          custom={{ delayInitial: 0.1, index }}
                          variants={slideIn}
                          initial="initial"
                          animate={focusedTitle === title ? "enter" : "exit"}
                          key={`c_${index}`}
                          onClick={() => scrollToSection(title, content)}
                        >
                          {content}
                        </motion.p>
                      ))}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
      <motion.div
        variants={slideIn}
        initial="initial"
        animate="enter"
        exit="exit"
        custom={{ delayInitial: 0.75, index: 1 }}
        className={styles.footer}
      >
        <div className={styles.footerText}>
          <p>Desenvolvido por:</p>
        </div>
        <Link
          className={styles.footerLink}
          href={"https://github.com/SrDev-Henrique"}
          target="_blank"
        >
          <p>SRDEV HENRIQUE</p>
        </Link>
      </motion.div>
      <motion.div
        variants={slideIn}
        initial="initial"
        animate="enter"
        exit="exit"
        custom={{ delayInitial: 0.5, index: 1 }}
        onClick={toggleFullScreen}
        className={`${styles.fullScreenSwitcher} ${
          isFullScreen ? styles.active : ""
        }`}
      >
        <div className={styles.fullScreenSwitcherTextContainer}>
          <div
            className={`${styles.fullScreenSwitcherText} ${
              isFullScreen ? styles.active : ""
            }`}
          >
            <span className={styles.transformText}>ativar</span>
            <span className={styles.transformText}>desativar</span>
          </div>
          <p>modo tela cheia</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Nav;
