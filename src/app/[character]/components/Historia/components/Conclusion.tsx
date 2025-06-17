import { JourneyItem } from "@/types/CharacterTypes";
import RenderCharacterData from "./RenderCharacterData/RenderCharacterData";
import { sectionRefs } from "@/utils/sectionRefs";

const Conclusion = ({
  conclusion,
  theme,
}: {
  conclusion: JourneyItem[];
  theme: string;
}) => {
  return (
    <section
      ref={(el) => {
        if (el)
          sectionRefs.current["Conclusão"] = el as HTMLElement;
      }}
    >
      <RenderCharacterData
        subject={conclusion}
        theme={theme}
        title="Conclusão"
      />
    </section>
  );
};

export default Conclusion;
