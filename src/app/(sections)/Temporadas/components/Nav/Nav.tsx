import styles from "./Nav.module.scss";

import { motion } from "framer-motion";

import { RiPlayList2Fill } from "react-icons/ri";
import { MdOndemandVideo } from "react-icons/md";
import { buttonVariants } from "../../anime";
import { navVariants } from "../../anime";

const Nav = ({
  navItems,
  activeTab,
  setActiveTab,
  setActiveEpisode,
  isHighlightActive,
  setIsEpisodeActive,
  setIsFirstClick,
  isTransitioning,
  setIsTransitioning,
}: {
  navItems: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setActiveEpisode: (episode: number) => void;
  isHighlightActive: boolean;
  setIsEpisodeActive: (episode: boolean) => void;
  setIsFirstClick: (firstClick: boolean) => void;
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
}) => {
  const onNavClick = (tab: string) => {
    if (activeTab !== tab) {
      if (isTransitioning) return;
      setActiveTab(tab);
      setActiveEpisode(0);
      setIsEpisodeActive(false);
      setIsFirstClick(false);
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1200);
    }
  };
  
    return (
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate={isHighlightActive ? "hidden" : "visible"}
        style={{
          pointerEvents: isHighlightActive ? "none" : "auto",
        }}
        className={styles.nav}
      >
        {navItems.map((tab) => (
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate={isHighlightActive ? "hidden" : "visible"}
            key={tab}
            className={`${styles.navButton} ${
              activeTab === tab ? styles.active : ""
            }`}
            onClick={() => onNavClick(tab)}
          >
            <div className={styles.navButtonIconContainer}>
              {tab === "episódios" ? (
                <RiPlayList2Fill className={styles.navButtonIcon} />
              ) : (
                <MdOndemandVideo className={styles.navButtonIcon} />
              )}
            </div>
            <span className={styles.navButtonText}>{tab}</span>
          </motion.button>
        ))}
      </motion.nav>
    );
};

export default Nav;
