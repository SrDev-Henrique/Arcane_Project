import {
  enterFullscreen,
  exitFullscreen,
  useFullscreenStatus,
} from "@/hooks/useFullscreen";
import styles from "./FullscreenSwitcher.module.scss";
import { isMobile } from "react-device-detect";

const FullscreenSwitcher = () => {
  const isFullScreen = useFullscreenStatus();

  const toggleFullScreen = () => {
    if (isFullScreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  if (isMobile) return null;
  return (
    <div
      onClick={toggleFullScreen}
      className={`${styles.fullScreenSwitcher} ${
        isFullScreen ? styles.active : ""
      }`}
    >
      <div className={styles.fullScreenSwitcherTextContainer}>
        <div
          className={`${styles.fullScreenSwitcherText} ${
            isFullScreen ? styles.active : ""
          }`}
        >
          <span className={styles.transformText}>ativar</span>
          <span className={styles.transformText}>desativar</span>
        </div>
        <p>modo tela cheia</p>
      </div>
    </div>
  );
};

export default FullscreenSwitcher;
