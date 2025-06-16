import { JourneyItem } from "@/types/CharacterTypes";
import RenderCharacterData from "./RenderCharacterData/RenderCharacterData";

const FirstSeason = ({
  firstSeason,
  theme,
}: {
  firstSeason: JourneyItem[];
  theme: string;
}) => {
  return (
    <div>
      <RenderCharacterData
        subject={firstSeason}
        theme={theme}
        title="Temporada 1"
      />
    </div>
  );
};

export default FirstSeason;
