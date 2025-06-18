"use client";

import RenderExtra from "@/components/RenderExtra/RenderExtra";
import styles from "./Promocionais.module.scss";
import { sectionRefs } from "@/utils/sectionRefs";

const promosTitle = [
  "Arcane - Trailer oficial",
  "Arcane: Último trailer",
  "Acane: 2ª Temporada | Trailer oficial",
];

const sources = ["4Ps6nV4wiCE", "32oT-CWJOC0", "g-6g2uEjF1s"];

const Promocionais = () => {
  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["extras-promocionais"] = el as HTMLElement;
      }}
      className={styles.container}
    >
     <RenderExtra subject="Promocionais" extraTitles={promosTitle} sources={sources} netflix />
    </section>
  );
};

export default Promocionais;
