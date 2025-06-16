export const imageVariants = {
  hidden: {
    opacity: 0,
    clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
    scale: 1.3,
  },
  visible: {
    opacity: 1,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      scale: {
        duration: 0.9,
        ease: "easeInOut",
      },
    },
  },
};
