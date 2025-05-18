import styles from "./Nav.module.scss";
import { motion } from "framer-motion";
import { links } from "./data";
import { perspective, slideIn } from "./anime";
import { useEffect, useState } from "react";
import { sectionRefs } from "@/utils/sectionRefs";
import { enterFullscreen } from "@/hooks/useFullscreen";
import { exitFullscreen } from "@/hooks/useFullscreen";
import Link from "next/link";

const Nav = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}) => {
  const [focusedTitle, setFocusedTitle] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (isFullScreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  const handleTitleClick = (title: string) => {
    if (title === "Início") {
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

    setTimeout(() => {
      setIsMenuOpen(!isMenuOpen);
    }, 1000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setIsMenuOpen(!isMenuOpen);
    }, 1000);
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
                  <h3 onClick={() => handleTitleClick(title)}>{title}</h3>
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
          <p>Desenvolvido por</p>
        </div>
        <Link className={styles.footerLink} href={"https://github.com/SrDev-Henrique"} target="_blank">
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
