import { JourneyItem } from "@/types/CharacterTypes";
import RenderCharacterData from "./RenderCharacterData/RenderCharacterData";
import { sectionRefs } from "@/utils/sectionRefs";

const page = ({
  secondSeason,
  theme,
}: {
  secondSeason: JourneyItem[];
  theme: string;
}) => {
  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["Temporada 2"] = el as HTMLElement;
      }}
    >
      <RenderCharacterData
        subject={secondSeason}
        theme={theme}
        title="Temporada 2"
      />
    </section>
  );
};

export default page;
