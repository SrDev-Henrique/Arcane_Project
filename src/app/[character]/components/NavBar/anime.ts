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
      delay: isFirstLoad ? 1.6 : 0,
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

export const songContainerVariants = {
  hidden: {
    maskImage: "linear-gradient(to right, white 0%, transparent 50%)",
    opacity: 0,
  },
  visible: {
    willChange: "mask-image",
    maskImage: "linear-gradient(to right, white 100%, transparent 100%)",
    opacity: 1,
    transition: {
      opacity: {
        delay: 0.5,
        duration: 1.5,
        ease: [0.76, 0, 0.24, 1],
      },
      maskImage: {
        delay: 0.7,
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  },
};
