import { JourneyItem } from "@/types/CharacterTypes";
import RenderCharacterData from "./RenderCharacterData/RenderCharacterData";

const page = ({
  jornada,
  theme,
}: {
  jornada: JourneyItem[];
  theme: string;
}) => {
  return (
    <div style={{
      marginTop: "20vh",
    }}>
      <RenderCharacterData subject={jornada} theme={theme} title="Jornada" />
    </div>
  );
};

export default page;
