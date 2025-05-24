// contexts/LenisContext.tsx
"use client";

import { createContext, useContext, useRef, useEffect } from "react";
import Lenis from "lenis";
import { useMenu } from "./GlobalContext";

type LenisContextType = {
  lenis: Lenis | null;
};

const LenisContext = createContext<LenisContextType>({
  lenis: null,
});

export const useLenis = () => useContext(LenisContext);

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const { isSeasonActive, isLoading } = useMenu();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 0,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      if (isSeasonActive || isLoading) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isSeasonActive, isLoading]);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
};
