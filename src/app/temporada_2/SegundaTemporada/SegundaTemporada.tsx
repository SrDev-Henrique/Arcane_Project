"use client";

import styles from "./SegundaTemporada.module.scss";
import RenderSeasons from "../../(sections)/Temporadas/components/RenderSeasons/RenderSeasons";

const SegundaTemporada = () => {
  const temporada = "Temporada_2";

  return (
    <main className={styles.container}>
      <RenderSeasons temporada={temporada} />
    </main>
  );
};

export default SegundaTemporada;
