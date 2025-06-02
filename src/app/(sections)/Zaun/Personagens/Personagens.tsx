"use client";

import styles from "./Personagens.module.scss";

import { sectionRefs } from "@/utils/sectionRefs";
import Intro from "./components/Intro/Intro";
import RenderCharsCard from "./components/RenderCharsCard/RenderCharsCard";

const Personagens = () => {
  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["zaun-personagens"] = el as HTMLElement;
      }}
      className={styles.container}
    >
      <Intro />
      <RenderCharsCard />
    </section>
  );
};

export default Personagens;
