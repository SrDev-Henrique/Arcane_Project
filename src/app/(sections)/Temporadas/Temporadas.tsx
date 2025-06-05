"use client";

import { AnimatedText } from "@/components/AnimatedText/AnimatedText";
import styles from "./Temporadas.module.scss";

import PrimeiraTemporada from "./components/PrimeiraTemporada/PrimeiraTemporada";
import SegundaTemporada from "./components/SegundaTemporada/SegundaTemporada";

const Temporadas = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <AnimatedText text="Temporadas" y={150} stagger={0.02} once />
      </div>
      <PrimeiraTemporada />
      <SegundaTemporada />
    </div>
  );
};

export default Temporadas;
