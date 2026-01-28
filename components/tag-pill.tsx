"use client"

import { motion } from "framer-motion"

interface TagPillProps {
  tag: string
  isSelected: boolean
  isDark: boolean
  onClick: () => void
  index: number
}

export function TagPill({ tag, isSelected, isDark, onClick, index }: TagPillProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 border ${
        isSelected
          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg"
          : isDark
          ? "bg-white/5 text-white/70 border-white/20 hover:bg-white/10 hover:text-white"
          : "bg-black/5 text-black/70 border-black/10 hover:bg-black/10 hover:text-black"
      }`}
      style={{
        boxShadow: isSelected ? "0 0 20px rgba(168, 85, 247, 0.4)" : "none"
      }}
    >
      #{tag}
    </motion.button>
  )
}
