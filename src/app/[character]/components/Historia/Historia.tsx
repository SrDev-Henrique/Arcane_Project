import styles from "./Historia.module.scss";

import Journey from "./components/Journey/Journey";
import FirstSeason from "./components/FirstSeason/FirstSeason";
import SecondSeason from "./components/SecondSeason/SecondSeason";
import Conclusion from "./components/Conclusion/Conclusion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

const Historia = ({ activeTab }: { activeTab: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const tab = "história";

  useEffect(() => {
    if (!containerRef.current) return;

    const localLenis = new Lenis({
      wrapper: containerRef.current,
      content: containerRef.current,
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

    return () => {
      localLenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${
        activeTab !== tab ? styles.isHidden : ""
      }`}
    >
      <h1>História</h1>
      <Journey />
      <FirstSeason />
      <SecondSeason />
      <Conclusion />
    </div>
  );
};

export default Historia;
