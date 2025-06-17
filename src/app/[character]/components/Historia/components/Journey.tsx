import { JourneyItem } from "@/types/CharacterTypes";
import RenderCharacterData from "./RenderCharacterData/RenderCharacterData";
import { sectionRefs } from "@/utils/sectionRefs";

const page = ({
  jornada,
  theme,
}: {
  jornada: JourneyItem[];
  theme: string;
}) => {
  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["Jornada"] = el as HTMLElement;
      }}
      style={{
        marginTop: "20vh",
      }}
    >
      <RenderCharacterData subject={jornada} theme={theme} title="Jornada" />
    </section>
  );
};

export default page;
