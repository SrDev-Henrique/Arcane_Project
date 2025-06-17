import styles from "./Historia.module.scss";

import Journey from "./components/Journey";
import FirstSeason from "./components/FirstSeason";
import SecondSeason from "./components/SecondSeason";
import Conclusion from "./components/Conclusion";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { JourneyItem } from "@/types/CharacterTypes";
import { FaChevronUp } from "react-icons/fa6";
import classNames from "classnames";
import { sectionRefs } from "@/utils/sectionRefs";

import { motion } from "framer-motion";
import {
  containerVariants,
  navOptionsContainerVariants,
  navOptionsVariants,
} from "./anime";
import { IoMdArrowDropdown } from "react-icons/io";

const Historia = ({
  activeTab,
  jornada,
  firstSeason,
  secondSeason,
  conclusion,
  theme,
}: {
  activeTab: string;
  jornada: JourneyItem[];
  firstSeason: JourneyItem[];
  secondSeason: JourneyItem[];
  conclusion: JourneyItem[];
  theme: string;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [expand, setExpand] = useState(false);

  const tab = "história";

  const navOptions = ["Jornada", "Temporada 1", "Temporada 2", "Conclusão"];

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const localLenis = new Lenis({
      wrapper: container,
      content: container,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 0,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });
    lenisRef.current = localLenis;

    function animate(time: number) {
      localLenis.raf(time);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    const handleScroll = () => {
      if (container.scrollTop > 100) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      localLenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleOptionClick = (option: string) => {
    const section = sectionRefs.current[`${option}`];

    const { top } = section.getBoundingClientRect();

    if (section && lenisRef.current) {
      lenisRef.current.scrollTo(top, { duration: 1.6 });
    }
  };

  return (
    <div
      ref={containerRef}
      className={classNames(
        styles.container,
        activeTab !== tab ? styles.isHidden : "",
        theme === "zaun" ? styles.dark : ""
      )}
    >
      <div
        onClick={() => lenisRef.current?.scrollTo(0, { duration: 1.5 })}
        style={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0.5,
          pointerEvents: showBackToTop ? "auto" : "none",
          transition: "opacity 0.5s ease-in-out, scale 0.5s ease-in-out",
        }}
        className={classNames(
          styles.backToTop,
          theme === "zaun" ? styles.dark : ""
        )}
      >
        <FaChevronUp />
      </div>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate={expand ? "expanded" : "initial"}
        className={styles.navContainer}
      >
        <div
          onClick={() => {
            setIsNavOpen(!isNavOpen);
            setExpand(true);
            setTimeout(() => {
              setExpand(false);
            }, 300);
          }}
          className={styles.navContent}
        >
          <div className={styles.navText}>
            <p>Seções</p>
            <IoMdArrowDropdown
              style={{
                transform: isNavOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.4s ease-in-out",
              }}
            />
          </div>
          <motion.div
            variants={navOptionsContainerVariants}
            initial="hidden"
            animate={isNavOpen ? "visible" : "hidden"}
            className={styles.navOptions}
            style={{
              pointerEvents: isNavOpen ? "auto" : "none",
            }}
          >
            {navOptions.map((option, index) => (
              <motion.div
                variants={navOptionsVariants}
                initial="hidden"
                animate={isNavOpen ? "visible" : "hidden"}
                custom={index}
                key={index}
              >
                <p
                  onClick={() => {
                    handleOptionClick(option);
                    setIsNavOpen(false);
                  }}
                >
                  {option}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
      <Journey jornada={jornada} theme={theme} />
      <FirstSeason firstSeason={firstSeason} theme={theme} />
      <SecondSeason secondSeason={secondSeason} theme={theme} />
      <Conclusion conclusion={conclusion} theme={theme} />
    </div>
  );
};

export default Historia;
