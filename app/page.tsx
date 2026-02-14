import { FloatingHearts } from "@/components/floating-hearts"
import { ValentineCard } from "@/components/valentine-card"

export default function Page() {
  return (
    <main className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden px-4 py-10 sm:py-16">
      {/* Soft radial glow behind the card */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, hsl(340 75% 58% / 0.12) 0%, transparent 70%)",
        }}
      />
      <FloatingHearts />
      <div className="relative z-10 w-full flex items-center justify-center">
        <ValentineCard />
      </div>
    </main>
  )
}
