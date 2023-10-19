"use client";

import React, { Children } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface RevealTextProps {
  children: React.ReactNode;
}

const RevealText: React.FC<RevealTextProps> = ({
  children,
}: RevealTextProps) => {
  const animation = {
    initial: { y: "100%" },
    enter: (i: number) => ({
      y: "0",
      transition: {
        duration: 0.25,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i,
      },
    }),
  };

  const { ref, inView } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.p
        variants={animation}
        initial="initial"
        animate={inView ? "enter" : ""}
      >
        {children}
      </motion.p>
    </div>
  );
};

export default RevealText;
