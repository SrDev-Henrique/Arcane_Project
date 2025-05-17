// "use client";

// import styles from "./NavBar.module.scss";

// import { useEffect, useRef, useState } from "react";

// import Button from "../Button/Button";

// import { TiArrowSortedDown } from "react-icons/ti";
// import { TiArrowSortedUp } from "react-icons/ti";

// import { motion } from "framer-motion";
// import { navContainerVariants } from "@/animations/anime";

// import { enterFullscreen, exitFullscreen } from "@/hooks/useFullscreen";
// import { useWindowScroll } from "react-use";

// const NavBar = () => {
//   const [isAudioPlaying, setIsAudioPlaying] = useState(false);
//   const [isIndicatorActive, setIsIndicatorActive] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [isNavVisible, setIsNavVisible] = useState(true);

//   const audioElementRef = useRef<HTMLAudioElement | null>(null);
//   const navContainerRef = useRef<HTMLDivElement | null>(null);
//   const lastScrollYRef = useRef(0);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleAudioClick = () => {
//     setIsIndicatorActive(!isIndicatorActive);
//     setIsAudioPlaying(!isAudioPlaying);
//   };

//   const toggleFullScreen = () => {
//     setIsFullScreen(!isFullScreen);
//     if (isFullScreen) {
//       exitFullscreen();
//     } else {
//       enterFullscreen();
//     }
//   };

//   const { y: currentScrollY } = useWindowScroll();

//   useEffect(() => {
//     if (currentScrollY === 0) {
//       setIsNavVisible(true);
//       navContainerRef.current?.classList.remove(`${styles.floatingNav}`);
//     } else if (currentScrollY > lastScrollYRef.current) {
//       setIsNavVisible(false);
//       navContainerRef.current?.classList.add(`${styles.floatingNav}`);
//     } else if (currentScrollY < lastScrollYRef.current) {
//       setIsNavVisible(true);
//       navContainerRef.current?.classList.add(`${styles.floatingNav}`);
//     }
//     lastScrollYRef.current = currentScrollY;
//   }, [currentScrollY]);

//   useEffect(() => {
//     if (isAudioPlaying) {
//       audioElementRef.current?.play();
//     } else {
//       audioElementRef.current?.pause();
//     }
//   }, [isAudioPlaying]);

//   console.log(isNavVisible);

//   return (
//     <motion.div
//       variants={navContainerVariants}
//       initial={isNavVisible ? "visible" : "hidden"}
//       animate={isNavVisible ? "visible" : "hidden"}
//       ref={navContainerRef}
//       className={styles.container}
//     >
//       <header className={styles.header}>
//         <nav className={styles.nav}>
//           <div onClick={handleAudioClick} className={styles.navIconContainer}>
//             <button className={styles.songSwitcher}>
//               <div
//                 style={{
//                   background: "url(/images/jinx.webp)",
//                   backgroundSize: "contain",
//                   backgroundPosition: "center",
//                   width: "100%",
//                   height: "100%",
//                 }}
//               />
//             </button>
//             <audio
//               style={{ display: "none" }}
//               ref={audioElementRef}
//               src="/audio/loop.mp3"
//               loop
//             />
//             <div className={styles.indicatorLineContainer}>
//               {[1, 2, 3, 4].map((bar) => (
//                 <div
//                   key={bar}
//                   className={`${styles.indicatorLine} ${
//                     isIndicatorActive ? styles.active : ""
//                   }`}
//                   style={{ animationDelay: `${bar * 0.1}s` }}
//                 />
//               ))}
//             </div>
//           </div>
//           <div className={styles.menuSwitcher}>
//             <Button
//               title={isMenuOpen ? "Fechar" : "Menu"}
//               rightIcon={
//                 isMenuOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />
//               }
//               variant="default"
//               onClick={toggleMenu}
//             />
//           </div>
//         </nav>
//       </header>
//       <div onClick={toggleFullScreen} className={styles.fullScreenSwitcher}>
//         <div className={styles.fullScreenSwitcherTextContainer}>
//           <div className={`${styles.fullScreenSwitcherText} ${isFullScreen ? styles.active : ""}`}>
//             <span className={styles.transformText}>ativar</span>{" "}
//             <span className={styles.transformText}>desativar</span>{" "}
//           </div>
//           <p>modo tela cheia</p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };
// export default NavBar;
