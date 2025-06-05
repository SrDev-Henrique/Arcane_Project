const image1 = {
  hidden: {
    top: "51%",
    left: "49%",
    opacity: 0,
    filter: "brightness(.5)",
    transform: "translate(-50%, -50%)",
  },
  visible: {
    top: "10%",
    left: "5%",
    opacity: 0.9,
    filter: "brightness(.9)",
    transform: "translate(0%, 0%)",
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const image2 = {
  hidden: {
    top: "48%",
    left: "50%",
    opacity: 0,
    filter: "brightness(.5)",
    transform: "translate(-50%, -50%)",
  },
  visible: {
    top: "5%",
    left: "55%",
    opacity: 0.9,
    filter: "brightness(.9)",
    transform: "translate(-50%, 0%)",
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const image3 = {
  hidden: {
    top: "49%",
    right: "31%",
    opacity: 0,
    filter: "brightness(.5)",
    transform: "translate(-50%, -50%)",
  },
  visible: {
    top: "42%",
    right: "5%",
    opacity: 0.9,
    filter: "brightness(.9)",
    transform: "translate(5%, -50%)",
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const image4 = {
  hidden: {
    bottom: "15%",
    left: "52%",
    opacity: 0,
    filter: "brightness(.5)",
    transform: "translate(-50%, -50%)",
  },
  visible: {
    bottom: "18%",
    left: "11.5%",
    opacity: 0.9,
    filter: "brightness(.9)",
    transform: "translate(-20%, 0%)",
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const image5 = {
  hidden: {
    bottom: "15%",
    left: "50%",
    opacity: 0,
    filter: "brightness(.5)",
    transform: "translate(-50%, -50%)",
  },
  visible: {
    bottom: "5%",
    left: "50%",
    opacity: 0.9,
    filter: "brightness(.9)",
    transform: "translate(-50%, 0%)",
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const image6 = {
  hidden: {
    bottom: "15%",
    right: "30%",
    opacity: 0,
    filter: "brightness(.5)",
    transform: "translate(-50%, -50%)",
  },
  visible: {
    bottom: "5%",
    right: "10%",
    opacity: 0.9,
    filter: "brightness(.9)",
    transform: "translate(20%, 5%)",
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

export const imageList = [image1, image2, image3, image4, image5, image6];

export const buttonVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};
