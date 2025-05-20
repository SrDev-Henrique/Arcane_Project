export const heroVideos = {
  initial: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    opacity: 1,
    scale: 1,
    zIndex: "5",
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  hidden: {
    clipPath: "polygon(55% 50%, 45% 50%, 45% 50%, 55% 50%)",
    transition: {
      delay: 0.7,
      duration: 0,
    },
  },
  mini: {
    clipPath: "polygon(75% 30%, 75% 80%, 25% 80%, 25% 30%)",
    opacity: 0.7,
    scale: 0.4,
    zIndex: "6",
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
