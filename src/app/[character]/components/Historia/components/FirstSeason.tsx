import { JourneyItem } from "@/types/CharacterTypes";
import RenderCharacterData from "./RenderCharacterData/RenderCharacterData";
import { sectionRefs } from "@/utils/sectionRefs";

const FirstSeason = ({
  firstSeason,
  theme,
}: {
  firstSeason: JourneyItem[];
  theme: string;
}) => {
  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["Temporada 1"] = el as HTMLElement;
      }}
    >
      <RenderCharacterData
        subject={firstSeason}
        theme={theme}
        title="Temporada 1"
      />
    </section>
  );
};

export default FirstSeason;
