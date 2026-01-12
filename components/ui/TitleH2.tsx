"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface TitleH2Props {
  children: ReactNode;
  className?: string;
  color?: string;
}

export function TitleH2({ children, className = "", color }: TitleH2Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const baseStyles =
    "font-semibold uppercase font-benzin text-3xl lg:text-5xl text-center text-balance leading-tight";

  const style = color ? { color: color as string } : { color: "#000000" };

  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`${baseStyles} ${className}`}
      style={style}
    >
      {children}
    </motion.h2>
  );
}
