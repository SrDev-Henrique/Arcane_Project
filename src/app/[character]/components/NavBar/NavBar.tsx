import styles from "./NavBar.module.scss";
import Menu from "./components/Menu/Menu";
import { TransitionLink } from "@/components/TransitionLink";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RiHome9Fill } from "react-icons/ri";
import { FaPause, FaPlay } from "react-icons/fa6";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { motion } from "framer-motion";
import {
  musicDiscVariants,
  songContainerVariants,
  navContainerVariants,
  buttonsVariants,
  menuButtonVariants,
} from "./anime";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface PlaylistItem {
  songName: string;
  artistName: string;
  imgSrc: string;
}

const NavBar = ({
  tabs,
  activeTab,
  setActiveTab,
  color,
  theme,
  playlist,
  name,
  lastName,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  color: string;
  theme: string;
  playlist: PlaylistItem[];
  name: string;
  lastName: string;
}) => {
  const songInfoRef = useRef<HTMLDivElement | null>(null);
  const songNameRef = useRef<(HTMLDivElement | null)[]>([]);
  const songArtistRef = useRef<(HTMLDivElement | null)[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentSong, setCurrentSong] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalSongs = playlist.length;
  const upcomingSongIndex = (currentSong + 1) % totalSongs;

  const addToNameRefs = (el: HTMLDivElement | null, index: number) => {
    if (!el) return;
    songNameRef.current[index] = el;
  };
  const addToArtistRefs = (el: HTMLDivElement | null, index: number) => {
    if (!el) return;
    songArtistRef.current[index] = el;
  };

  const handleNextClick = async () => {
    if (playlist.length <= 1 || isFirstLoad || isTransitioning) return;
    if (isPlaying) {
      setIsPlaying(false);
      setIsTransitioning(true);
      await sleep(400);
      setCurrentSong(upcomingSongIndex);
      setIsTransitioning(false);
      await sleep(400);
      setIsPlaying(true);
    } else {
      setIsTransitioning(true);
      await sleep(400);
      setCurrentSong(upcomingSongIndex);
      setIsTransitioning(false);
    }
  };

  useEffect(() => {
    const getAudioSrc = (index: number) =>
      name === "Cecil B."
        ? `/audio/${lastName}-${index}.m4a`
        : `/audio/${name}-${index}.m4a`;

    if (!audioRef.current) {
      audioRef.current = new Audio(getAudioSrc(currentSong + 1));
    } else {
      const audio = audioRef.current;
      audio.pause();
      audio.src = getAudioSrc(currentSong + 1);
    }

    const handleNextClick = async () => {
      setIsPlaying(false);
      setIsTransitioning(true);
      await sleep(400);
      setCurrentSong(upcomingSongIndex);
      setIsTransitioning(false);
      await sleep(400);
      setIsPlaying(true);
    };

    const audio = audioRef.current;
    const onEnded = async () => {
      if (totalSongs > 1) handleNextClick();
      if (totalSongs <= 1) {
        setIsPlaying(false);
        audio.currentTime = 0;
        await sleep(400);
        setIsPlaying(true);
      }
    };
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentSong, name, lastName, totalSongs, upcomingSongIndex]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!songInfoRef.current) return;
    const songWidth = songNameRef.current[currentSong]?.offsetWidth;
    const songArtistWidth = songArtistRef.current[currentSong]?.offsetWidth;
    const songContainerWidth = songInfoRef.current.offsetWidth;

    if (songWidth && songWidth > songContainerWidth) {
      songNameRef.current[currentSong]?.classList.add(styles.scrollingText);
    }
    if (songArtistWidth && songArtistWidth > songContainerWidth) {
      songArtistRef.current[currentSong]?.classList.add(styles.scrollingText);
    }
  }, [currentSong]);

  useEffect(() => {
    setTimeout(() => {
      setIsFirstLoad(false);
    }, 2200);
  }, []);

  return (
    <div className={styles.container}>
      <motion.div
        variants={navContainerVariants}
        initial="hidden"
        animate="visible"
        className={styles.navContainer}
      >
        <div
          className={styles.tabsContainer}
          style={{
            backgroundColor: theme === "piltover" ? "#f4e7e1" : "#141414",
          }}
        >
          {tabs.map((tab) => (
            <motion.div
              variants={buttonsVariants}
              key={tab}
              className={`${styles.tabs} ${
                activeTab === tab ? styles.active : ""
              } ${theme === "zaun" ? styles.dark : ""}`}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor:
                  activeTab === tab ? `${color}50` : `${color}20`,
              }}
            >
              <p>{tab}</p>
            </motion.div>
          ))}
        </div>
        <TransitionLink href={"/"}>
          <motion.div
            variants={menuButtonVariants}
            initial="hidden"
            animate="visible"
            className={styles.buttonContainer}
          >
            <div
              className={`${styles.button} ${
                theme === "zaun" ? styles.dark : ""
              }`}
            >
              <RiHome9Fill />
            </div>
            <div
              className={`${styles.button} ${
                theme === "zaun" ? styles.dark : ""
              }`}
            >
              <RiHome9Fill />
            </div>
          </motion.div>
        </TransitionLink>
      </motion.div>
      <Menu
        tabs={tabs}
        color={color}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
      />
      <motion.div
        variants={songContainerVariants}
        initial="hidden"
        animate="visible"
        className={`${styles.songContainer} ${
          theme === "zaun" ? styles.dark : ""
        }`}
      >
        <div className={styles.song}>
          <div className={styles.songInfoContainer}>
            {playlist.map((song, index) => (
              <div
                key={index}
                ref={songInfoRef}
                className={styles.songInfo}
                style={{
                  opacity: index === currentSong ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out",
                }}
              >
                <div
                  ref={(el) => addToNameRefs(el, index)}
                  className={styles.songName}
                >
                  {song.songName}
                </div>
                <div
                  ref={(el) => addToArtistRefs(el, index)}
                  className={styles.songArtist}
                >
                  {song.artistName}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.songControls}>
            <div
              onClick={() => {
                if (isFirstLoad || isTransitioning) return;
                setIsPlaying(!isPlaying);
              }}
              className={styles.playPause}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </div>
            <div
              onClick={handleNextClick}
              style={{
                opacity: playlist.length <= 1 ? 0.6 : 1,
              }}
              className={styles.next}
            >
              <TbPlayerTrackNextFilled />
              <div
                className={styles.cantPlay}
                style={{
                  display: playlist.length <= 1 ? "block" : "none",
                  backgroundColor: theme === "piltover" ? "#141414" : "#ffff",
                }}
              />
            </div>
          </div>
        </div>
        <div
          className={`${styles.icon} ${isPlaying ? styles.isPlaying : ""} ${
            theme === "zaun" ? styles.dark : ""
          }`}
        >
          <div className={styles.arm} />
          <motion.div
            variants={musicDiscVariants}
            initial="hidden"
            animate={isTransitioning ? "hidden" : "visible"}
            custom={isFirstLoad}
            style={{
              transform: isPlaying ? "" : "rotate(0deg)",
            }}
            className={styles.disc}
          >
            <div className={styles.imageContainer}>
              {playlist.map((song, index) => (
                <div
                  className={styles.image}
                  key={index}
                  style={{ opacity: index === currentSong ? 1 : 0 }}
                >
                  <Image
                    src={song.imgSrc}
                    alt={`${song.songName} cover`}
                    fill
                    sizes="(max-width: 50px)"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NavBar;
