export const quoteVariants = {
  hidden: {
    y: 100,
  },
  visible: {
    y: 0,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const nameVariants = {
  hidden: {
    y: 130,
  },
  visible: {
    y: 0,
    transition: {
      duration: 1.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const columnsImages = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const descriptionVariants = {
  hidden: {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)",
  },
  visible: (isFirstLoad: boolean) => ({
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: {
      delay: isFirstLoad ? 1.3 : 1,
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};
