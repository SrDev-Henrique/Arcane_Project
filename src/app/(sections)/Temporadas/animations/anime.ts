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
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
  visible: {
    y: "0%",
    scale: 1,
    opacity: 1,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.6, },
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
      delay: 0.3,
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
      ease: [0.76, 0, 0.24, 1],
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const highlightItemVariants = {
  inactive: {
    scale: 0.85,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  active: {
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  }
}