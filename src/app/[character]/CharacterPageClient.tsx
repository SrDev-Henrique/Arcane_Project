"use client";

import { CharacterData } from "@/types/CharacterTypes";

import styles from "./Page.module.scss";

import { notFound } from "next/navigation";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import CharactersNavBar from "./components/NavBar/NavBar";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import Historia from "./components/Historia/Historia";

import { isMobile } from "react-device-detect";

interface Props {
  characterKey: string;
  data: CharacterData;
}

const navItems = ["perfil", "sobre", "história"];

export default function CharacterPageClient({ characterKey, data }: Props) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const [activeTab, setActiveTab] = useState("perfil");

  useEffect(() => {
    if (!contentRef.current || isMobile) return;

    const localLenis = new Lenis({
      wrapper: contentRef.current,
      content: contentRef.current,
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

  if (!data) {
    return notFound();
  }

  return (
    <main
      key={characterKey}
      className={styles.container}
      style={{
        backgroundColor: data.theme === "zaun" ? "#0a0a0a" : "#ead8c0",
      }}
    >
      <CharactersNavBar
        color={data.color}
        tabs={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={data.theme}
        playlist={data.playlist}
        name={data.name}
        lastName={data.lastName}
      />
      <div className={styles.contentContainer}>
        <div ref={contentRef} className={styles.content}>
          <Hero
            color={data.color}
            activeTab={activeTab}
            name={data.name}
            lastName={data.lastName}
            heroImage={data.heroImage}
            theme={data.theme}
            quote={data.quote}
            description={data.description}
          />
          <About activeTab={activeTab} />
          <Historia activeTab={activeTab} />
        </div>
      </div>
    </main>
  );
}
