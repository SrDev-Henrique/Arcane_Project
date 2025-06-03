import { sectionRefs } from "@/utils/sectionRefs";
import React from 'react'

const SegundaTemporada = () => {
  return (
    <section
      ref={(el) => {
        if (el)
          sectionRefs.current["temporadas-temporada 2"] = el as HTMLElement;
      }}
    ></section>
  );
}

export default SegundaTemporada
