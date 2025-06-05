import { sectionRefs } from "@/utils/sectionRefs";
import React from "react";
import Seasons from "../Seasons/Seasons";

const SegundaTemporada = () => {
  return (
    <section
      ref={(el) => {
        if (el)
          sectionRefs.current["temporadas-temporada 2"] = el as HTMLElement;
      }}
    >
      <Seasons season="Temporada_2" text="Temporada 2" href="/temporada_2" />
    </section>
  );
};

export default SegundaTemporada;
