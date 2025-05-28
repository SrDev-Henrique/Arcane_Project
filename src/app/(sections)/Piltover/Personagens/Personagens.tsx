"use client";

import styles from "./Personagens.module.scss";
import { sectionRefs } from "@/utils/sectionRefs";
import Intro from "./components/Intro/Intro";
import Chars from "./components/Chars/Chars";

const Personagens = () => {
  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["piltover-personagens"] = el as HTMLElement;
      }}
      className={styles.container}
    >
      <Intro />
      <Chars />
    </section>
  );
};

export default Personagens;
