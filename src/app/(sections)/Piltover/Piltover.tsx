import Apresentacao from "./Apresentacao/Apresentacao";
import Historia from "./Historia/Historia";
import Outro from "./Outro/Outro";
import Personagens from "./Personagens/Personagens";

export default function Piltover() {
  return (
    <div>
      <Apresentacao />
      <Historia />
      <Personagens />
      <Outro />
    </div>
  );
}
