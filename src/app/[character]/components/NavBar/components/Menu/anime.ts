export const tabsContainerVariants = {
  hidden: {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const menuButtonVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      delay: 1.5,
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
