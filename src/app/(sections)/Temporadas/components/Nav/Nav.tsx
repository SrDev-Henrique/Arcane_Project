import styles from "./Nav.module.scss";

import { motion } from "framer-motion";

import { RiPlayList2Fill } from "react-icons/ri";
import { MdOndemandVideo } from "react-icons/md";
import { buttonVariants } from "../../animations/anime";
import { navVariants } from "../../animations/anime";

const Nav = ({
  navItems,
  activeTab,
  setActiveTab,
  setActiveEpisode,
  activeSeason,
  temporada,
}: {
  navItems: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setActiveEpisode: (episode: number) => void;
  activeSeason: string;
  temporada: string;
}) => {

  if (activeSeason === temporada)
    return (
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={styles.nav}
      >
        {navItems.map((tab) => (
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            key={tab}
            className={`${styles.navButton} ${
              activeTab === tab ? styles.active : ""
            }`}
            onClick={() => {
              if (activeTab !== tab) {
                setActiveTab(tab);
                setActiveEpisode(0);
              }
            }}
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
