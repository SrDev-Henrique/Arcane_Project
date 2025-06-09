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
