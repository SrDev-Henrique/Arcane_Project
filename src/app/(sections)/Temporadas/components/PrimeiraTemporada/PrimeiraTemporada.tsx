"use client";

import styles from "./PrimeiraTemporada.module.scss";

import { sectionRefs } from "@/utils/sectionRefs";
import RenderSeasons from "../RenderSeasons/RenderSeasons";


const PrimeiraTemporada = () => {
  const temporada = "Temporada_1";

  return (
    <section
      ref={(el) => {
        if (el)
          sectionRefs.current["temporadas-temporada 1"] =
            el as HTMLElement;
      }}
      className={styles.container}
    >
      <RenderSeasons
        temporada={temporada}
      />
    </section>
  );
};

export default PrimeiraTemporada;
