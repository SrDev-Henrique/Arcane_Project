"use client";

import styles from "./RenderSeasons.module.scss";

import EpisodesList from "../EpisodesList/EpisodesList";
import HighlightsList from "../HighlightsList/HighlightsList";

import { useEffect, useState } from "react";

import Nav from "../Nav/Nav";
import Button from "@/components/Button/Button";
import Episodes from "../Episodes/Episodes";

import { motion } from "framer-motion";
import { closeButtonVariants } from "../../anime";

import useLockBodyScroll from "@/utils/useLockBodyScroll";
import { useMenu } from "@/contexts/GlobalContext";
import { seasons } from "@/data/Temporadas";
import { useRouter } from "next/navigation";
import FullscreenSwitcher from "@/components/FullscreenSwitcher/FullscreenSwitcher";

const navItems = ["episódios", "highlights"];

const RenderSeasons = ({ temporada }: { temporada: string }) => {
  const { isSeasonActive, activeSeason, setActiveSeason } = useMenu();

  const [isTransitioning, setIsTransitioning] = useState(false);

  const [activeEpisode, setActiveEpisode] = useState(0);
  const [isEpisodeActive, setIsEpisodeActive] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(false);

  const [activeTab, setActiveTab] = useState("");

  const [activeHighlight, setActiveHighlight] = useState(0);
  const [isHighlightActive, setIsHighlightActive] = useState(false);

  useLockBodyScroll(isSeasonActive);

  const router = useRouter();

  const episodes =
    temporada === "Temporada_1" ? seasons.firstSeason : seasons.secondSeason;
  const episodesList =
    temporada === "Temporada_1"
      ? seasons.firstSeasonEpisodes
      : seasons.secondSeasonEpisodes;
  const highlights =
    temporada === "Temporada_1"
      ? seasons.firstSeasonHighlights
      : seasons.secondSeasonHighlights;

  useEffect(() => {
    setTimeout(() => {
      setActiveSeason(temporada);
      setActiveTab("episódios");
    }, 600);
  }, [setActiveSeason, temporada]);

  return (
    <motion.div className={styles.seasonContent}>
      <motion.div
        className={styles.fullscreenSwitcher}
        variants={closeButtonVariants}
        initial="hidden"
        animate={
          activeSeason === temporada && !isHighlightActive && !isEpisodeActive
            ? "visible"
            : "hidden"
        }
      >
        <FullscreenSwitcher />
      </motion.div>
      <motion.div
        className={styles.closeButton}
        variants={closeButtonVariants}
        initial="hidden"
        animate={
          activeSeason === temporada && !isHighlightActive
            ? "visible"
            : "hidden"
        }
      >
        <Button
          title="Página Inicial"
          onClick={() => {
            router.push("/");
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
        setIsEpisodeActive={setIsEpisodeActive}
        setIsFirstClick={setIsFirstClick}
        isHighlightActive={isHighlightActive}
        isTransitioning={isTransitioning}
        setIsTransitioning={setIsTransitioning}
      />
      <div
        className={styles.episodesContainer}
        style={{ zIndex: activeTab === "episódios" ? "1" : "0" }}
      >
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
          temporada={temporada}
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
          activeSeason={activeSeason}
        />
      </div>
      <div
        className={styles.highlightsContainer}
        style={{ zIndex: activeTab === "highlights" ? "1" : "0" }}
      >
        <HighlightsList
          highlights={highlights}
          activeTab={activeTab}
          activeHighlight={activeHighlight}
          setActiveHighlight={setActiveHighlight}
          isHighlightActive={isHighlightActive}
          setIsHighlightActive={setIsHighlightActive}
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
        />
      </div>
    </motion.div>
  );
};

export default RenderSeasons;
