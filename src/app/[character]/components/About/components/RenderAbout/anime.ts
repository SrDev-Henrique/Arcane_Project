export const currentImageContainerVariants = {
  initial: {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  visible: (canAnimate: boolean) => ({
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: {
      delay: canAnimate ? 0 : 1.4,
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

export const prevImageContainerVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  hidden: {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const nextImageContainerVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  hidden: {
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const currentTextVariants = {
  initial: {
    opacity: 0,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  hidden: {
    opacity: 0,
    x: "0%",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  visible: {
    opacity: 1,
    x: "0%",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const prevTextVariants = {
  hidden: {
    opacity: 0,
    x: "-10%",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  visible: {
    opacity: 1,
    x: "0%",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const nextTextVariants = {
  hidden: {
    opacity: 0,
    x: "10%",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  visible: {
    opacity: 1,
    x: "0%",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
