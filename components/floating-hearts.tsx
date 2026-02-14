"use client"

import { memo, useEffect, useState } from "react"

interface Heart {
  id: number
  left: number
  top: number
  size: number
  driftDuration: number
  swayDuration: number
  delay: number
  opacity: number
  color: string
  filled: boolean
}

const HEART_COLORS = [
  "hsl(340, 75%, 58%)",
  "hsl(340, 65%, 65%)",
  "hsl(350, 85%, 68%)",
  "hsl(340, 50%, 72%)",
  "hsl(330, 60%, 60%)",
  "hsl(345, 70%, 62%)",
  "hsl(350, 60%, 75%)",
  "hsl(340, 80%, 52%)",
]

const HeartSVG = memo(function HeartSVG({
  size,
  color,
  filled,
}: { size: number; color: string; filled: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? color : "none"}
      stroke={color}
      strokeWidth={filled ? 0 : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
})

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const count = 30
    const generated: Heart[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 94 + 3,
      top: Math.random() * 94 + 3,
      size: Math.random() * 22 + 10,
      driftDuration: Math.random() * 6 + 10,
      swayDuration: Math.random() * 5 + 6,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.2 + 0.06,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      filled: Math.random() > 0.3,
    }))
    setHearts(generated)
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute will-change-transform"
          style={{
            left: `${heart.left}%`,
            top: `${heart.top}%`,
            opacity: heart.opacity,
            animation: `drift-vertical ${heart.driftDuration}s ease-in-out ${heart.delay}s infinite alternate, sway-horizontal ${heart.swayDuration}s ease-in-out ${heart.delay}s infinite alternate`,
          }}
        >
          <HeartSVG
            size={heart.size}
            color={heart.color}
            filled={heart.filled}
          />
        </div>
      ))}
    </div>
  )
}
