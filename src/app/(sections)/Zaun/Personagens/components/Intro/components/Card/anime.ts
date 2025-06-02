export const imagesVariants = {
  outOfView: {
    opacity: 0.5,
    filter: "blur(3px)",
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  inView: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};
