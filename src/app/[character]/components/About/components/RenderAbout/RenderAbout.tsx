import Image from "next/image";
import styles from "./RenderAbout.module.scss";
import { AboutBlock } from "@/types/CharacterTypes";
import classNames from "classnames";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const RenderAbout = ({
  item,
  setActiveTrace,
  setIsTransitioning,
  trace,
  theme,
  currentIndex,
  setCurrentIndex,
}: {
  item: AboutBlock;
  setActiveTrace: (trace: string) => void;
  setIsTransitioning: (isTransitioning: boolean) => void;
  trace: string;
  theme: string;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) => {
  const { src, title: titles, content } = item;

  const handleNextClick = async () => {
    setActiveTrace(trace);
    setIsTransitioning(true);
    await sleep(600);
    setCurrentIndex(0);
    await sleep(1400);
    setIsTransitioning(false);
  };

  return (
    <div className={styles.container}>
      <div
        className={classNames(
          styles.content,
          theme === "zaun" ? styles.dark : ""
        )}
      >
        {titles.map((title, index) => (
          <div
            style={{ opacity: index === currentIndex ? 1 : 0 }}
            className={classNames(
              styles.aboutContent,
              theme === "zaun" ? styles.dark : ""
            )}
            key={title}
          >
            <div className={styles.imageDiv}>
              <div className={styles.imageContainer}>
                <Image
                  src={src[index]}
                  alt={title}
                  width={736}
                  height={1308}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            </div>
            <div className={styles.textDiv}>
              <div className={styles.titleContainer}>
                <h1>{title}</h1>
              </div>
              <div className={styles.contentContainer}>
                <p>{content[index]}</p>
              </div>
            </div>
          </div>
        ))}
        <div className={styles.nextTrace}>
          <p>Próximo:</p>
          <button onClick={handleNextClick}>{trace}</button>
        </div>
      </div>
    </div>
  );
};

export default RenderAbout;
