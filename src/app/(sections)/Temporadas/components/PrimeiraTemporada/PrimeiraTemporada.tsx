"use client";

import { useState } from "react";
import EpisodesList from "../EpisodesList/EpisodesList";
import styles from "./PrimeiraTemporada.module.scss";
import useLockBodyScroll from "@/utils/useLockBodyScroll";

import { motion } from "framer-motion";

import { seasons } from "@/data/Temporadas";
import Nav from "../Nav/Nav";
import Button from "@/components/Button/Button";
import { closeButtonVariants } from "../../animations/anime";
import Episodes from "../Episodes/Episodes";

const navItems = ["episódios", "highlights"];

const PrimeiraTemporada = () => {
  const [isEpisodeActive, setIsEpisodeActive] = useState(false);
  const [activeEpisode, setActiveEpisode] = useState(0);
  const [activeSeason, setActiveSeason] = useState("Temporada_1");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSeasonActive, setIsSeasonActive] = useState(true);
  const [activeTab, setActiveTab] = useState("episódios");

  const temporada = "Temporada_1";
  const episodes = seasons.firstSeason;
  const episodesList = seasons.firstSeason;

  useLockBodyScroll(isSeasonActive);

  return (
    <div className={styles.container}>
      <div className={styles.seasonContainer}>
        <motion.div
          className={styles.closeButton}
          variants={closeButtonVariants}
          initial="hidden"
          animate={activeSeason === temporada ? "visible" : "hidden"}
        >
          <Button
            title="fechar"
            onClick={() => {
              setIsSeasonActive(false);
              setActiveSeason("");
              setActiveTab(" ");
            }}
            variant="fechar"
          />
        </motion.div>
        <Nav
          navItems={navItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setActiveEpisode={setActiveEpisode}
          activeSeason={activeSeason}
          temporada={temporada}
        />
        <div className={styles.episodesContainer}>
          <EpisodesList
            activeEpisode={activeEpisode}
            setActiveEpisode={setActiveEpisode}
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activeTab={activeTab}
            episodes={episodesList}
            setIsEpisodeActive={setIsEpisodeActive}
          />
          <Episodes
            subject={episodes}
            temporada={temporada}
            activeEpisode={activeEpisode}
            setActiveEpisode={setActiveEpisode}
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activeTab={activeTab}
            isEpisodeActive={isEpisodeActive}
          />
        </div>
      </div>
    </div>
  );
};

export default PrimeiraTemporada;
