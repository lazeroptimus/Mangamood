"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { BackgroundManager } from "@/components/background-manager"
import { MoodCard } from "@/components/mood-card"
import { MangaCard } from "@/components/manga-card"
import { TagPill } from "@/components/tag-pill"
import { mangaData, moods, tags } from "@/data/manga"

type Section = "landing" | "mood" | "tags" | "recommendations"

export default function MangaMood() {
  const [isDark, setIsDark] = useState(true)
  const [currentSection, setCurrentSection] = useState<Section>("landing")
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedManga, setSelectedManga] = useState<string | null>(null)
  const [previewMangaId, setPreviewMangaId] = useState<string | null>(null)

  const isPreviewOpen = previewMangaId !== null

  const handlePreviewOpen = (mangaId: string) => {
    setPreviewMangaId(mangaId)
  }

  const handlePreviewClose = () => {
    setPreviewMangaId(null)
  }

  // Get the accent color based on selected manga
  const accentColor = useMemo(() => {
    if (selectedManga) {
      const manga = mangaData.find(m => m.id === selectedManga)
      return manga?.accentColor || "#7C3AED"
    }
    return "#7C3AED"
  }, [selectedManga])

  // Filter manga based on mood and tags
  const filteredManga = useMemo(() => {
    let filtered = mangaData

    if (selectedMood) {
      filtered = filtered.filter(m => m.moods.includes(selectedMood))
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(m => 
        selectedTags.some(tag => m.tags.includes(tag))
      )
    }

    return filtered
  }, [selectedMood, selectedTags])

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId)
    setTimeout(() => setCurrentSection("tags"), 400)
  }

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleMangaSelect = (mangaId: string) => {
    setSelectedManga(mangaId === selectedManga ? null : mangaId)
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <main className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${isDark ? "dark" : ""}`}>
      <BackgroundManager accentColor={accentColor} isDark={isDark} isPreviewOpen={isPreviewOpen} />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {/* Landing Section */}
          {currentSection === "landing" && (
            <motion.section
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen flex flex-col items-center justify-center px-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center max-w-3xl"
              >
                {/* Logo/Title */}
                <motion.h1
                  className={`text-6xl md:text-8xl font-bold tracking-wider mb-6 ${
                    isDark ? "text-white" : "text-black"
                  }`}
                  style={{ 
                    fontFamily: "var(--font-orbitron)",
                    textShadow: isDark 
                      ? "0 0 60px rgba(124, 58, 237, 0.5), 0 0 120px rgba(124, 58, 237, 0.3)" 
                      : "none"
                  }}
                >
                  Manga
                  <span 
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent"
                    style={{
                      textShadow: "none"
                    }}
                  >
                    Mood
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className={`text-xl md:text-2xl mb-12 font-light tracking-wide ${
                    isDark ? "text-white/70" : "text-black/70"
                  }`}
                >
                  Stories that match your state of mind.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentSection("mood")}
                  className="group relative px-10 py-4 rounded-full text-white font-semibold text-lg tracking-wider uppercase overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED 0%, #EC4899 50%, #06B6D4 100%)",
                    boxShadow: "0 0 40px rgba(124, 58, 237, 0.4), 0 0 80px rgba(236, 72, 153, 0.2)"
                  }}
                >
                  <span className="relative z-10">Choose Your Mood</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.button>

                {/* Decorative elements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="mt-16 flex items-center justify-center gap-8"
                >
                  {["⚔️", "💔", "🧠", "🦸"].map((emoji, i) => (
                    <motion.span
                      key={emoji}
                      className="text-3xl opacity-40"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.4, 0.7, 0.4]
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.section>
          )}

          {/* Mood Selection Section */}
          {currentSection === "mood" && (
            <motion.section
              key="mood"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`text-4xl md:text-5xl font-bold mb-4 text-center ${
                  isDark ? "text-white" : "text-black"
                }`}
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                How are you feeling?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`text-lg mb-12 text-center ${
                  isDark ? "text-white/60" : "text-black/60"
                }`}
              >
                Select the mood that resonates with you right now
              </motion.p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl">
                {moods.map((mood, index) => (
                  <MoodCard
                    key={mood.id}
                    id={mood.id}
                    label={mood.label}
                    emoji={mood.emoji}
                    isSelected={selectedMood === mood.id}
                    isDark={isDark}
                    onClick={() => handleMoodSelect(mood.id)}
                    index={index}
                  />
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                onClick={() => setCurrentSection("landing")}
                className={`mt-12 text-sm tracking-wider uppercase ${
                  isDark ? "text-white/50 hover:text-white/80" : "text-black/50 hover:text-black/80"
                } transition-colors`}
              >
                ← Back to start
              </motion.button>
            </motion.section>
          )}

          {/* Tags Section */}
          {currentSection === "tags" && (
            <motion.section
              key="tags"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`text-4xl md:text-5xl font-bold mb-4 text-center ${
                  isDark ? "text-white" : "text-black"
                }`}
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                Refine Your Vibe
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`text-lg mb-12 text-center max-w-md ${
                  isDark ? "text-white/60" : "text-black/60"
                }`}
              >
                Select themes that interest you (optional)
              </motion.p>

              <div className="flex flex-wrap justify-center gap-3 max-w-2xl mb-12">
                {tags.map((tag, index) => (
                  <TagPill
                    key={tag}
                    tag={tag}
                    isSelected={selectedTags.includes(tag)}
                    isDark={isDark}
                    onClick={() => handleTagToggle(tag)}
                    index={index}
                  />
                ))}
              </div>

              <div className="flex gap-4">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  onClick={() => setCurrentSection("mood")}
                  className={`px-6 py-3 rounded-full text-sm font-medium tracking-wider uppercase border transition-all ${
                    isDark
                      ? "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                      : "border-black/20 text-black/70 hover:border-black/40 hover:text-black"
                  }`}
                >
                  ← Change Mood
                </motion.button>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentSection("recommendations")}
                  className="px-8 py-3 rounded-full text-white font-semibold text-sm tracking-wider uppercase"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                    boxShadow: "0 0 30px rgba(124, 58, 237, 0.4)"
                  }}
                >
                  Show Recommendations →
                </motion.button>
              </div>
            </motion.section>
          )}

          {/* Recommendations Section */}
          {currentSection === "recommendations" && (
            <motion.section
              key="recommendations"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen px-6 py-20"
            >
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isPreviewOpen ? 0.3 : 1, 
                    y: 0,
                    scale: isPreviewOpen ? 0.9 : 1
                  }}
                  transition={{ duration: 0.4 }}
                  className="text-center mb-12"
                >
                  <h2
                    className={`text-4xl md:text-5xl font-bold mb-4 ${
                      isDark ? "text-white" : "text-black"
                    }`}
                    style={{ fontFamily: "var(--font-orbitron)" }}
                  >
                    Your{" "}
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                      {moods.find(m => m.id === selectedMood)?.label}
                    </span>{" "}
                    Picks
                  </h2>
                  <motion.p 
                    animate={{ opacity: isPreviewOpen ? 0 : 1 }}
                    className={`text-lg ${isDark ? "text-white/60" : "text-black/60"}`}
                  >
                    {filteredManga.length} stories found for your mood
                  </motion.p>

                  {selectedTags.length > 0 && (
                    <motion.div 
                      animate={{ opacity: isPreviewOpen ? 0 : 1 }}
                      className="flex flex-wrap justify-center gap-2 mt-4"
                    >
                      {selectedTags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30"
                        >
                          #{tag}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </motion.div>

                {filteredManga.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredManga.map((manga, index) => (
                      <MangaCard
                        key={manga.id}
                        manga={manga}
                        isSelected={selectedManga === manga.id}
                        isPreviewOpen={isPreviewOpen}
                        previewMangaId={previewMangaId}
                        isDark={isDark}
                        onClick={() => handleMangaSelect(manga.id)}
                        onPreviewOpen={handlePreviewOpen}
                        onPreviewClose={handlePreviewClose}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                  >
                    <p className={`text-xl ${isDark ? "text-white/60" : "text-black/60"}`}>
                      No matches found. Try different filters!
                    </p>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex justify-center gap-4 mt-12"
                >
                  <button
                    onClick={() => setCurrentSection("tags")}
                    className={`px-6 py-3 rounded-full text-sm font-medium tracking-wider uppercase border transition-all ${
                      isDark
                        ? "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                        : "border-black/20 text-black/70 hover:border-black/40 hover:text-black"
                    }`}
                  >
                    ← Adjust Filters
                  </button>
                  <button
                    onClick={() => {
                      setCurrentSection("landing")
                      setSelectedMood(null)
                      setSelectedTags([])
                      setSelectedManga(null)
                    }}
                    className={`px-6 py-3 rounded-full text-sm font-medium tracking-wider uppercase border transition-all ${
                      isDark
                        ? "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                        : "border-black/20 text-black/70 hover:border-black/40 hover:text-black"
                    }`}
                  >
                    Start Over
                  </button>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
