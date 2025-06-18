import styles from "./RenderExtra.module.scss";

import { AnimatedText } from "@/components/AnimatedText/AnimatedText";
import Image from "next/image";
import { useRef, useState } from "react";

import { motion } from "framer-motion";
import { imageOverlayVariants, imageVariants } from "./anime";
import AnimatedLine from "@/components/AnimatedLine";
import { isMobile } from "react-device-detect";
import { IoCloseSharp } from "react-icons/io5";

const RenderExtra = ({
  subject,
  netflix,
  extraTitles,
  sources,
}: {
  subject: string;
  netflix?: boolean;
  extraTitles: string[];
  sources: string[];
}) => {
  const iframeContainerRef = useRef<HTMLDivElement | null>(null);

  const [visibleCard, setVisibleCard] = useState(0);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isFrameVisible, setIsFrameVisible] = useState(false);

  const handlePlayVideo = (index: number) => {
    if (!iframeContainerRef.current || isFrameVisible) return;

    setIsFrameVisible(true);

    iframeContainerRef.current.innerHTML = "";

    const videoId = sources[index];

    const iframe = document.createElement("iframe");
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&cc_load_policy=1&hl=pt-BR`;
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.frameBorder = "0";

    iframeContainerRef.current.appendChild(iframe);
  };
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <AnimatedText text={subject} y={150} stagger={0.02} once />
      </div>
      <div className={styles.promoContainer}>
        {extraTitles.map((title, index) => (
          <div
            key={index}
            onClick={() => handlePlayVideo(index)}
            onMouseEnter={() => {
              setVisibleCard(index + 1);
              setIsCardVisible(true);
            }}
            onMouseLeave={() => {
              setVisibleCard(0);
              setIsCardVisible(false);
            }}
            className={styles.promo}
          >
            <div
              style={{
                filter:
                  isCardVisible && visibleCard === index + 1
                    ? "brightness(1) blur(0px)"
                    : isCardVisible && visibleCard !== index + 1
                    ? "brightness(0.5) blur(2px)"
                    : "brightness(1) blur(0px)",
                transition: "filter 0.3s ease-in-out",
              }}
              className={styles.promoCard}
            >
              <motion.div
                variants={imageVariants}
                initial="hidden"
                animate={visibleCard === index + 1 ? "visible" : "hidden"}
                className={styles.imageContainer}
              >
                <Image
                  src={`/images/${subject}/${subject}-${index + 1}.webp`}
                  alt={`${subject} - ${index + 1}`}
                  width={1080}
                  height={1080}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </motion.div>
              <motion.div
                variants={imageOverlayVariants}
                initial="visible"
                animate={visibleCard === index + 1 ? "hidden" : "visible"}
                className={styles.secondImageContainer}
              >
                <Image
                  src={`/images/${subject}/${subject}-${index + 1}.webp`}
                  alt={`${subject} - ${index + 1}`}
                  width={1080}
                  height={1080}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </motion.div>
              <div className={styles.details}>
                {netflix ? (
                  <h3 className={styles.netflix}>Netflix</h3>
                ) : (
                  <h3 className={styles.riot}>Riot</h3>
                )}
              </div>
            </div>
            <div className={styles.promoTitle}>
              <p
                style={{
                  color:
                    isCardVisible && visibleCard === index + 1
                      ? "#fff"
                      : isCardVisible && visibleCard !== index + 1
                      ? "#c1c1ba"
                      : "#c1c1ba",
                  transition: "color 0.3s ease-in-out",
                }}
              >
                {title}
              </p>
            </div>
            <AnimatedLine
              color="#fff"
              delay={isMobile ? 0 : index * 0.2}
              once
            />
          </div>
        ))}
      </div>
      <div
        style={{
          pointerEvents: isFrameVisible ? "auto" : "none",
          display: isFrameVisible ? "flex" : "none",
        }}
        className={styles.iframeContainer}
      >
        <div ref={iframeContainerRef} className={styles.iframe} />
        <div
          className={styles.closeButton}
          onClick={() => {
            if (iframeContainerRef.current) {
              iframeContainerRef.current.innerHTML = "";
              setIsFrameVisible(false);
            }
          }}
        >
          <IoCloseSharp />
          <p>Fechar</p>
        </div>
      </div>
    </div>
  );
};

export default RenderExtra;
