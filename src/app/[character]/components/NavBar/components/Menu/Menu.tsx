import { TransitionLink } from "@/components/TransitionLink";
import styles from "./Menu.module.scss";
import { RiHome9Fill } from "react-icons/ri";

import { motion } from "framer-motion";
import { tabsContainerVariants, menuButtonVariants } from "./anime";
import { useState } from "react";

const Menu = ({
  tabs,
  activeTab,
  setActiveTab,
  color,
  theme,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  color: string;
  theme: string;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.navContainer}>
          <motion.div
            variants={tabsContainerVariants}
            initial="hidden"
            animate={isMenuOpen ? "visible" : "hidden"}
            className={styles.tabsContainer}
            style={{
              backgroundColor: theme === "piltover" ? "#f4e7e1" : "#141414",
            }}
          >
            {tabs.map((tab) => (
              <div
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
              </div>
            ))}
            <TransitionLink href={"/"}>
              <div className={styles.buttonContainer}>
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
              </div>
            </TransitionLink>
          </motion.div>
        </div>
        <motion.div
          variants={menuButtonVariants}
          initial="hidden"
          animate="visible"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`${styles.openMenuButton} ${
            isMenuOpen ? styles.isOpen : ""
          }`}
          style={{
            backgroundColor: theme === "piltover" ? "#f4e7e1" : "#141414",
            x: "-50%",
            transform: "translateX(-50%)",
          }}
        >
          <div className={styles.linesContainer}>
            {[...Array(4)].map((_, index) => {
              const classList = [
                styles.firstLine,
                styles.secondLine,
                styles.thirdLine,
                styles.lastLine,
              ];
              return (
                <div
                  key={index}
                  className={`${styles.lines} ${classList[index]}`}
                  style={{
                    backgroundColor:
                      theme === "piltover" ? "#141414" : "#f4e7e1",
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;
