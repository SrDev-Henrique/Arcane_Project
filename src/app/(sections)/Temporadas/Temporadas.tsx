"use client";

import dynamic from "next/dynamic";

const PrimeiraTemporada = dynamic(
  () => import("./components/PrimeiraTemporada/PrimeiraTemporada"),
  {
    ssr: false,
  }
);
const SegundaTemporada = dynamic(
  () => import("./components/SegundaTemporada/SegundaTemporada"),
  {
    ssr: false,
  }
);

const Temporadas = () => {
  return (
    <div>
      <PrimeiraTemporada />
      <SegundaTemporada />
    </div>
  );
};

export default Temporadas;
