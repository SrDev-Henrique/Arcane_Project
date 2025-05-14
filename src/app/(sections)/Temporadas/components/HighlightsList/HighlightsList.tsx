import styles from "./HighlightsList.module.scss";

import { motion } from "framer-motion";
import {
  itemRevealVariants,
  highlightInfoVariants,
  highlightItemVariants,
} from "../../animations/anime";

import Lenis from "lenis";

import { IoPlayCircle } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { useEffect, useRef } from "react";

interface HighlightsItems {
  id: number;
  episode: string;
  title: string;
  emote: string;
  image: string;
  src: string;
}

const HighlightsList = ({
  highlights,
  activeTab,
  activeHighlight,
  setActiveHighlight,
  isHighlightActive,
  setIsHighlightActive,
}: {
  highlights: HighlightsItems[];
  activeTab: string;
  activeHighlight: number;
  setActiveHighlight: (index: number) => void;
  isHighlightActive: boolean;
  setIsHighlightActive: (isHighlightActive: boolean) => void;
}) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const lenisRef = useRef<Lenis | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const addToVideoRefs = (el: HTMLVideoElement) => {
    if (el && !videoRefs.current.includes(el)) {
      videoRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (!containerRef.current || isHighlightActive) return;

    const localLenis = new Lenis({
      wrapper: containerRef.current,
      content: containerRef.current,
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

    return () => {
      localLenis.destroy();
      lenisRef.current = null;
    };
  }, [isHighlightActive]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${
        activeTab !== "highlights"
          ? styles.isHidden
          : activeHighlight === 1
          ? styles.isActive
          : ""
      }`}
    >
      {highlights.map((highlight, index) => {
        return (
          <motion.div
            key={highlight.id}
            className={styles.highlightItems}
            variants={itemRevealVariants}
            initial="hidden"
            animate={activeTab === "highlights" ? "visible" : "hidden"}
          >
            <motion.div
              className={styles.highlightItem}
              variants={highlightItemVariants}
              initial={"inactive"}
              animate={activeHighlight === highlight.id ? "active" : "inactive"}
            >
              <div className={styles.highlightVideoContainer}>
                <video
                  ref={addToVideoRefs}
                  controls
                  src={highlight.src}
                  poster={highlight.image}
                  preload="none"
                  className={styles.highlightVideo}
                />
                <div
                  style={{
                    backgroundImage: `url(${highlight.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    borderRadius: "1rem",
                    opacity: activeHighlight === highlight.id ? 0 : 1,
                    transition: "opacity 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>
              <motion.div
                className={styles.highlightInfoContainer}
                variants={highlightInfoVariants}
                initial="visible"
                animate={
                  activeHighlight === highlight.id ? "hidden" : "visible"
                }
              >
                <div className={styles.highlightInfo}>
                  <div className={styles.highlightTitleContainer}>
                    <h1 className={styles.highlightTitle}>{highlight.title}</h1>
                  </div>
                  <div className={styles.highlightEmoteContainer}>
                    <p className={styles.highlightEmote}>{highlight.emote}</p>
                  </div>
                  <div className={styles.highlightReference}>
                    <p className={styles.highlightReferenceText}>
                      Cena do:{" "}
                      <span className={styles.boldText}>
                        {highlight.episode}
                      </span>
                    </p>
                  </div>
                  <button className={styles.highlightWatchButton}>
                    <h1 className={styles.highlightWatchButtonText}>
                      Assistir
                    </h1>
                    <IoPlayCircle className={styles.highlightWatchButtonIcon} />
                  </button>
                </div>
              </motion.div>
              <div
                style={{
                  opacity: activeHighlight === highlight.id ? 1 : 0,
                  transition: "opacity 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
                }}
                className={styles.closeButton}
                onClick={() => {
                  setIsHighlightActive(false);
                  videoRefs.current[index]?.pause();
                  setTimeout(() => {
                    setActiveHighlight(0);
                  }, 600);
                }}
              >
                <GrClose className={styles.closeButtonIcon} />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HighlightsList;
