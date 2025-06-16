import { JourneyItem } from "@/types/CharacterTypes";
import RenderCharacterData from "./RenderCharacterData/RenderCharacterData";

const Conclusion = ({
  conclusion,
  theme,
}: {
  conclusion: JourneyItem[];
  theme: string;
}) => {
  return (
    <div>
      <RenderCharacterData
        subject={conclusion}
        theme={theme}
        title="Conclusão"
      />
    </div>
  );
};

export default Conclusion;
