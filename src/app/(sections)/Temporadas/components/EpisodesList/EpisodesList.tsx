"use client";

import styles from "./EpisodesList.module.scss";

import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import useDimension from "@/utils/useDimension";
import Button from "@/components/Button/Button";
import debounce from "lodash.debounce";

import { motion } from "framer-motion";
import Lenis from "lenis";

import {
  itemRevealVariants,
  listVariants,
  titlesVariants,
} from "../../../../../animations/anime";

interface EpisodesItems {
  id: number;
  episode: string;
  title: string;
  image: string;
}

interface EpisodesListProps {
  activeTab: string;
  episodes: EpisodesItems[];
  activeEpisode: number;
  setActiveEpisode: (episode: number) => void;
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
  isEpisodeActive: boolean;
  setIsEpisodeActive: (isEpisodeActive: boolean) => void;
  isFirstClick: boolean;
  setIsFirstClick: (isFirstClick: boolean) => void;
  temporada: string;
}

const EpisodesList = ({
  activeTab,
  episodes,
  activeEpisode,
  setActiveEpisode,
  isTransitioning,
  setIsTransitioning,
  isEpisodeActive,
  setIsEpisodeActive,
  isFirstClick,
  setIsFirstClick,
  temporada,
}: EpisodesListProps) => {
  const imagesContainerRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isEpisodeClicked, setIsEpisodeClicked] = useState(false);

  const { width } = useDimension();

  const addToImagesRefs = (el: HTMLDivElement | null, index: number) => {
    if (!el) return;
    imagesContainerRef.current[index] = el;
  };

  const handleEpisodeClick = (episodeId: number, index: number) => {
    if (isTransitioning || activeEpisode > 0) return;
    setIsTransitioning(true);
    setActiveEpisode(episodeId);
    setIsEpisodeClicked(true);
    setIsEpisodeActive(true);
    setIsFirstClick(true);
    const el = imagesContainerRef.current[index];
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, {
        duration: 1,
        offset: 0,
      });
    }
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1600);
  };

  const handleCloseButtonClick = () => {
    setIsTransitioning(true);
    setIsEpisodeActive(false);
    setIsEpisodeClicked(false);
    setTimeout(() => {
      setActiveEpisode(0);
      setIsTransitioning(false);
    }, 1600);
  };

  //todo: Framer Motion

  const variants = {
    initial: {
      width: isMobile ? "340px" : "740px",
      height: isMobile ? "340px" : "740px",
      borderRadius: "0.5rem",
    },

    active: {
      width: "100vw",
      height: "100dvh",
      borderRadius: "0",
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    inactive: {
      width: isMobile ? "340px" : "740px",
      height: isMobile ? "340px" : "740px",
      borderRadius: "0.5rem",
      transition: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
        delay: isTransitioning ? 0.6 : 0,
      },
    },
  };

  //todo: useEffect

  useEffect(() => {
    if (!containerRef.current || isEpisodeActive) return;

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
  }, [isEpisodeActive]);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 768 || window.innerHeight <= 500);
      }
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [width]);

  useEffect(() => {
    const scrollIntoView = () => {
      if (isFirstClick) return;
      const el = imagesContainerRef.current[activeEpisode - 1];
      if (!el) return;
      el.scrollIntoView({ behavior: "instant", block: "start" });
      if (!isEpisodeActive && lenisRef.current) {
        lenisRef.current.scrollTo(el, {
          duration: 0,
          offset: 0,
        });
      }
    };

    scrollIntoView();

    const handleResize = debounce(scrollIntoView, 200);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, [activeEpisode, episodes, isFirstClick, isEpisodeActive]);

  useEffect(() => {
    const container = containerRef.current;

    if (activeEpisode > 0) {
      container?.classList.add(styles.overflowHidden);
    } else {
      container?.classList.remove(styles.overflowHidden);
    }

    return () => {
      container?.classList.remove(styles.overflowHidden);
    };
  }, [activeEpisode]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${
        activeTab !== "episódios" ? styles.hidden : ""
      }`}
    >
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate={activeTab === "episódios" ? "visible" : "hidden"}
        className={styles.episodesContainer}
      >
        {episodes.map((episode, index) => (
          <motion.div
            key={episode.id}
            variants={itemRevealVariants}
            initial="visible"
            animate={
              activeTab === "episódios" && activeEpisode >= 0
                ? "visible"
                : "hidden"
            }
          >
            <motion.div
              ref={(el) => addToImagesRefs(el, index)}
              className={`${styles.episodes} ${
                activeEpisode === episode.id ? styles.active : ""
              }`}
              onClick={() => {
                handleEpisodeClick(episode.id, index);
              }}
              variants={variants}
              initial="inactive"
              animate={
                activeEpisode === episode.id && isEpisodeClicked
                  ? "active"
                  : "inactive"
              }
              style={{
                backgroundImage: `url(/images/Temporadas/${temporada}/episódio-${episode.episode}.webp)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className={styles.episode}>
                <div className={styles.content}>
                  <div className={styles.text}>
                    <h2>Episódio {episode.episode}</h2>
                  </div>
                </div>
                <div className={styles.title}>
                  <div className={styles.text}>
                    <motion.h1
                      variants={titlesVariants}
                      initial="initial"
                      animate={
                        activeEpisode === episode.id && isEpisodeClicked
                          ? "enter"
                          : "exit"
                      }
                    >
                      {episode.title}
                    </motion.h1>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      <div
        className={`${styles.closeButton} ${
          isTransitioning ? styles.opacityLow : ""
        }`}
      >
        <Button
          style={{
            opacity: activeEpisode > 0 ? 1 : 0,
            willChange: activeEpisode > 0 ? "opacity" : "none",
            pointerEvents: activeEpisode > 0 ? "auto" : "none",
            transition: "opacity 0.3s ease-out",
          }}
          title="voltar"
          onClick={() => {
            if (isTransitioning) return;
            handleCloseButtonClick();
          }}
          variant="voltar"
          leftIcon={<FaArrowLeft className={styles.arrowIcon} />}
        />
      </div>
    </div>
  );
};

export default EpisodesList;
