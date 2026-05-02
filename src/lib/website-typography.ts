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

export function websiteSectionEyebrowClassName(className?: string) {
  return cn(
    "block text-sm font-bold uppercase tracking-[0.4em] text-[#b7893b]",
    className
  )
}

export function websiteSectionTitleClassName(
  language: WebsiteLanguage,
  className?: string
) {
  return cn(
    "font-serif font-bold text-white tracking-tight",
    language === "zh"
      ? "text-5xl md:text-6xl lg:text-7xl"
      : "text-4xl leading-tight md:text-5xl lg:text-6xl",
    className
  )
}

export function websiteSectionBodyClassName(
  language: WebsiteLanguage,
  className?: string
) {
  return cn(
    "font-sans font-normal leading-relaxed text-white/70",
    language === "zh" ? "text-lg md:text-xl" : "text-base md:text-lg",
    className
  )
}

export function websiteSectionCtaClassName(className?: string) {
  return cn(
    "inline-flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] text-[#b7893b]",
    className
  )
}
