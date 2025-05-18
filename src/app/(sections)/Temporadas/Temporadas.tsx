import PrimeiraTemporada from "./components/PrimeiraTemporada/PrimeiraTemporada";
import SegundaTemporada from "./components/SegundaTemporada/SegundaTemporada";

const Temporadas = () => {
  return (
    <div>
      {Array.from({ length: 2 }).map((_, index) => (
        <div style={{ height: "100vh", width: "100vw", backgroundColor: "red" }} key={index}>{index}</div>
      ))}
      <PrimeiraTemporada />
      <SegundaTemporada />
    </div>
  );
};

export default Temporadas;
