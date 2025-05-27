"use client";

import styles from "./Personagens.module.scss";
import { sectionRefs } from "@/utils/sectionRefs";
import Intro from "./components/Intro/Intro";

const Personagens = () => {
  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["piltover-personagens"] = el as HTMLElement;
          }}
          className={styles.container}
      >
          <Intro />
    </section>
  );
}

export default Personagens
