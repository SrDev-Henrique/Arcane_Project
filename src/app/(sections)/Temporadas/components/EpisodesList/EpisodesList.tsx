"use client";

import styles from "./EpisodesList.module.scss";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import debounce from "lodash.debounce";
import useDimension from "@/utils/useDimension";
import Lenis from "lenis";
import Button from "@/components/Button/Button";

interface EpisodesItems {
  id: number;
  episode: string;
  title: string;
  image: string;
}

interface EpisodesListProps {
  episodes: EpisodesItems[];
  firstContainerClickedRef: React.RefObject<HTMLDivElement | null>;
  activeEpisode: number;
  setActiveEpisode: (episode: number) => void;
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
}

const EpisodesList = ({
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
    setIsTransitioning(false);
    setActiveEpisode(0);
    container?.classList.remove(styles.active);
  };

  const variants = {
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
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.6 },
    },
  };

  const titlesVariants = {
    initial: {
      y: 0,
    },
    enter: {
      y: -30,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.6 },
    },
    exit: {
      y: 0,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    },
  };

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
        setIsMobile(window.innerWidth <= 768 || window.innerHeight <= 440);
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
      {episodes.map((episode, index) => (
        <motion.div
          ref={(el) => addToImagesRefs(el, index)}
          key={episode.id}
          className={styles.episodes}
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
                  animate={activeEpisode === episode.id ? "enter" : "exit"}
                >
                  {episode.title}
                </motion.h1>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      <div className={styles.closeButton}>
        <Button
          title="fechar"
          onClick={handleCloseButtonClick}
          variant="temporadas"
        />
      </div>
    </div>
  );
};

export default EpisodesList;
