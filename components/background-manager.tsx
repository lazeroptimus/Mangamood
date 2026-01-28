"use client"

import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface BackgroundManagerProps {
  accentColor: string
  isDark: boolean
  isPreviewOpen: boolean
}

export function BackgroundManager({ accentColor, isDark, isPreviewOpen }: BackgroundManagerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Pause/resume background video based on preview state
  useEffect(() => {
    if (videoRef.current) {
      if (isPreviewOpen) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch(() => {
          // Autoplay may be blocked, that's ok
        })
      }
    }
  }, [isPreviewOpen])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Universal Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: isDark ? 0.7 : 0.25 }}
      >
        <source src="/videos/bg-universal.mp4" type="video/mp4" />
      </video>

      {/* Animated gradient background overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={accentColor}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
          style={{
            background: isDark
              ? `radial-gradient(ellipse at 50% 0%, ${accentColor}15 0%, transparent 50%),
                 radial-gradient(ellipse at 80% 80%, ${accentColor}10 0%, transparent 40%),
                 radial-gradient(ellipse at 20% 60%, rgba(6, 182, 212, 0.05) 0%, transparent 40%),
                 linear-gradient(to bottom, rgba(11, 15, 25, 0.6) 0%, rgba(11, 15, 25, 0.75) 100%)`
              : `radial-gradient(ellipse at 50% 0%, ${accentColor}10 0%, transparent 50%),
                 linear-gradient(to bottom, rgba(248, 250, 252, 0.9) 0%, rgba(226, 232, 240, 0.95) 100%)`
          }}
        />
      </AnimatePresence>

      {/* Animated particles/orbs for night mode */}
      {isDark && (
        <>
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: `${accentColor}20`,
              top: "10%",
              left: "10%"
            }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 80, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: "rgba(6, 182, 212, 0.15)",
              bottom: "20%",
              right: "15%"
            }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full blur-3xl"
            animate={{
              x: [0, 60, 0],
              y: [0, -60, 0]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: "rgba(236, 72, 153, 0.1)",
              top: "50%",
              right: "30%"
            }}
          />
        </>
      )}

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Dark overlay for video effect */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundColor: isDark ? "rgba(11, 15, 25, 0.2)" : "rgba(255, 255, 255, 0.1)"
        }}
      />

      {/* Grid pattern */}
      {isDark && (
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${accentColor}40 1px, transparent 1px),
                              linear-gradient(90deg, ${accentColor}40 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
          }}
        />
      )}
    </div>
  )
}
