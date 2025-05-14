import React, { useEffect, useState } from "react";
import styles from "./Episodes.module.scss";
import Image from "next/image";
import { MdOutlineStarPurple500 } from "react-icons/md";
import Button from "@/components/Button/Button";
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  currentEpisodeVariants,
  nextEpisodeVariants,
  prevEpisodeVariants,
  episodesContainerVariants,
} from "../../animations/anime";

interface seasonItems {
  episode: string;
  title: string;
  imdb: number;
  image: string;
  link: string;
  description: string;
}

const Episodes = ({
  subject,
  temporada,
  setActiveEpisode,
  activeEpisode,
  isTransitioning,
  setIsTransitioning,
  activeTab,
  isEpisodeActive,
  setIsFirstClick,
}: {
  subject: seasonItems[];
  temporada: string;
  activeEpisode: number;
  setActiveEpisode: (episode: number) => void;
  isTransitioning: boolean;
  setIsTransitioning: (transitioning: boolean) => void;
  activeTab: string;
  isEpisodeActive: boolean;
  setIsFirstClick: (isFirstClick: boolean) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentEpisode, setCurrentEpisode] = useState(currentIndex);

  const totalImages = subject.length;

  const getImageSrc = (index: number) => {
    return `/images/Temporadas/${temporada}/episódio-${index}.webp`;
  };

  const upcomingIndex = (currentIndex % totalImages) + 1;
  const prevIndex = ((currentIndex - 2 + totalImages) % totalImages) + 1;
  const nextEpisode = (currentEpisode % totalImages) + 1;

  const handleNextEpisodeClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveEpisode(upcomingIndex);
    setIsFirstClick(false);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1800);
  };

  const handlePrevEpisodeClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveEpisode(prevIndex);
    setIsFirstClick(false);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1800);
  };

  useEffect(() => {
    if (activeEpisode >= 0) {
      setCurrentIndex(activeEpisode);
      setCurrentEpisode(activeEpisode);
    }
  }, [activeEpisode]);

  return (
    <motion.div
      variants={episodesContainerVariants}
      initial="hidden"
      animate={isEpisodeActive ? "visible" : "hidden"}
      className={`${styles.container} ${
        activeTab !== "episódios" || activeEpisode <= 0 ? styles.isHidden : ""
      }`}
    >
      <div className={styles.episodesContainer}>
        {subject.map((episode, index) => (
          <motion.div
            key={index}
            variants={
              currentIndex === index + 1
                ? currentEpisodeVariants
                : prevIndex === index + 1
                ? prevEpisodeVariants
                : upcomingIndex === index + 1
                ? nextEpisodeVariants
                : {}
            }
            initial="hidden"
            animate={
              currentIndex === index + 1 && isEpisodeActive
                ? currentEpisodeVariants.visible
                : "hidden"
            }
            className={`${styles.episode} ${
              currentIndex === index + 1
                ? styles.active
                : prevIndex === index + 1
                ? styles.prev
                : upcomingIndex === index + 1
                ? styles.upcoming
                : styles.hidden
            }`}
          >
            <div className={styles.episodeContainer}>
              <div
                className={styles.episodeImageContainer}
                style={{
                  backgroundImage: `url(${episode.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className={styles.episodeInfoContainer}>
                <div className={styles.episodeInfo}>
                  <div className={styles.episodeInfoContent}>
                    <div className={styles.currentEpisodeInfo}>
                      <div className={styles.currentEpisodeImage}>
                        <Image
                          alt={`${temporada} episódio ${episode.episode}`}
                          src={episode.image}
                          width={224}
                          height={224}
                        />
                      </div>
                      <div className={styles.currentEpisode}>
                        {episode.episode}
                      </div>
                      <div className={styles.currentEpisodeDetails}>
                        <h1 className={styles.currentEpisodeTitle}>
                          {episode.title}
                        </h1>
                        <div className={styles.currentEpisodeRating}>
                          <p className={styles.currentEpisodeImdb}>
                            IMDb: {episode.imdb}/10
                          </p>
                          <div
                            className={`${styles.currentEpisodeFav} ${
                              episode.imdb < 9 ? styles.isHidden : ""
                            }`}
                          >
                            <MdOutlineStarPurple500
                              className={styles.currentEpisodeFavIcon}
                            />
                            <p className={styles.currentEpisodeFavText}>favs</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.currentEpisodeDescriptionContainer}>
                      <p className={styles.currentEpisodeDescription}>
                        {episode.description}
                      </p>
                    </div>
                  </div>
                  <div
                    className={styles.nextEpisodeContainer}
                  >
                    <div className={styles.watchPrevButton}>
                      <Button
                        title="Assista agora"
                        leftIcon={<HiOutlinePlayCircle />}
                        onClick={() => {
                          window.open(episode.link, "_blank");
                        }}
                        variant="assistaAgora"
                      />
                      <Button
                        style={{
                          opacity: isTransitioning ? 0.7 : 1,
                          transition: "opacity 0.3s ease-out",
                        }}
                        title="Anterior"
                        leftIcon={<FaArrowLeft />}
                        variant="anterior"
                        onClick={handlePrevEpisodeClick}
                      />
                    </div>
                    <div
                      className={`${styles.nextEpisodeInfo} ${
                        isTransitioning ? styles.opacityLow : ""
                      }`}
                    >
                      <div className={styles.nextEpisodeTexts}>
                        <p className={styles.nextText}>Próximo:</p>
                        <p className={styles.nextEpisode}>
                          episódio {nextEpisode}
                        </p>
                        <p className={styles.nextEpisodeTitle}>
                          {subject[nextEpisode - 1].title}
                        </p>
                      </div>
                      <div
                        className={styles.nextEpisodeButton}
                        style={{
                          backgroundImage: `url(${getImageSrc(nextEpisode)})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        onClick={handleNextEpisodeClick}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Episodes;
