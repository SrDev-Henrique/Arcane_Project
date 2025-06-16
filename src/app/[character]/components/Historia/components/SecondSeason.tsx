import { JourneyItem } from "@/types/CharacterTypes";
import RenderCharacterData from "./RenderCharacterData/RenderCharacterData";

const page = ({
  secondSeason,
  theme,
}: {
  secondSeason: JourneyItem[];
  theme: string;
}) => {
  return (
    <div>
      <RenderCharacterData
        subject={secondSeason}
        theme={theme}
        title="Temporada 2"
      />
    </div>
  );
};

export default page;
