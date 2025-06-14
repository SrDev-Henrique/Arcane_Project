export const traceVariants1 = {
  initial: {
    opacity: 1,
    top: "50%",
    left: "50%",
    transform: "translateY(calc(-50% - 5rem)) translateX(-50%)",
    width: "min(90%, 900px)",
    transition: {
      delay: 1,
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
      opacity: {
        delay: 0.8,
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  },
  hidden: (delay: boolean) => ({
    opacity: 0,
    top: "50%",
    left: "50%",
    transform: "translateY(calc(-50% - 5rem)) translateX(-50%)",
    width: "min(90%, 900px)",
    transition: {
      delay: delay ? 0.6 : 0,
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
      opacity: {
        delay: 0,
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  }),
  active: {
    paddingLeft: "4.5rem",
    opacity: 1,
    top: "0%",
    left: "50%",
    transform: "translateY(calc(0% - 0rem)) translateX(-50%)",
    width: "min(100%, 935px)",
    transition: {
      delay: 0.8,
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
      opacity: {
        delay: 0.6,
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  },
};

export const traceVariants2 = {
  initial: {
    opacity: 1,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "min(90%, 900px)",
    transition: {
      delay: 1,
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
      opacity: {
        delay: 0.8,
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  },
  hidden: (delay: boolean) => ({
    opacity: 0,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "min(90%, 900px)",
    transition: {
      delay: delay ? 0.6 : 0,
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
      opacity: {
        delay: 0,
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  }),
  active: {
    paddingLeft: "4.5rem",
    opacity: 1,
    top: "0%",
    left: "50%",
    transform: "translate(-50%, 0%)",
    width: "min(100%, 935px)",
    transition: {
      delay: 0.8,
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
      opacity: {
        delay: 0.6,
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  },
};

export const traceVariants3 = {
  initial: {
    opacity: 1,
    top: "50%",
    left: "50%",
    transform: "translateY(calc(-50% + 5rem)) translateX(-50%)",
    width: "min(90%, 900px)",
    transition: {
      delay: 1,
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
      opacity: {
        delay: 0.8,
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  },
  hidden: (delay: boolean) => ({
    opacity: 0,
    top: "50%",
    left: "50%",
    transform: "translateY(calc(-50% + 5rem)) translateX(-50%)",
    width: "min(90%, 900px)",
    transition: {
      delay: delay ? 0.6 : 0,
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
      opacity: {
        delay: 0,
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  }),
  active: {
    paddingLeft: "4.5rem",
    opacity: 1,
    top: "0%",
    left: "50%",
    transform: "translateY(calc(0% + 0rem)) translateX(-50%)",
    width: "min(100%, 935px)",
    transition: {
      delay: 0.8,
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
      opacity: {
        delay: 0.6,
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  },
};

export const lineVariants = {
  active: {
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  hidden: {
    scaleX: 0,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const buttonVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1,
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const textVariants = {
  initial: {
    fontSize: "clamp(1rem, 1.3rem + 1.75vw, 2.8rem)",
    transition: {
      delay: 1,
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  active: {
    fontSize: "clamp(0.875rem, 1.1rem + 1.75vw, 2.2rem)",
    transition: {
      delay: 0.8,
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const containerVariants = {
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
      delay: 1.2,
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const tracesContainerVariants = {
  initial: {
    height: "60%",
    transition: {
      delay: 1,
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  active: {
    height: "95%",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
