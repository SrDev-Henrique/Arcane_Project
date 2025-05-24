"use client";

import styles from "./Apresentacao.module.scss";
import { sectionRefs } from "@/utils/sectionRefs";
import Cardinnertext from "./components/Cardinnertext/Cardinnertext";
import Cardtextaside from "./components/Cardtextaside/Cardtextaside";
import { AnimatedText } from "@/components/AnimatedText/AnimatedText";

const Apresentacao = () => {
  return (
    <section
      ref={(el) => {
        if (el)
          sectionRefs.current["piltover-apresentação"] = el as HTMLElement;
      }}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.titleContainer}>
            <div className={styles.subTitle}>
              <AnimatedText
                text="A cidade do progresso"
                stagger={0.01}
                scale={0.2}
              />
            </div>
            <div className={styles.title}>
              <AnimatedText text="Piltover" stagger={0.01} scale={0.2} />
            </div>
          </div>
          <div className={styles.firstCardInnerContainer}>
            <Cardinnertext
              image="/images/arcane_piltover/cardinner-1.webp"
              alt="piltover"
              text="Piltover é uma metrópole brilhante e avançada, famosa por sua inovação tecnológica e arquitetura deslumbrante. É o centro global do comércio e da ciência, onde a riqueza e o poder são evidentes em suas torres reluzentes e pontes majestosas."
            />
          </div>
          <div className={styles.firstCardAsideContainer}>
            <Cardtextaside
              image="/images/arcane_piltover/cardaside-1.webp"
              alt="piltover cultura"
              text="A cidade é governada por um conselho de clãs poderosos e famílias influentes, que valorizam a ordem, a educação e o progresso. A elite de Piltover vive em luxo, enquanto os cidadãos comuns buscam oportunidades para prosperar."
              title="Cultura"
            />
          </div>
          <div className={styles.secondCardAsideContainer}>
            <Cardtextaside
              image="/images/arcane_piltover/cardaside-2.webp"
              alt="piltover tradição"
              text="Piltover é conhecida por sediar eventos grandiosos, como a Exposição do Progresso, onde inventores apresentam suas criações mais impressionantes. Esses eventos atraem pessoas de todo o mundo, consolidando a cidade como um símbolo de excelência e ambição."
              title="Tradição"
              reverse
            />
          </div>
          <div className={styles.secondCardInnerContainer}>
            <Cardinnertext
              image="/images/arcane_piltover/cardinner-2.webp"
              alt="piltover tecnologia"
              text="Piltover é o berço da Hextech, uma fusão de magia e tecnologia que revolucionou o mundo. A cidade é um símbolo de inovação, mas também de desigualdade, já que seu progresso depende de recursos extraídos de Zaun."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Apresentacao;
