"use client";

import { FaGithub, FaInstagram } from "react-icons/fa6";
import styles from "./Credits.module.scss";
import { MdOutlineEmail } from "react-icons/md";
import Link from "next/link";
import { useRef, useState } from "react";

const words = ["sr dev", "henrique"];

const links = [
  {
    href: "https://github.com/SrDev-Henrique",
    backgroundColor: "#0a0a0a",
    textColor: "#F0F0F0",
    color: "#c1c1ba",
    icon: <FaGithub />,
    label: "GitHub",
  },
  {
    href: "https://www.instagram.com/hick.slv/",
    backgroundColor: "#0a0a0a",
    textColor: "#FF4C4C",
    iconColor: "#FF4C4C",
    color: "#c1c1ba",
    icon: <FaInstagram />,
    label: "instagram",
  },
  {
    href: "mailto:halbuquerque2850@gmail.com?subject=Gostaria%20de%20montar%20um%20orçamento%20para%20um%20projeto",
    backgroundColor: "#0a0a0a",
    textColor: "#8f0b13",
    iconColor: "#8f0b13",
    color: "#c1c1ba",
    icon: <MdOutlineEmail />,
    label: "Email",
  },
];

const Credits = () => {
  const wordsContainerRef = useRef<HTMLDivElement | null>(null);

  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (wordsContainerRef.current) {
      const { left, top, width, height } =
        wordsContainerRef.current.getBoundingClientRect();

      const relativeX = (e.clientX - left) / width;
      const relativeY = (e.clientY - top) / height;

      const rotateX = (relativeY - 0.5) * -20;
      const rotateY = (relativeX - 0.5) * 20;

      const transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      setTransformStyle(transform);
    }
  };
  const handleMouseLeave = () => {
    setTransformStyle("");
  };
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={styles.container}
      style={{
        perspective: "1000px",
      }}
    >
      <div className={styles.content}>
        <div className={styles.topText}>
          <p>The end</p>
          <p>Desenvolvido Por</p>
        </div>
        <div
          ref={wordsContainerRef}
          style={{
            transform: transformStyle,
            transition: "all 0.3s ease-out",
            transformStyle: "preserve-3d",
            willChange: "transform",
            perspective: "1000px",
          }}
          className={styles.me}
        >
          {words.map((word, index) => (
            <div
              style={{
                textShadow: `
                1px 1px 0 #ff4c4c,
                2px 2px 2px #521c0d,
                3px 3px 2px #521c0d
              `,
                backfaceVisibility: "hidden",
              }}
              key={index}
            >
              <h1>{word}</h1>
            </div>
          ))}
        </div>
        <div className={styles.links}>
          {links.map((link, index) => (
            <Link
              href={link.href}
              target={"_blank"}
              key={index}
              className={styles.link}
            >
              <button
                style={{
                  backgroundColor: `${link.color}`,
                  color: `${link.backgroundColor}`,
                }}
                className={styles.firstButton}
              >
                <p className={styles.icon}>{link.icon}</p>
                <p className={styles.label}>{link.label}</p>
              </button>
              <button
                style={{
                  backgroundColor: `${link.backgroundColor}`,
                  color: `${link.color}`,
                }}
                className={styles.secondButton}
              >
                <p
                  style={{ color: `${link.iconColor}` }}
                  className={styles.icon}
                >
                  {link.icon}
                </p>
                <p
                  style={{ color: `${link.textColor}` }}
                  className={styles.label}
                >
                  {link.label}
                </p>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Credits;
