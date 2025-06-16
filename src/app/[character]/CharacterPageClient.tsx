"use client";

import { CharacterData } from "@/types/CharacterTypes";

import styles from "./Page.module.scss";

import { notFound } from "next/navigation";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import CharactersNavBar from "./components/NavBar/NavBar";
import { useState } from "react";
import Historia from "./components/Historia/Historia";

interface Props {
  characterKey: string;
  data: CharacterData;
}

const navItems = ["perfil", "sobre", "história"];

export default function CharacterPageClient({ characterKey, data }: Props) {
  const [activeTab, setActiveTab] = useState("perfil");

  if (!data) {
    return notFound();
  }

  return (
    <main
      key={characterKey}
      className={styles.container}
      style={{
        backgroundColor: data.theme === "zaun" ? "#0a0a0a" : "#ead8c0",
      }}
    >
      <CharactersNavBar
        color={data.color}
        tabs={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={data.theme}
        playlist={data.playlist}
        name={data.name}
        lastName={data.lastName}
      />
      <Hero
        color={data.color}
        activeTab={activeTab}
        name={data.name}
        lastName={data.lastName}
        heroImage={data.heroImage}
        theme={data.theme}
        quote={data.quote}
        description={data.description}
      />
      <About
        activeTab={activeTab}
        color={data.color}
        theme={data.theme}
        personalidade={data.personalidade}
        aparencia={data.aparencia}
        habilidades={data.habilidades}
        name={data.name}
      />
      <Historia
        activeTab={activeTab}
        jornada={data.jornada}
        theme={data.theme}
        firstSeason={data.temporada1}
        secondSeason={data.temporada2}
        conclusion={data.conclusion}
      />
    </main>
  );
}
