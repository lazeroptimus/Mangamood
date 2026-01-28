"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Play } from "lucide-react"
import type { Manga } from "@/data/manga"

interface MangaCardProps {
  manga: Manga
  isSelected: boolean
  isPreviewOpen: boolean
  previewMangaId: string | null
  isDark: boolean
  onClick: () => void
  onPreviewOpen: (mangaId: string) => void
  onPreviewClose: () => void
  index: number
}

export function MangaCard({
  manga,
  isSelected,
  isPreviewOpen,
  previewMangaId,
  isDark,
  onClick,
  onPreviewOpen,
  onPreviewClose,
  index
}: MangaCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isThisPreviewOpen = previewMangaId === manga.id

  // Handle video play/pause when preview opens/closes
  useEffect(() => {
    if (videoRef.current) {
      if (isThisPreviewOpen) {
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
  }, [isThisPreviewOpen])

  // If another preview is open, fade out this card
  const isHidden = isPreviewOpen && !isThisPreviewOpen

  return (
    <>
      {/* Regular Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: isHidden ? 0 : 1,
          y: isHidden ? 20 : 0,
          scale: isHidden ? 0.95 : 1
        }}
        transition={{ duration: 0.4, delay: isHidden ? 0 : index * 0.1 }}
        whileHover={!isPreviewOpen ? { y: -8 } : {}}
        className={`group relative rounded-2xl backdrop-blur-md border overflow-hidden transition-all duration-300 ${
          isSelected
            ? "ring-2 border-transparent"
            : isDark
            ? "border-white/10 hover:border-white/20"
            : "border-black/10 hover:border-black/20"
        } ${isHidden ? "pointer-events-none" : ""}`}
        style={{
          backgroundColor: isDark
            ? isSelected
              ? `${manga.accentColor}15`
              : "rgba(255, 255, 255, 0.03)"
            : isSelected
            ? `${manga.accentColor}10`
            : "rgba(0, 0, 0, 0.02)",
          ringColor: isSelected ? manga.accentColor : "transparent",
          boxShadow: isSelected
            ? `0 0 40px ${manga.accentColor}30, 0 0 80px ${manga.accentColor}15`
            : "none"
        }}
      >
        {/* Top accent bar */}
        <div
          className="h-1 w-full transition-all duration-300"
          style={{
            backgroundColor: isSelected
              ? manga.accentColor
              : isDark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.05)",
            boxShadow: isSelected ? `0 0 20px ${manga.accentColor}` : "none"
          }}
        />

        <div className="p-6">
          {/* Type badge */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
              style={{
                backgroundColor: isDark
                  ? `${manga.accentColor}30`
                  : `${manga.accentColor}20`,
                color: manga.accentColor
              }}
            >
              {manga.type}
            </span>
            <div className="flex gap-1">
              {manga.moods.slice(0, 2).map(mood => (
                <span
                  key={mood}
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isDark
                      ? "bg-white/10 text-white/60"
                      : "bg-black/5 text-black/60"
                  }`}
                >
                  {mood}
                </span>
              ))}
            </div>
          </div>

          {/* Title */}
          <h3
            className={`text-xl font-bold mb-2 tracking-tight ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {manga.title}
          </h3>

          {/* Description */}
          <p
            className={`text-sm mb-4 ${
              isDark ? "text-white/60" : "text-black/60"
            }`}
          >
            {manga.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {manga.tags.map(tag => (
              <span
                key={tag}
                className={`text-xs px-2 py-1 rounded-md ${
                  isDark
                    ? "bg-white/5 text-white/50 border border-white/10"
                    : "bg-black/5 text-black/50 border border-black/10"
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Button */}
<div className="flex justify-end">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => onPreviewOpen(manga.id)}
    className="px-4 py-3 rounded-xl font-semibold text-sm tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2"
    style={{
      backgroundColor: isDark
        ? "rgba(255,255,255,0.1)"
        : "rgba(0,0,0,0.05)",
      color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"
    }}
  >
    <Play className="w-4 h-4" />
    <span>Preview</span>
  </motion.button>
</div>

        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${manga.accentColor}20 0%, transparent 60%)`
          }}
        />
      </motion.div>

      {/* Preview Modal Overlay */}
      {isThisPreviewOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={onPreviewClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Expanded Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
            style={{
              backgroundColor: isDark ? "#0B0F19" : "#F8FAFC",
              boxShadow: `0 0 100px ${manga.accentColor}40, 0 0 200px ${manga.accentColor}20`
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onPreviewClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors"
              style={{
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)",
                color: isDark ? "#fff" : "#000"
              }}
            >
              <X className="w-6 h-6" />
              <span className="sr-only">Close preview</span>
            </motion.button>

            {/* Top accent bar */}
            <div
              className="h-1 w-full"
              style={{
                backgroundColor: manga.accentColor,
                boxShadow: `0 0 30px ${manga.accentColor}`
              }}
            />

            {/* Video Player */}
            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                controls
                playsInline
                className="w-full h-full object-contain"
              >
                <source src={manga.previewVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Neon border effect on video */}
              <div
                className="absolute inset-0 pointer-events-none border-2 rounded-none"
                style={{
                  borderColor: `${manga.accentColor}50`,
                  boxShadow: `inset 0 0 30px ${manga.accentColor}20`
                }}
              />
            </div>

            {/* Info Section */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
                    style={{
                      backgroundColor: `${manga.accentColor}30`,
                      color: manga.accentColor
                    }}
                  >
                    {manga.type}
                  </span>
                  <div className="flex gap-2">
                    {manga.moods.map(mood => (
                      <span
                        key={mood}
                        className={`text-xs px-2 py-1 rounded-full ${
                          isDark
                            ? "bg-white/10 text-white/60"
                            : "bg-black/5 text-black/60"
                        }`}
                      >
                        {mood}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <h3
                className={`text-2xl md:text-3xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-black"
                }`}
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {manga.title}
              </h3>

              <p
                className={`text-base mb-4 ${
                  isDark ? "text-white/70" : "text-black/70"
                }`}
              >
                {manga.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {manga.tags.map(tag => (
                  <span
                    key={tag}
                    className={`text-sm px-3 py-1 rounded-full ${
                      isDark
                        ? "bg-white/5 text-white/60 border border-white/10"
                        : "bg-black/5 text-black/60 border border-black/10"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
