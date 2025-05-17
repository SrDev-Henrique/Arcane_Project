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