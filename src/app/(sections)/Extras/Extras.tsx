"use client";

import React from "react";
import Promocionais from "./Promocionais/Promocionais";
import Musicas from "./Musicas/Musicas";
import styles from "./Extras.module.scss";

const Extras = () => {
  return (
    <div className={styles.container}>
      <Promocionais />
      <Musicas />
    </div>
  );
};

export default Extras;
