"use client";

import { sectionRefs } from "@/utils/sectionRefs";
import Intro from "./components/Intro/Intro";

const Personagens = () => {
  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["zaun-personagens"] = el as HTMLElement;
      }}
      >
          <Intro />
    </section>
  );
}

export default Personagens
