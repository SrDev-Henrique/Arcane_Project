"use client";

import styles from "./Hero.module.scss";

import { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { isMobile } from "react-device-detect";

import Button from "@/components/Button/Button";

import { motion, useScroll, useTransform } from "framer-motion";
import { heroVideos } from "./anime";
// import { useMenu } from "@/contexts/GlobalContext";

const Hero = () => {
  // const { isLoading, setIsLoading } = useMenu();

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const targetRef = useRef<HTMLDivElement>(null);

  const totalVideos = 4;

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end center"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      "polygon(14% 0%, 72% 0%, 90% 90%, 5% 100%)",
    ]
  );

  const getVideoSrc = (index: number) =>
    `https://d3v6dicq4pzaym.cloudfront.net/clip-${index + 1}.mp4`;

  const handleNextVideo = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(upcomingVideoIndex);
    videoRefs.current[upcomingVideoIndex - 1]?.play();
    setTimeout(() => {
      setIsTransitioning(false);
      videoRefs.current[currentIndex - 1]!.currentTime = 0.5;
      videoRefs.current[currentIndex - 1]?.pause();
    }, 700);
  };

  const addToVideoRef = (el: HTMLVideoElement) => {
    if (el && !videoRefs.current.includes(el)) {
      videoRefs.current.push(el);
    }
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 6000);
  // }, [setIsLoading]);

  // useEffect(() => {
  //   if (isLoading) {
  //     document.body.classList.add("overflow-hidden");
  //   } else {
  //     document.body.classList.remove("overflow-hidden");
  //   }
  //   return () => {
  //     document.body.classList.remove("overflow-hidden");
  //   };
  // }, [isLoading]);

  return (
    <div style={{ backgroundColor: "#FFEBB7" }}>
      {/* {isLoading && (
        <div className={styles.loading}>
          <div className={styles.dots}>
            <div className={styles.threeBody__dot}></div>
            <div className={styles.threeBody__dot}></div>
            <div className={styles.threeBody__dot}></div>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressInner}></div>
          </div>
        </div>
      )} */}
      <motion.div style={{ clipPath }} className={styles.hero}>
        <div ref={targetRef} className={styles.videoContainer}>
          {isMobile ? (
            <div className={styles.videoContainer}>
              <div className={styles.video__item}>
                <video
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  src={getVideoSrc(1)}
                  playsInline
                  autoPlay
                  muted
                  loop
                  onEnded={handleNextVideo}
                />
              </div>
            </div>
          ) : (
            <div className={styles.videoContainer}>
              {Array.from({ length: totalVideos }).map((_, index) => (
                <motion.div
                  variants={heroVideos}
                  initial={`${
                    index + 1 === currentIndex
                      ? "initial"
                      : index + 1 === upcomingVideoIndex
                      ? "mini"
                      : "hidden"
                  }`}
                  animate={`${
                    index + 1 === currentIndex
                      ? "initial"
                      : index + 1 === upcomingVideoIndex
                      ? "mini"
                      : "hidden"
                  }`}
                  key={index}
                  className={`${styles.video__item} ${
                    index + 1 === upcomingVideoIndex ? styles.nextVideo : ""
                  }`}
                  whileHover={{
                    opacity: 1,
                  }}
                >
                  <video
                    ref={addToVideoRef}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    src={getVideoSrc(index)}
                    playsInline={index === 0}
                    autoPlay={index === 0}
                    muted
                    loop
                    poster={
                      index === 1
                        ? "/images/Temporadas/Temporada_2/episódio-7.webp"
                        : ""
                    }
                    onClick={handleNextVideo}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.heroInfo}>
          <header className={styles.cta} aria-label="Hero call to action">
            <h1 id="hero-heading">ARCANE</h1>
            <p className={styles.description}>
              Descubra o universo de Arcane. Clique no botão abaixo para
              conhecer esta série incrível.
            </p>
            <Button
              leftIcon={<TiLocationArrow />}
              title="Assista agora"
              variant="hero"
              onClick={() =>
                window.open("https://www.netflix.com/title/81435684", "_blank")
              }
            />
          </header>

          <aside className={styles.netflix} aria-label="Netflix brand logo">
            <h2>
              N<b>e</b>tflix
            </h2>
          </aside>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
