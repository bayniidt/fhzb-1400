import { cn } from "@/lib/utils"

type WebsiteLanguage = "zh" | "en"

export function websiteHeroTitleClassName(
  language: WebsiteLanguage,
  className?: string
) {
  return cn(
    "font-serif font-bold text-white tracking-tight drop-shadow-2xl",
    language === "zh"
      ? "text-5xl md:text-7xl lg:text-8xl"
      : "text-4xl leading-tight md:text-6xl lg:text-7xl",
    className
  )
}

export function websiteHeroSubtitleClassName(
  language: WebsiteLanguage,
  className?: string
) {
  return cn(
    "font-serif font-normal leading-relaxed text-white/90 drop-shadow-lg",
    language === "zh" ? "text-lg md:text-xl" : "text-base md:text-xl",
    className
  )
}
