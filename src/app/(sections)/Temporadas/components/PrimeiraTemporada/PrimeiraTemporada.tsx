"use client";

import styles from "./PrimeiraTemporada.module.scss";

import { useEffect, useRef, useState } from "react";

import EpisodesList from "../EpisodesList/EpisodesList";
import useLockBodyScroll from "@/utils/useLockBodyScroll";
import Nav from "../Nav/Nav";
import Button from "@/components/Button/Button";
import Episodes from "../Episodes/Episodes";
import HighlightsList from "../HighlightsList/HighlightsList";

import { motion } from "framer-motion";
import {
  closeButtonVariants,
  seasonVariants,
  seasonFirstMaskVariants,
  seasonSecondMaskVariants,
  seasonTitleVariants,
  seasonImageVariants,
} from "../../animations/anime";

import { seasons } from "@/data/Temporadas";
import { useMenu } from "@/contexts/GlobalContext";
import { sectionRefs } from "@/utils/sectionRefs";

const navItems = ["episódios", "highlights"];

const PrimeiraTemporada = () => {
  const { isSeasonActive, setIsSeasonActive, activeSeason, setActiveSeason } =
    useMenu();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transformStyle, setTransformStyle] = useState("");

  const [activeEpisode, setActiveEpisode] = useState(0);
  const [isEpisodeActive, setIsEpisodeActive] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(false);

  const [activeTab, setActiveTab] = useState("");

  const [activeHighlight, setActiveHighlight] = useState(0);
  const [isHighlightActive, setIsHighlightActive] = useState(false);

  const itemRef = useRef<HTMLDivElement | null>(null);
  const seasonOpenButtonRef = useRef<HTMLDivElement | null>(null);

  const temporada = "Temporada_1";
  const episodes = seasons.firstSeason;
  const episodesList = seasons.firstSeason;
  const highlights = seasons.firstSeasonHighlights;

  useLockBodyScroll(isSeasonActive);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || isTransitioning) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltY = relativeY * 30;
    const tiltX = relativeX * 30;

    const baseCenter = "translate(-50%, -50%)";
    const tilt = `translateX(${tiltX}px) translateY(${tiltY}px)`;

    setTransformStyle(`${baseCenter} ${tilt}`);
  };
  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  useEffect(() => {
    if (activeSeason !== temporada || !seasonOpenButtonRef.current) return;
    const scrollIntoView = () => {
      const season =
        activeSeason === "Temporada_1" ? "temporada 1" : "temporada 2";
      const currentSeason = sectionRefs.current[`temp<b>o</b>radas-${season}`];
      currentSeason.scrollIntoView({ behavior: "smooth" });
    };

    const button = seasonOpenButtonRef.current;

    scrollIntoView();

    button?.addEventListener("click", scrollIntoView);

    return () => {
      button?.removeEventListener("click", scrollIntoView);
    };
  }, [activeSeason]);

  return (
    <section
      ref={(el) => {
        if (el)
          sectionRefs.current["temp<b>o</b>radas-temporada 1"] =
            el as HTMLElement;
      }}
      className={styles.container}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={styles.seasonContainer}
      >
        <motion.div
          className={styles.seasonContent}
          variants={seasonVariants}
          initial="closed"
          animate={activeSeason === temporada ? "opened" : "closed"}
          style={{
            zIndex: isSeasonActive ? "200" : "2",
          }}
        >
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
              title="fechar"
              onClick={() => {
                setIsSeasonActive(false);
                setActiveSeason("");
                setActiveTab(" ");
                setActiveEpisode(0);
                setIsEpisodeActive(false);
                setIsFirstClick(false);
                setIsHighlightActive(false);
                setActiveHighlight(0);
                setIsTransitioning(true);
                setTimeout(() => {
                  setIsTransitioning(false);
                }, 1000);
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
            activeSeason={activeSeason}
            temporada={temporada}
            isHighlightActive={isHighlightActive}
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
          <div
            className={styles.highlightsContainer}
            style={{ zIndex: activeTab === "highlights" ? "1" : "-1" }}
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
          <motion.div
            className={styles.secondMask}
            variants={seasonSecondMaskVariants}
            initial="visible"
            animate={activeSeason === temporada ? "hidden" : "visible"}
          >
            <motion.div
              className={styles.firstMask}
              variants={seasonFirstMaskVariants}
              initial="visible"
              animate={activeSeason === temporada ? "hidden" : "visible"}
            >
              <motion.div
                variants={seasonImageVariants}
                initial="visible"
                animate={activeSeason === temporada ? "hidden" : "visible"}
                ref={itemRef}
                style={{
                  transform: transformStyle,
                  transition: isTransitioning ? "none" : "all 0.3s ease-out",
                }}
                className={styles.firstMaskImageContainer}
              />
              <motion.h1
                className={styles.firstMaskTitle}
                variants={seasonTitleVariants}
                initial="visible"
                animate={activeSeason === temporada ? "hidden" : "visible"}
              >
                Temporada 1
              </motion.h1>
            </motion.div>
          </motion.div>
        </motion.div>
        <div ref={seasonOpenButtonRef} className={styles.seasonOpenButton}>
          <Button
            title="ver detalhes"
            variant="ghost"
            onClick={() => {
              setIsSeasonActive(true);
              setActiveSeason(temporada);
              setActiveTab("episódios");
              setIsTransitioning(true);
              setTimeout(() => {
                setIsTransitioning(false);
              }, 1000);
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default PrimeiraTemporada;
