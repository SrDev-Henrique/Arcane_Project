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

const navItems = ["episódios", "highlights"];

const PrimeiraTemporada = () => {
  const [activeEpisode, setActiveEpisode] = useState(0);
  const [activeSeason, setActiveSeason] = useState("Temporada 1");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSeasonActive, setIsSeasonActive] = useState(true);
  const [activeTab, setActiveTab] = useState("episódios");

  const temporada = "Temporada 1";

  console.log(setIsSeasonActive, setActiveSeason);

  useLockBodyScroll(isSeasonActive);

  const episodes = seasons.firstSeason;

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
              setIsSeasonActive(false)
              setActiveSeason("")
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
            episodes={episodes}
          />
        </div>
      </div>
    </div>
  );
};

export default PrimeiraTemporada;
