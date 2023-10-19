"use client";
import { FC, ReactNode } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  return <ReactLenis root>{children}</ReactLenis>;
};

export default SmoothScroll;
