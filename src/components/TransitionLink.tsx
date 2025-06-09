"use client";

import React, { ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { useTransitionRouter } from "next-view-transitions";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
  color?: string;
}

export const TransitionLink = ({
  children,
  href,
  color,
  ...props
}: TransitionLinkProps) => {
  const router = useTransitionRouter();

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (color) {
      document.body.style.backgroundColor = color;
    }

    e.preventDefault();

    const fromPath = window.location.pathname;
    const fromScrollY = window.scrollY;
    sessionStorage.setItem(`scrollPos:${fromPath}`, String(fromScrollY));

    router.push(href, {
      scroll: false,
      onTransitionReady: pageAnimation,
    });
  };

  return (
    <Link
      style={{ textDecoration: "none" }}
      onClick={handleTransition}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
};

const pageAnimation = () => {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        scale: 1,
        transform: "translateY(0)",
      },
      {
        opacity: 0.7,
        scale: 0.9,
        transform: "translateY(-50%)",
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
};
