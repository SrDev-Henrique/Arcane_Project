import classNames from "classnames";
import styles from "./About.module.scss";
import AnimatedLine from "@/components/AnimatedLine";
import { AnimatedText } from "@/components/AnimatedText/AnimatedText";
import {
  traceVariants1,
  traceVariants2,
  traceVariants3,
  lineVariants,
  buttonVariants,
  textVariants,
  containerVariants,
  tracesContainerVariants,
} from "./anime";
import { motion } from "framer-motion";
import { useState } from "react";
import RenderAbout from "./components/RenderAbout/RenderAbout";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

interface contentItem {
  src: string[];
  title: string[];
  content: string[];
}

const About = ({
  activeTab,
  theme,
  personalidade,
  aparencia,
  habilidades,
}: {
  activeTab: string;
  color: string;
  theme: string;
  personalidade: contentItem;
  aparencia: contentItem;
  habilidades: contentItem;
  name: string;
}) => {
  const [activeTrace, setActiveTrace] = useState("");
  const [isTraceActive, setIsTraceActive] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [delay, setDelay] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const tab = "sobre";

  const tracesList = ["personalidade", "aparência", "habilidades"];
  const itemsList = [personalidade, aparencia, habilidades];

  const handleTraceClick = (trace: string) => {
    setActiveTrace(trace);
    setIsTraceActive(true);
    setTimeout(() => {
      setDelay(true);
    }, 1000);
  };

  const handleBackClick = () => {
    if (isTransitioning) return;
    setActiveTrace("");
    setIsTraceActive(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1800);
  };

  const handleClick = (direction: string) => {
    if (direction === "next") {
      if (isTransitioning || currentIndex === 2) return;
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1100);
    } else {
      if (isTransitioning || currentIndex === 0) return;
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1100);
    }
  };

  return (
    <div
      className={classNames(
        styles.container,
        activeTab !== tab ? styles.isHidden : ""
      )}
    >
      <div
        className={classNames(
          styles.content,
          theme === "zaun" ? styles.dark : ""
        )}
      >
        <motion.div
          variants={tracesContainerVariants}
          initial="initial"
          animate={isTraceActive ? "active" : "initial"}
          className={classNames(
            styles.tracesContainer,
            theme === "piltover" ? "" : styles.dark,
            isTraceActive ? styles.isActive : ""
          )}
          style={{
            pointerEvents: isTraceActive || isTransitioning ? "none" : "auto",
          }}
        >
          {tracesList.map((trace, index) => {
            const stylesList = [styles.trace1, styles.trace2, styles.trace3];
            const tracesVariants = [
              traceVariants1,
              traceVariants2,
              traceVariants3,
            ];
            return (
              <motion.div
                key={trace}
                variants={tracesVariants[index]}
                initial="initial"
                animate={
                  isTraceActive && activeTrace === trace
                    ? "active"
                    : isTraceActive && activeTrace !== trace
                    ? "hidden"
                    : "initial"
                }
                custom={delay}
                className={classNames(styles.trace, stylesList[index])}
                style={{
                  display: activeTab === tab ? "flex" : "none",
                  pointerEvents:
                    isTraceActive || isTransitioning ? "none" : "auto",
                  cursor:
                    isTraceActive || isTransitioning ? "default" : "pointer",
                }}
                onClick={() => handleTraceClick(trace)}
              >
                <div className={styles.traceText}>
                  <div className={styles.number}>
                    <AnimatedText
                      text={`0${index + 1}`}
                      y={150}
                      stagger={0.05}
                      duration={0.8}
                    />
                  </div>
                  <motion.div
                    variants={textVariants}
                    initial="initial"
                    animate={
                      isTraceActive && activeTrace === trace
                        ? "active"
                        : "initial"
                    }
                    className={styles.text}
                  >
                    <AnimatedText
                      text={trace}
                      y={150}
                      stagger={0.05}
                      duration={0.8}
                    />
                  </motion.div>
                </div>
                <motion.div
                  variants={lineVariants}
                  animate={isTraceActive ? "hidden" : "active"}
                  custom={index}
                  className={styles.traceLine}
                  style={{
                    transformOrigin: "left",
                  }}
                >
                  <AnimatedLine
                    color={theme === "piltover" ? "#0a0a0a" : "#fff"}
                    delay={0.1 * index}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate={isTraceActive ? "visible" : "hidden"}
          onClick={handleBackClick}
          className={styles.backButton}
          style={{
            pointerEvents: !isTraceActive || isTransitioning ? "none" : "auto",
          }}
        >
          <button>Voltar</button>
        </motion.div>
        {[
          tracesList.map((trace, index) => (
            <motion.div
              key={trace}
              variants={containerVariants}
              initial="visible"
              animate={
                isTraceActive && activeTrace === trace ? "visible" : "hidden"
              }
              className={styles.aboutContainer}
              style={{
                pointerEvents:
                  (isTraceActive && activeTrace !== trace) ||
                  isTransitioning ||
                  !isTraceActive
                    ? "none"
                    : "auto",
              }}
            >
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate={isTraceActive ? "visible" : "hidden"}
                className={styles.nextPrevButton}
              >
                <div
                  style={{
                    opacity: currentIndex === 0 ? 0.3 : 1,
                    transition: "opacity 0.3s ease-in-out",
                    cursor: currentIndex === 0 ? "default" : "pointer",
                  }}
                  onClick={() => handleClick("prev")}
                >
                  <MdNavigateBefore />
                </div>
                <div
                  style={{
                    opacity: currentIndex === 2 ? 0.3 : 1,
                    transition: "opacity 0.3s ease-in-out",
                    cursor: currentIndex === 2 ? "default" : "pointer",
                  }}
                  onClick={() => handleClick("next")}
                >
                  <MdNavigateNext />
                </div>
              </motion.div>
              <RenderAbout
                item={itemsList[index]}
                trace={tracesList[(index + 1) % 3]}
                setActiveTrace={setActiveTrace}
                setIsTransitioning={setIsTransitioning}
                theme={theme}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
              />
            </motion.div>
          )),
        ]}
      </div>
    </div>
  );
};

export default About;
