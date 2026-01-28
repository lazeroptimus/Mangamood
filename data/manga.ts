export interface Manga {
  id: string
  title: string
  type: "Manga" | "Manhwa"
  moods: string[]
  tags: string[]
  description: string
  accentColor: string
  previewVideo: string
}

export const mangaData: Manga[] = [
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    type: "Manhwa",
    moods: ["action", "heroic"],
    tags: ["underdog", "power awakening"],
    description: "From weakest to unstoppable.",
    accentColor: "#7C3AED",
    previewVideo: "/videos/preview-solo-leveling.mp4"
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    type: "Manga",
    moods: ["dark", "action"],
    tags: ["psychological", "rage"],
    description: "Devils, chaos, and heartbreak.",
    accentColor: "#EF4444",
    previewVideo: "/videos/preview-chainsaw-man.mp4"
  },
  {
    id: "your-lie-in-april",
    title: "Your Lie in April",
    type: "Manga",
    moods: ["emotional", "heartbroken"],
    tags: ["tragic", "bittersweet"],
    description: "Music that heals and breaks.",
    accentColor: "#F472B6",
    previewVideo: "/videos/preview-your-lie-in-april.mp4"
  },
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    type: "Manga",
    moods: ["dark", "mind-bending"],
    tags: ["revenge", "plot twist"],
    description: "Freedom has a price.",
    accentColor: "#DC2626",
    previewVideo: "/videos/preview-attack-on-titan.mp4"
  },
  {
    id: "one-punch-man",
    title: "One Punch Man",
    type: "Manga",
    moods: ["funny", "action"],
    tags: ["underdog", "power awakening"],
    description: "Too strong to feel alive.",
    accentColor: "#FBBF24",
    previewVideo: "/videos/preview-one-punch-man.mp4"
  },
  {
    id: "tower-of-god",
    title: "Tower of God",
    type: "Manhwa",
    moods: ["mind-bending", "heroic"],
    tags: ["plot twist", "psychological"],
    description: "Climb or be forgotten.",
    accentColor: "#06B6D4",
    previewVideo: "/videos/preview-tower-of-god.mp4"
  },
  {
    id: "vinland-saga",
    title: "Vinland Saga",
    type: "Manga",
    moods: ["dark", "emotional"],
    tags: ["revenge", "tragic"],
    description: "A warrior seeking peace.",
    accentColor: "#84CC16",
    previewVideo: "/videos/preview-vinland-saga.mp4"
  },
  {
    id: "spy-x-family",
    title: "Spy x Family",
    type: "Manga",
    moods: ["funny", "heartbroken"],
    tags: ["bittersweet", "underdog"],
    description: "A fake family, real love.",
    accentColor: "#EC4899",
    previewVideo: "/videos/preview-spy-x-family.mp4"
  },
  {
    id: "death-note",
    title: "Death Note",
    type: "Manga",
    moods: ["mind-bending", "dark"],
    tags: ["psychological", "plot twist"],
    description: "The power to judge lives.",
    accentColor: "#6366F1",
    previewVideo: "/videos/preview-death-note.mp4"
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    type: "Manga",
    moods: ["action", "emotional"],
    tags: ["revenge", "tragic"],
    description: "Breathe. Fight. Protect.",
    accentColor: "#14B8A6",
    previewVideo: "/videos/preview-demon-slayer.mp4"
  },
  {
    id: "the-beginning-after-the-end",
    title: "The Beginning After The End",
    type: "Manhwa",
    moods: ["heroic", "mind-bending"],
    tags: ["power awakening", "plot twist"],
    description: "A king reborn to rise again.",
    accentColor: "#8B5CF6",
    previewVideo: "/videos/preview-the-beginning-after-the-end.mp4"
  },
  {
    id: "naruto",
    title: "Naruto",
    type: "Manga",
    moods: ["heroic", "emotional"],
    tags: ["underdog", "bittersweet"],
    description: "Believe it. Never give up.",
    accentColor: "#F97316",
    previewVideo: "/videos/preview-naruto.mp4"
  }
]

export const moods = [
  { id: "heartbroken", label: "Heartbroken", emoji: "💔" },
  { id: "emotional", label: "Emotional", emoji: "😭" },
  { id: "mind-bending", label: "Mind-bending", emoji: "🧠" },
  { id: "funny", label: "Funny", emoji: "😂" },
  { id: "action", label: "Action", emoji: "⚔️" },
  { id: "heroic", label: "Heroic", emoji: "🦸" },
  { id: "dark", label: "Dark", emoji: "🩸" }
]

export const tags = [
  "revenge",
  "tragic",
  "power awakening",
  "plot twist",
  "underdog",
  "psychological",
  "rage",
  "bittersweet"
]
