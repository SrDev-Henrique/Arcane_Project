// import { useEffect } from "react";

// export function useViewportHeight() {
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       requestAnimationFrame(() => {
//         const vh = window.innerHeight * 0.01;
//         document.documentElement.style.setProperty("--vh", `${vh}px`);
//       });

//       const handler = () => {
//         const vh = window.innerHeight * 0.01;
//         document.documentElement.style.setProperty("--vh", `${vh}px`);
//       };

//       window.addEventListener("resize", handler);
//       return () => window.removeEventListener("resize", handler);
//     }
//   }, []);
// }
