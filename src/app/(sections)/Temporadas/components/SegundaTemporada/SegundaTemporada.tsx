"use client";

import styles from "./SegundaTemporada.module.scss";

import { sectionRefs } from "@/utils/sectionRefs";
import RenderSeasons from "../RenderSeasons/RenderSeasons";

const SegundaTemporada = () => {
  const temporada = "Temporada_2";

  return (
    <section
      ref={(el) => {
        if (el)
          sectionRefs.current["temp<b>o</b>radas-temporada 2"] =
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

export default SegundaTemporada;
