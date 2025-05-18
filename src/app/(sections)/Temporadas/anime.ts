export const seasonVariants = {
  closed: {
    clipPath: "polygon(20% 25%, 80% 30%, 80% 75%, 20% 75%)",
    transition: {
      duration: 1,
      ease: [0.65, 0, 0.35, 1],
    },
  },
  opened: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: {
      duration: 1,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

export const seasonImageVariants = {
  visible: {
    width: "90%",
    height: "90%",
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.65, 0, 0.35, 1],
    },
  },
  hidden: {
    width: "100%",
    height: "100%",
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

export const seasonFirstMaskVariants = {
  visible: {
    height: "100%",
    transition: {
      duration: 1,
      ease: [0.65, 0, 0.35, 1],
    },
  },
  hidden: {
    height: "0%",
    transition: {
      duration: 1,
      ease: [0.65, 0, 0.35, 1],
      delay: 0.1,
    },
  },
};

export const seasonSecondMaskVariants = {
  visible: {
    height: "100%",
    transition: {
      duration: 1,
      ease: [0.65, 0, 0.35, 1],
    },
  },
  hidden: {
    height: "0%",
    transition: {
      duration: 1,
      ease: [0.65, 0, 0.35, 1],
      delay: 0.2,
    },
  },
};

export const seasonTitleVariants = {
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.65, 0, 0.35, 1],
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: 1,
      ease: [0.65, 0, 0.35, 1],
      delay: 0.2,
    },
  },
};

export const titlesVariants = {
  initial: {
    y: 0,
  },
  enter: {
    y: -50,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.6 },
  },
  exit: {
    y: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
};

export const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemRevealVariants = {
  hidden: {
    y: "50%",
    scale: 0.5,
    opacity: 0,
    transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
  },
  visible: {
    y: "0%",
    scale: 1,
    opacity: 1,
    transition: { duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.5 },
  },
};

export const navVariants = {
  hidden: {
    scaleY: 0,
    transformOrigin: "top",
  },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.6,
    },
  },
};

export const closeButtonVariants = {
  hidden: {
    scaleY: 0,
    transformOrigin: "top",
    translateX: "-50%",
  },
  visible: {
    scaleY: 1,
    translateX: "-50%",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.6,
    },
  },
};

export const buttonVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.9,
    },
  },
};

export const episodesContainerVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
      delay: 1,
    },
  },
};

export const currentEpisodeVariants = {
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const prevEpisodeVariants = {
  hidden: {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const nextEpisodeVariants = {
  hidden: {
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const highlightInfoVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.65, 0, 0.35, 1],
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

export const highlightItemVariants = {
  inactive: {
    scale: 0.85,
    transition: {
      duration: 0.6,
      ease: [0.65, 0, 0.35, 1],
    },
  },
  active: {
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

export const navContainerVariants = {
  hidden: {
    opacity: 0,
    right: "50%",
    transform: "translateX(50%) translateY(-100%)",
    transition: {
      opacity: {
        duration: 1,
        ease: [0.65, 0, 0.35, 1],
      },
      transform: {
        duration: 1,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  },

  visible: {
    opacity: 1,
    right: "50%",
    transform: "translateX(50%) translateY(0)",
    transition: {
      opacity: {
        duration: 1,
        ease: [0.65, 0, 0.35, 1],
      },
      transform: {
        duration: 1,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  },
};