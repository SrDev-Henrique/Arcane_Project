export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  initial: {
    opacity: 1,
    width: "126px",
    height: "38px",
    transition: {
      duration: 0.5,
      type: "spring",
    },
  },
  expanded: {
    opaity: 1,
    width: "136px",
    height: "48px",
    transition: {
      duration: 0.5,
      type: "spring",
    },
  },
};

export const navOptionsContainerVariants = {
  hidden: {
    height: "105px",
    width: "126px",
    scale: 0,
    borderRadius: "3rem",
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  visible: {
    height: "105px",
    width: "126px",
    scale: 1,
    borderRadius: "1rem",
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 9,
      stiffness: 100,
      restDelta: 0.001,
    },
  },
};

export const navOptionsVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  visible: (index: number) => ({
    opacity: 1,
    transition: {
      delay: 0.3 + index * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};
