"use client";

import { useState } from "react";

import { useEffect } from "react";

const enterFullscreen = () => {
  const el = document.documentElement;
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
};

const exitFullscreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen?.();
  } else if (document.fullscreenElement) {
    document.exitFullscreen?.();
  } else if (document.fullscreenElement) {
    document.exitFullscreen?.();
  }
};

export { enterFullscreen, exitFullscreen };

export function useFullscreenStatus() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    handleFullscreenChange();

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return isFullscreen;
}