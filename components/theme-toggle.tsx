"use client"

import { motion } from "framer-motion"

interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  // return (
  //   // <motion.button
  //   //   initial={{ opacity: 0, y: -20 }}
  //   //   animate={{ opacity: 1, y: 0 }}
  //   //   transition={{ duration: 0.5, delay: 0.2 }}
  //   //   onClick={onToggle}
  //   //   className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md border transition-all duration-300"
  //   //   style={{
  //   //     backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
  //   //     borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"
  //   //   }}
  //   // >
  //   //   {/* <span className={`text-xs font-medium tracking-wider uppercase ${isDark ? "text-white/70" : "text-black/70"}`}>
  //   //     Atmosphere
  //   //   </span> */}
  //   //   <div className="relative w-14 h-7 rounded-full p-1" style={{
  //   //     backgroundColor: isDark ? "rgba(124, 58, 237, 0.3)" : "rgba(251, 191, 36, 0.3)"
  //   //   }}>
  //   //     <motion.div
  //   //       className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
  //   //       animate={{ x: isDark ? 0 : 28 }}
  //   //       transition={{ type: "spring", stiffness: 500, damping: 30 }}
  //   //       style={{
  //   //         backgroundColor: isDark ? "#7C3AED" : "#FBBF24",
  //   //         boxShadow: isDark ? "0 0 20px #7C3AED" : "0 0 20px #FBBF24"
  //   //       }}
  //   //     >
  //   //       {isDark ? "🌙" : "☀️"}
  //   //     </motion.div>
  //   //   </div>
  //   // </motion.button>
  // )
}
