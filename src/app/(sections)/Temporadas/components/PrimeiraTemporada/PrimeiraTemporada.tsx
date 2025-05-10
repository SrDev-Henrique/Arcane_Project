"use client";

import { useRef, useState } from "react";
import EpisodesList from "../EpisodesList/EpisodesList";
import styles from "./PrimeiraTemporada.module.scss";

import { seasons } from "@/data/Temporadas";

const PrimeiraTemporada = () => {
  const [activeEpisode, setActiveEpisode] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const firstContainerClickedRef = useRef<HTMLDivElement | null>(null);

  const episodes = seasons.firstSeason;
  return (
    <div className={styles.container}>
      <EpisodesList
        activeEpisode={activeEpisode}
        setActiveEpisode={setActiveEpisode}
        isTransitioning={isTransitioning}
        setIsTransitioning={setIsTransitioning}
        firstContainerClickedRef={firstContainerClickedRef}
        episodes={episodes}
      />
    </div>
  );
};

export default PrimeiraTemporada;
