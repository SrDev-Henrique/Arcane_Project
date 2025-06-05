// utils/useScrollRestoration.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    const saved = sessionStorage.getItem(`scrollPos:${pathname}`);

    if (saved !== null) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(saved, 10));
      }, 0);
    }
  }, [pathname]);
}
