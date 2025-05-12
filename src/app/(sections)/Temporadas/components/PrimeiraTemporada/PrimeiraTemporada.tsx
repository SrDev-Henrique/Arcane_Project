"use client";

import { useRef, useState } from "react";
import EpisodesList from "../EpisodesList/EpisodesList";
import styles from "./PrimeiraTemporada.module.scss";
import useLockBodyScroll from "@/utils/useLockBodyScroll";

import { seasons } from "@/data/Temporadas";
import Nav from "../Nav/Nav";

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

  const firstContainerClickedRef = useRef<HTMLDivElement | null>(null);

  const episodes = seasons.firstSeason;

  return (
    <div className={styles.container}>
      <div className={styles.seasonContainer}>
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
            activeSeason={activeSeason}
            temporada={temporada}
            activeEpisode={activeEpisode}
            setActiveEpisode={setActiveEpisode}
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            firstContainerClickedRef={firstContainerClickedRef}
            activeTab={activeTab}
            episodes={episodes}
          />
        </div>
      </div>
    </div>
  );
};

export default PrimeiraTemporada;
