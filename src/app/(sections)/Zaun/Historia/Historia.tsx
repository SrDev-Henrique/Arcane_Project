"use client";

import { sectionRefs } from "@/utils/sectionRefs";
import styles from "./Historia.module.scss";
import { historia } from "./data";
import dynamic from "next/dynamic";

const RenderContent = dynamic(() => import("./RenderContent/RenderContent"), {
  ssr: false,
});

const Historia = () => {
  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["zaun-história"] = el as HTMLElement;
      }}
      className={styles.container}
    >
      <div className={styles.textContainer}>
        <h1>História</h1>
      </div>
      <div className={styles.contentContainer}>
        {historia.map((item, i) => {
          const { title, text } = item;
          return <RenderContent key={i} title={title} text={text} />;
        })}
      </div>
    </section>
  );
};

export default Historia;
