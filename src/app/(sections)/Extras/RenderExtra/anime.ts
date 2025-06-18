export const imageOverlayVariants = {
  visible: {
    maskImage: "radial-gradient(circle at center, transparent 0%, white 0%)",
    filter: "brightness(1)",
    scale: 1,
    transition: {
      duration: 0.85,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  hidden: {
    maskImage:
      "radial-gradient(circle at center, transparent 100%, white 100%)",
    filter: "brightness(0)",
    scale: 1.3,
    transition: {
      duration: 0.85,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const imageVariants = {
  visible: {
    filter: "brightness(1)",
    transition: {
      duration: 0.85,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  hidden: {
    filter: "brightness(0.8)",
    transition: {
      duration: 0,
      delay: 0.85,
    },
  },
};
