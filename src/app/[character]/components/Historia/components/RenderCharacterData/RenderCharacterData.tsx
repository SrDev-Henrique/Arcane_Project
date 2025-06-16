import { JourneyItem } from "@/types/CharacterTypes";
import styles from "./RenderCharacterData.module.scss";
import { AnimatedText } from "@/components/AnimatedText/AnimatedText";
import ImageDiv from "./components/ImageDiv/ImageDiv";
import TextDiv from "./components/TextDiv/TextDiv";
import classNames from "classnames";

const RenderCharacterData = ({
  subject,
  title,
  theme,
}: {
  subject: JourneyItem[];
  title: string;
  theme: string;
}) => {
  return (
    <section
      className={classNames(
        styles.container,
        theme === "zaun" ? styles.dark : ""
      )}
    >
      <div className={styles.titleContainer}>
        <AnimatedText
          text={title}
          blur={8}
          stagger={0.05}
          el={"h1"}
          once
        />
      </div>
      <div className={styles.contentContainer}>
        {subject.map((item, index) => {
          const { image, content, quote } = item;
          return (
            <div className={styles.content} key={index}>
              {image && (
                <ImageDiv
                  src={image}
                  title={title}
                  index={index}
                  quote={quote}
                  theme={theme}
                />
              )}
              <TextDiv content={content} theme={theme} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RenderCharacterData;
