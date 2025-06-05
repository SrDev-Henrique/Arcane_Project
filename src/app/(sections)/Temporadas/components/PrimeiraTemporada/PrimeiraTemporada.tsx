import { sectionRefs } from "@/utils/sectionRefs";
import React from "react";
import Seasons from "../Seasons/Seasons";

const PrimeiraTemporada = () => {
  return (
    <section
      ref={(el) => {
        if (el)
          sectionRefs.current["temporadas-temporada 1"] = el as HTMLElement;
      }}
    >
      <Seasons season="Temporada_1" text="Temporada 1" href="/temporada_1" />
    </section>
  );
};

export default PrimeiraTemporada;
