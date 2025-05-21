export const animatedWordsVariants = {
  hidden: {
    opacity: 0,
    transform: "translateY(30px) rotateY(20deg) rotateX(-15deg)",
    transformOrigin: "50% 50% -100px !important",
  },
  visible: {
    opacity: 1,
    transform: "translateY(0px) rotateY(0deg) rotateX(0deg)",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
