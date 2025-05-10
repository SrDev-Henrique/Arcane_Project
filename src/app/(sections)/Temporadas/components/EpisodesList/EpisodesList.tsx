"use client";

import Image from "next/image";
import styles from "./EpisodesList.module.scss";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import debounce from "lodash.debounce";

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

  const [firstClicked, setFirstClicked] = useState(0);

  const addToImagesRefs = (el: HTMLDivElement | null, index: number) => {
    if (!el) return;
    imagesContainerRef.current[index] = el;
  };

  const handleEpisodeClick = (episodeId: number, index: number) => {
    if (isTransitioning || activeEpisode > 0) return;
    firstContainerClickedRef.current = imagesContainerRef.current[index];
    setActiveEpisode(episodeId);
    setIsTransitioning(true);
    setFirstClicked(episodeId);
    container?.classList.add(styles.active);

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
      scale: 1,
      borderRadius: "0",
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    },
    inactive: {
      scale: 0.745,
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
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1]},
    },
  };

  useEffect(() => {
    const idx = episodes.findIndex((ep) => ep.id === activeEpisode);

    const scrollIntoView = () => {
      const behavior = activeEpisode === firstClicked ? "smooth" : "instant";
      imagesContainerRef.current[idx]?.scrollIntoView({
        behavior,
        block: "center",
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
        >
          <Image
            src={episode.image}
            alt={`episódio-${episode.episode}`}
            width={3840}
            height={1632}
            className={styles.image}
            placeholder="blur"
            blurDataURL={episode.image}
          />

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
      <div onClick={handleCloseButtonClick} className={styles.closeButton}>
        <p>Fechar</p>
      </div>
    </div>
  );
};

export default EpisodesList;
