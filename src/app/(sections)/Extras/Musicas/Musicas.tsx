"use client";

import { sectionRefs } from "@/utils/sectionRefs";
import styles from "./Musicas.module.scss";
import RenderExtra from "@/components/RenderExtra/RenderExtra";

const musicasTitle = [
  "Arcane | Enemy - Imagine Dragons, JID",
  "Twenty One Pilots - 'The Line'",
  "Stromae, Pomme - 'Ma Meilleure Ennemie'",
  "Welcome to the Playground - Bea Miller",
];

const sources = ["kIiOIUz0b5k", "E2Rj2gQAyPA", "j-RpvIuazmc", "pzFnYYXsKtw"];

const Musicas = () => {
  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["extras-músicas"] = el as HTMLElement;
      }}
      className={styles.container}
    >
      <RenderExtra
        subject="Músicas"
        extraTitles={musicasTitle}
        sources={sources}
      />
    </section>
  );
};

export default Musicas;
