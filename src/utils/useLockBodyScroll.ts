import { useLayoutEffect } from "react";

export default function useLockBodyScroll(locked: boolean) {
  useLayoutEffect(() => {

    if (locked) {
      document.body.style.touchAction = "none";
      document.body.setAttribute("data-lenis-prevent", "");
    } else {
      document.body.style.touchAction = "auto";
      document.body.removeAttribute("data-lenis-prevent");
    }

    return () => {
      document.body.style.touchAction = "auto";
      document.body.removeAttribute("data-lenis-prevent");
    };
  }, [locked]);
}
