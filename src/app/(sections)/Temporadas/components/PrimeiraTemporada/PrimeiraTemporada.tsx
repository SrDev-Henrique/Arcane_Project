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
import HighlightsList from "../HighlightsList/HighlightsList";

const navItems = ["episódios", "highlights"];

const PrimeiraTemporada = () => {
  const [activeEpisode, setActiveEpisode] = useState(0);
  const [isEpisodeActive, setIsEpisodeActive] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSeasonActive, setIsSeasonActive] = useState(true);
  const [isFirstClick, setIsFirstClick] = useState(false);
  const [activeSeason, setActiveSeason] = useState("Temporada_1");
  const [activeTab, setActiveTab] = useState("episódios");

  const [activeHighlight, setActiveHighlight] = useState(0);
  const [isHighlightActive, setIsHighlightActive] = useState(false)

  const temporada = "Temporada_1";
  const episodes = seasons.firstSeason;
  const episodesList = seasons.firstSeason;
  const highlights = seasons.firstSeasonHighlights;

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
            style={{ pointerEvents: "auto" }}
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
            isEpisodeActive={isEpisodeActive}
            setIsEpisodeActive={setIsEpisodeActive}
            isFirstClick={isFirstClick}
            setIsFirstClick={setIsFirstClick}
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
            setIsFirstClick={setIsFirstClick}
          />
        </div>
        <HighlightsList
          highlights={highlights}
          activeTab={activeTab}
          activeHighlight={activeHighlight}
          setActiveHighlight={setActiveHighlight}
          isHighlightActive={isHighlightActive}
          setIsHighlightActive={setIsHighlightActive}
        />
      </div>
    </div>
  );
};

export default PrimeiraTemporada;
