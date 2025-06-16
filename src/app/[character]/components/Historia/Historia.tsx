import styles from "./Historia.module.scss";

import Journey from "./components/Journey";
import FirstSeason from "./components/FirstSeason";
import SecondSeason from "./components/SecondSeason";
import Conclusion from "./components/Conclusion";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { JourneyItem } from "@/types/CharacterTypes";
import { FaChevronUp } from "react-icons/fa6";
import classNames from "classnames";

const Historia = ({
  activeTab,
  jornada,
  firstSeason,
  secondSeason,
  conclusion,
  theme,
}: {
  activeTab: string;
  jornada: JourneyItem[];
  firstSeason: JourneyItem[];
  secondSeason: JourneyItem[];
  conclusion: JourneyItem[];
  theme: string;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const tab = "história";

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const localLenis = new Lenis({
      wrapper: container,
      content: container,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 0,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });
    lenisRef.current = localLenis;

    function animate(time: number) {
      localLenis.raf(time);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    const handleScroll = () => {
      if (container.scrollTop > 100) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      localLenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={classNames(
        styles.container,
        activeTab !== tab ? styles.isHidden : "",
        theme === "zaun" ? styles.dark : ""
      )}
    >
      <div
        onClick={() => lenisRef.current?.scrollTo(0, { duration: 1.5 })}
        style={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0.5,
          pointerEvents: showBackToTop ? "auto" : "none",
          transition: "opacity 0.5s ease-in-out, scale 0.5s ease-in-out",
        }}
        className={classNames(
          styles.backToTop,
          theme === "zaun" ? styles.dark : ""
        )}
      >
        <FaChevronUp />
      </div>
      <Journey jornada={jornada} theme={theme} />
      <FirstSeason firstSeason={firstSeason} theme={theme} />
      <SecondSeason secondSeason={secondSeason} theme={theme} />
      <Conclusion conclusion={conclusion} theme={theme} />
    </div>
  );
};

export default Historia;
