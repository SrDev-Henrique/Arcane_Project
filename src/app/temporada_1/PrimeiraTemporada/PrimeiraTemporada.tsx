"use client";

import styles from "./PrimeiraTemporada.module.scss";
import RenderSeasons from "../../(sections)/Temporadas/components/RenderSeasons/RenderSeasons";

const PrimeiraTemporada = () => {
  const temporada = "Temporada_1";

  return (
    <main className={styles.container}>
      <RenderSeasons temporada={temporada} />
    </main>
  );
};

export default PrimeiraTemporada;
