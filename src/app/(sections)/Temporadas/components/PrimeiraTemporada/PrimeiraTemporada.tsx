import { sectionRefs } from "@/utils/sectionRefs";
import React from 'react'

const PrimeiraTemporada = () => {
  return (
    <section
      ref={(el) => {
        if (el)
          sectionRefs.current["temporadas-temporada 1"] = el as HTMLElement;
      }}
    ></section>
  );
}

export default PrimeiraTemporada
