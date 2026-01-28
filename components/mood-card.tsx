"use client"

import { motion } from "framer-motion"

interface MoodCardProps {
  id: string
  label: string
  emoji: string
  isSelected: boolean
  isDark: boolean
  onClick: () => void
  index: number
}

export function MoodCard({ id, label, emoji, isSelected, isDark, onClick, index }: MoodCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 cursor-pointer overflow-hidden ${
        isSelected
          ? "ring-2 ring-purple-500 border-purple-500/50"
          : isDark
          ? "border-white/10 hover:border-white/30"
          : "border-black/10 hover:border-black/30"
      }`}
      style={{
        backgroundColor: isDark
          ? isSelected
            ? "rgba(124, 58, 237, 0.2)"
            : "rgba(255, 255, 255, 0.05)"
          : isSelected
          ? "rgba(124, 58, 237, 0.1)"
          : "rgba(0, 0, 0, 0.02)"
      }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isDark
            ? "radial-gradient(circle at center, rgba(124, 58, 237, 0.3) 0%, transparent 70%)"
            : "radial-gradient(circle at center, rgba(124, 58, 237, 0.1) 0%, transparent 70%)"
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <motion.span
          className="text-4xl"
          whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.4 }}
        >
          {emoji}
        </motion.span>
        <span
          className={`font-semibold tracking-wide text-sm uppercase ${
            isDark ? "text-white/90" : "text-black/80"
          }`}
        >
          {label}
        </span>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <motion.div
          layoutId="selectedMood"
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  )
}
