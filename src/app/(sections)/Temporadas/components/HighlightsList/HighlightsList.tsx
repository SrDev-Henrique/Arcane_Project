import styles from "./HighlightsList.module.scss";

import { motion } from "framer-motion";
import {
  itemRevealVariants,
  highlightInfoVariants,
  highlightItemVariants,
} from "../../../../../animations/anime";

import Lenis from "lenis";

import { IoPlayCircle } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { useCallback, useEffect, useRef } from "react";

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
  isTransitioning,
  setIsTransitioning,
}: {
  highlights: HighlightsItems[];
  activeTab: string;
  activeHighlight: number;
  setActiveHighlight: (index: number) => void;
  isHighlightActive: boolean;
  setIsHighlightActive: (isHighlightActive: boolean) => void;
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
}) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const highlightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lenisRef = useRef<Lenis | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const addToVideoRefs = (el: HTMLVideoElement) => {
    if (el && !videoRefs.current.includes(el)) {
      videoRefs.current.push(el);
    }
  };

  const addToHighlightRefs = (el: HTMLDivElement) => {
    if (el && !highlightRefs.current.includes(el)) {
      highlightRefs.current.push(el);
    }
  };

  const handleWatch = (index: number) => {
    if (isTransitioning || activeHighlight > 0) return;
    setActiveHighlight(index);
    setIsTransitioning(true);
    setIsHighlightActive(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const scrollToActiveHighlight = useCallback(() => {
    const idx = highlights.findIndex((h) => h.id === activeHighlight);
    const target = highlightRefs.current[idx];
    if (!target || !lenisRef.current) return;
    const rect = target.getBoundingClientRect();
    const container = containerRef.current!;
    const offsetToCenter =
      target.offsetTop - (container.clientHeight / 2 - rect.height / 2);

    lenisRef.current.scrollTo(offsetToCenter, {
      duration: 0.6,
    });
  }, [activeHighlight, highlights]);

  useEffect(() => {
    const delay = activeHighlight === 1 ? 600 : 0;
    const timer = setTimeout(scrollToActiveHighlight, delay);
    return () => clearTimeout(timer);
  }, [activeHighlight, scrollToActiveHighlight]);

  useEffect(() => {
    if (!containerRef.current) return;
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
  }, []);

  useEffect(() => {
    const video = videoRefs.current;

    const handleFullScreenChange = () => {
      setTimeout(scrollToActiveHighlight, 350);
    };

    video.forEach((video) => {
      if (!video) return;
      video.addEventListener("fullscreenchange", handleFullScreenChange);
    });

    return () => {
      video.forEach((video) => {
        if (!video) return;
        video.removeEventListener("fullscreenchange", handleFullScreenChange);
      });
    };
  }, [scrollToActiveHighlight]);

  useEffect(() => {
    window.addEventListener("resize", scrollToActiveHighlight);

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [scrollToActiveHighlight]);

  useEffect(() => {
    const container = containerRef.current;

    if (isHighlightActive) {
      container?.classList.add(styles.overflowHidden);
    } else {
      container?.classList.remove(styles.overflowHidden);
    }

    return () => {
      container?.classList.remove(styles.overflowHidden);
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
            ref={addToHighlightRefs}
            className={styles.highlightItems}
            variants={itemRevealVariants}
            initial="hidden"
            animate={activeTab === "highlights" ? "visible" : "hidden"}
          >
            <motion.div
              className={styles.highlightItem}
              variants={highlightItemVariants}
              initial={"inactive"}
              animate={
                activeHighlight === highlight.id && isHighlightActive
                  ? "active"
                  : "inactive"
              }
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
                    zIndex:
                      activeHighlight === highlight.id && isHighlightActive
                        ? -1
                        : 1,
                    borderRadius: "1rem",
                    opacity:
                      activeHighlight === highlight.id && isHighlightActive
                        ? 0
                        : 1,
                    pointerEvents:
                      activeHighlight === highlight.id && isHighlightActive
                        ? "none"
                        : "auto",
                    transition: "opacity 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>
              <motion.div
                className={styles.highlightInfoContainer}
                variants={highlightInfoVariants}
                style={{
                  pointerEvents:
                    activeHighlight === highlight.id && isHighlightActive
                      ? "none"
                      : "auto",
                }}
                initial="visible"
                animate={
                  activeHighlight === highlight.id && isHighlightActive
                    ? "hidden"
                    : "visible"
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
                  <button
                    onClick={() => {
                      handleWatch(highlight.id);
                    }}
                    className={styles.highlightWatchButton}
                  >
                    <h1 className={styles.highlightWatchButtonText}>
                      Assistir
                    </h1>
                    <IoPlayCircle className={styles.highlightWatchButtonIcon} />
                  </button>
                </div>
              </motion.div>
              <div>
                <div
                  style={{
                    opacity:
                      activeHighlight === highlight.id && isHighlightActive
                        ? 1
                        : 0,
                    transition: "opacity 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
                    pointerEvents:
                      activeHighlight === highlight.id && isHighlightActive
                        ? "auto"
                        : "none",
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
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HighlightsList;
