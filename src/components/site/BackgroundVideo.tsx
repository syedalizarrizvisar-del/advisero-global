"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function BackgroundVideo() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [0, -300]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 1000], [0.02, 0.01]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-100/20 via-slate-50/10 to-blue-50/20 blur-3xl"
      />
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-l from-slate-100/15 via-blue-50/10 to-slate-50/20 blur-3xl"
      />
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full bg-gradient-to-t from-blue-50/15 via-slate-100/10 to-blue-100/20 blur-3xl"
      />
    </div>
  );
}