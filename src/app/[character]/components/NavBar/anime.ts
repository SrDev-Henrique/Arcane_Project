export const musicDiscVariants = {
  hidden: {
    transform: "translateX(140%) rotate(180deg)",
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  visible: (isFirstLoad: boolean) => ({
    transform: "translateX(0) rotate(0deg)",
    opacity: 1,
    transition: {
      delay: isFirstLoad ? 2.3 : 0,
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

export const songContainerVariants = {
  hidden: {
    maskImage: "linear-gradient(to right, white 0%, transparent 50%)",
    WebkitMaskImage: "linear-gradient(to right, white 0%, transparent 50%)",
    opacity: 0,
  },
  visible: {
    willChange: "mask-image",
    maskImage: "linear-gradient(to right, white 100%, transparent 100%)",
    WebkitMaskImage: "linear-gradient(to right, white 100%, transparent 100%)",
    opacity: 1,
    transition: {
      opacity: {
        delay: 1.5,
        duration: 1.5,
        ease: [0.76, 0, 0.24, 1],
      },
      maskImage: {
        delay: 1.7,
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  },
};

export const navContainerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.5,
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
      delayChildren: 1.6,
      staggerChildren: 0.1,
    },
  },
};

export const buttonsVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
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