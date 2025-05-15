"use client";

import { sectionRefs } from "@/utils/sectionRefs";
import React, { createContext, useContext, useEffect, useState } from "react";

interface MenuContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  isAudioOn: boolean;
  setIsAudioOn: (isOn: boolean) => void;
  isSeasonActive: boolean;
  setIsSeasonActive: (isActive: boolean) => void;
  activeSeason: string;
  setActiveSeason: (season: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isSeasonActive, setIsSeasonActive] = useState(false);
  const [activeSeason, setActiveSeason] = useState("");
    
    useEffect(() => {
        if (!isSeasonActive) return;
        const currentSeason = activeSeason === "Temporada_1" ? sectionRefs.current["temp<b>o</b>radas-temporada 1"] : sectionRefs.current["temp<b>o</b>radas-temporada 2"];
        const scrollIntoView = () => {
            currentSeason.scrollIntoView({ behavior: "instant" });
        }

        window.addEventListener("resize", scrollIntoView);

        return () => {
            window.removeEventListener("resize", scrollIntoView);
        }
    }, [isSeasonActive, activeSeason]);

  return (
    <MenuContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        isAudioOn,
        setIsAudioOn,
        isSeasonActive,
        setIsSeasonActive,
        activeSeason,
        setActiveSeason,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu precisa ser usado dentro de um MenuProvider");
  }
  return context;
};
