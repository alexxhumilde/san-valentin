"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Celebration } from "./celebration"

const NO_MESSAGES = [
  "No",
  "Segura?",
  "Piensalo bien...",
  "No me hagas esto",
  "Vas a romper mi corazoncito...",
  "¿Enserio?",
  "Ultima oportunidad.",
  "No acepto ese no",
  "Di que si...",
  "Por favooor 😿",
]

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

export function ValentineCard() {
  const [noCount, setNoCount] = useState(0)
  const [accepted, setAccepted] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [mode, setMode] = useState<"shrink" | "flee">("shrink")

  /* For flee mode: random translate offsets while staying in-flow */
  const [fleeOffset, setFleeOffset] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const rawVisit = sessionStorage.getItem("valentine-visit-count")
      const visitCount = rawVisit ? Number.parseInt(rawVisit, 10) : 0
      const newVisitCount = visitCount + 1
      sessionStorage.setItem("valentine-visit-count", String(newVisitCount))
      setMode(newVisitCount % 2 === 1 ? "shrink" : "flee")
    } catch {
      /* sessionStorage unavailable */
    }
    setHydrated(true)
  }, [])



  /* Shrink mode: only on click */
  const handleNoClick = useCallback(() => {
    if (mode === "shrink") {
      setNoCount((prev) => Math.min(prev + 1, NO_MESSAGES.length - 1))
    }
  }, [mode])

  /* Flee mode: on hover / touch (natural escape) */
  /* Flee mode: on hover / touch (natural escape) */
  const handleNoHover = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (mode === "flee") {
      setNoCount((prev) => Math.min(prev + 1, NO_MESSAGES.length - 1))

      const btn = e.currentTarget as HTMLButtonElement
      const rect = btn.getBoundingClientRect()
      const viewportW = window.innerWidth
      const viewportH = window.innerHeight

      // Get current transform to calculate "layout" position
      const style = window.getComputedStyle(btn)
      const matrix = new DOMMatrixReadOnly(style.transform)
      const currentTx = matrix.m41
      const currentTy = matrix.m42

      // Layout position (where the button is "anchored")
      const layoutX = rect.left - currentTx
      const layoutY = rect.top - currentTy

      // Button dimensions
      const btnW = rect.width
      const btnH = rect.height
      const margin = 20 // safety margin from edges

      // Calculate safe boundaries for the *target* top-left corner
      const minX = margin
      const maxX = viewportW - btnW - margin
      const minY = margin
      const maxY = viewportH - btnH - margin

      // Random position within safe bounds
      const targetX = Math.random() * (maxX - minX) + minX
      const targetY = Math.random() * (maxY - minY) + minY

      // The new transform needed to reach (targetX, targetY) from (layoutX, layoutY)
      // targetX = layoutX + newTx  =>  newTx = targetX - layoutX
      const newTx = targetX - layoutX
      const newTy = targetY - layoutY

      setFleeOffset({ x: newTx, y: newTy })
    }
  }, [mode])

  const handleYes = useCallback(() => {
    setAccepted(true)
    try {
      sessionStorage.removeItem("valentine-visit-count")
    } catch {
      /* ignore */
    }
  }, [])

  /* Computed values */
  const yesScale = 1 + noCount * 0.13
  const yesPadX = 24 + noCount * 3
  const yesPadY = 12 + noCount * 1.5
  const yesFontSize = Math.min(16 + noCount * 1.5, 30)

  const noShrinkScale = Math.max(1 - noCount * 0.12, 0.2)
  const noShrinkFontSize = Math.max(14 - noCount * 1, 8)
  const noOpacity = Math.max(1 - noCount * 0.08, 0.35)

  const showNo = noCount < NO_MESSAGES.length - 1

  /* ---- ACCEPTED ---- */
  if (accepted) {
    return (
      <>
        <Celebration />
        <div
          className="flex flex-col items-center gap-6 sm:gap-8 px-6"
          style={{
            animation: "fade-in-scale 0.8s cubic-bezier(.16,1,.3,1) forwards",
          }}
        >
          <HeartIcon className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 text-primary" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary text-center text-balance leading-tight">
            Sabia que dirias que si 💖
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-center max-w-md leading-relaxed">
            Te amo con todo mi corazon mi amor 💓
          </p>
        </div>
      </>
    )
  }

  /* ---- SSR placeholder (opacity-0 to prevent flash) ---- */
  if (!hydrated) {
    return (
      <div className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-lg mx-auto px-4 sm:px-6 opacity-0 pointer-events-none">
        <div className="w-full rounded-3xl bg-card/60 p-6 sm:p-10 md:p-12 flex flex-col items-center gap-6 sm:gap-8">
          <HeartIcon className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 text-primary" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary text-center text-balance leading-tight">
            ¿Quieres ser mi San Valentín?
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-center max-w-xs sm:max-w-sm leading-relaxed">
            Solo tienes que elegir una opción...
          </p>
          <div className="flex flex-row items-center justify-center gap-4">
            <span className="rounded-full font-bold text-primary-foreground bg-primary py-3 px-6 text-base">
              Si!
            </span>
            <span className="rounded-full font-semibold border-2 border-border text-muted-foreground bg-card py-2.5 px-5 text-sm">
              No
            </span>
          </div>
        </div>
      </div>
    )
  }

  /* ---- INTERACTIVE STATE ---- */
  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-lg mx-auto px-4 sm:px-6"
      style={{
        animation: "fade-in-up 1s cubic-bezier(.16,1,.3,1) forwards",
      }}
    >
      <div className="w-full rounded-3xl bg-card/60 backdrop-blur-xl border border-border/40 shadow-2xl shadow-primary/10 p-6 sm:p-10 md:p-12 flex flex-col items-center gap-6 sm:gap-8">
        {/* Heart icon */}
        <div
          className="will-change-transform"
          style={{ animation: "heartbeat 1.4s ease-in-out infinite" }}
        >
          <HeartIcon className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 text-primary" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary text-center text-balance leading-tight">
          ¿Quieres ser mi San Valentín?
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-center max-w-xs sm:max-w-sm leading-relaxed">
          Solo tienes que elegir una opción...
        </p>

        {/* Buttons -- always side by side */}
        <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 mt-2 relative overflow-visible">
          {/* YES */}
          <button
            type="button"
            onClick={handleYes}
            className="rounded-full font-bold text-primary-foreground bg-primary cursor-pointer select-none whitespace-nowrap will-change-transform hover:shadow-xl hover:shadow-primary/30 active:scale-95"
            style={{
              transform: `scale(${yesScale})`,
              padding: `${yesPadY}px ${yesPadX}px`,
              fontSize: `${yesFontSize}px`,
              transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
              animation:
                noCount > 0
                  ? "bounce-gentle 1.5s ease-in-out infinite"
                  : "none",
            }}
          >
            Si!
          </button>

          {/* NO -- always in-flow next to Si */}
          {showNo && (
            <button
              type="button"
              onClick={mode === "shrink" ? handleNoClick : undefined}
              onMouseEnter={mode === "flee" ? handleNoHover : undefined}
              onTouchStart={mode === "flee" ? handleNoHover : undefined}
              className="rounded-full font-semibold border-2 border-border text-muted-foreground bg-card cursor-pointer select-none whitespace-nowrap will-change-transform"
              style={
                mode === "shrink"
                  ? {
                    transform: `scale(${noShrinkScale})`,
                    fontSize: `${noShrinkFontSize}px`,
                    padding: "10px 22px",
                    opacity: noOpacity,
                    transition: "all 0.45s cubic-bezier(.22,1,.36,1)",
                  }
                  : {
                    transform: `translate(${fleeOffset.x}px, ${fleeOffset.y}px)`,
                    fontSize: "14px",
                    padding: "10px 22px",
                    transition: "transform 0.7s cubic-bezier(.34,1.56,.64,1)",
                  }
              }
            >
              {NO_MESSAGES[noCount]}
            </button>
          )}
        </div>

        {/* Hint */}
        {noCount >= 2 && showNo && (
          <p
            className="text-xs sm:text-sm text-muted-foreground/70 text-center italic"
            style={{ animation: "fade-in-up 0.5s ease-out forwards" }}
          >
            Pista: hay una respuesta correcta...
          </p>
        )}
      </div>
    </div>
  )
}
