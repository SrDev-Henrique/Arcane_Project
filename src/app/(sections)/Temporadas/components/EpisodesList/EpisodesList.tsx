"use client";

import styles from "./EpisodesList.module.scss";

import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import useDimension from "@/utils/useDimension";
import Button from "@/components/Button/Button";
import debounce from "lodash.debounce";

import { motion } from "framer-motion";
import Lenis from "lenis";

interface EpisodesItems {
  id: number;
  episode: string;
  title: string;
  image: string;
}

interface EpisodesListProps {
  activeSeason: string;
  temporada: string;
  activeTab: string;
  episodes: EpisodesItems[];
  firstContainerClickedRef: React.RefObject<HTMLDivElement | null>;
  activeEpisode: number;
  setActiveEpisode: (episode: number) => void;
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
}

const EpisodesList = ({
  activeSeason,
  temporada,
  activeTab,
  episodes,
  firstContainerClickedRef,
  activeEpisode,
  setActiveEpisode,
  isTransitioning,
  setIsTransitioning,
}: EpisodesListProps) => {
  const imagesContainerRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const container = containerRef.current;
  const lenisRef = useRef<Lenis | null>(null);

  const [firstClicked, setFirstClicked] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { width } = useDimension();

  const addToImagesRefs = (el: HTMLDivElement | null, index: number) => {
    if (!el) return;
    imagesContainerRef.current[index] = el;
  };

  const handleEpisodeClick = (episodeId: number, index: number) => {
    if (isTransitioning || activeEpisode > 0) return;
    firstContainerClickedRef.current = imagesContainerRef.current[index];
    setIsTransitioning(true);
    setFirstClicked(episodeId);
    container?.classList.add(styles.active);
    lenisRef.current?.stop();
    setActiveEpisode(episodeId);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const handleCloseButtonClick = () => {
    setIsTransitioning(true);
    setActiveEpisode(0);
    container?.classList.remove(styles.active);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
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
      height: "100vh",
      borderRadius: "0",
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    },
    inactive: {
      width: isMobile ? "340px" : "740px",
      height: isMobile ? "340px" : "740px",
      borderRadius: "0.5rem",
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
        delay: isTransitioning ? 0.6 : 0,
      },
    },
  };

  const titlesVariants = {
    initial: {
      y: 0,
    },
    enter: {
      y: -50,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.6 },
    },
    exit: {
      y: 0,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemRevealVariants = {
    hidden: { y: "50%", scale: 0.5, opacity: 0 },
    visible: {
      y: "0%",
      scale: 1,
      opacity: 1,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
  };

  //todo: useEffect

  useEffect(() => {
    if (!containerRef.current || activeEpisode > 0) return;

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
  }, [activeEpisode]);

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
    const idx = episodes.findIndex((ep) => ep.id === activeEpisode);

    const scrollIntoView = () => {
      const behavior = activeEpisode === firstClicked ? "smooth" : "instant";
      imagesContainerRef.current[idx]?.scrollIntoView({
        behavior,
        block: "start",
      });
    };

    scrollIntoView();

    const handleResize = debounce(scrollIntoView, 200);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, [activeEpisode, firstClicked, episodes]);

  return (
    <div ref={containerRef} className={styles.container}>
      {activeSeason === temporada && activeTab === "episódios" && (
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className={styles.episodesContainer}
        >
          {episodes.map((episode, index) => (
            <motion.div key={episode.id} variants={itemRevealVariants}>
              <motion.div
                ref={(el) => addToImagesRefs(el, index)}
                key={episode.id}
                className={`${styles.episodes} ${
                  activeEpisode === episode.id ? styles.active : ""
                }`}
                onClick={() => handleEpisodeClick(episode.id, index)}
                variants={variants}
                initial="inactive"
                animate={activeEpisode === episode.id ? "active" : "inactive"}
                style={{
                  backgroundImage: `url(/images/Temporadas/Temporada_1/episódio-${episode.episode}.webp)`,
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
                          activeEpisode === episode.id ? "enter" : "exit"
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
      )}
      <div className={styles.closeButton}>
        <Button
          style={{
            opacity: activeEpisode > 0 ? 1 : 0,
            willChange: activeEpisode > 0 ? "opacity" : "none",
            pointerEvents: activeEpisode > 0 ? "auto" : "none",
            transition: "opacity 0.3s ease-out",
          }}
          title="voltar"
          onClick={handleCloseButtonClick}
          variant="voltar"
          leftIcon={<FaArrowLeft className={styles.arrowIcon} />}
        />
      </div>
    </div>
  );
};

export default EpisodesList;
