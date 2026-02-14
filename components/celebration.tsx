"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  left: number
  color: string
  size: number
  duration: number
  delay: number
  type: "confetti" | "heart"
  rotation: number
}

const COLORS = [
  "#e91e63",
  "#f06292",
  "#f8bbd0",
  "#ff5252",
  "#ff80ab",
  "#ff4081",
  "#ec407a",
  "#ad1457",
  "#ff6090",
  "#c2185b",
  "#fce4ec",
  "#ff8a80",
]

const CONFETTI_SHAPES = ["\u25CF", "\u2605", "\u25C6", "\u25A0"]

function MiniHeart({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

export function Celebration() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 14 + 8,
      duration: Math.random() * 3.5 + 2,
      delay: Math.random() * 1.5,
      type: Math.random() > 0.4 ? "confetti" : "heart",
      rotation: Math.random() * 360,
    }))
    setParticles(generated)
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 inline-flex"
          style={{
            left: `${p.left}%`,
            color: p.color,
            transform: `rotate(${p.rotation}deg)`,
            animation:
              p.type === "heart"
                ? `celebrate-heart ${p.duration}s ease-out ${p.delay}s forwards`
                : `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        >
          {p.type === "heart" ? (
            <MiniHeart size={p.size} color={p.color} />
          ) : (
            <span style={{ fontSize: `${p.size}px` }}>
              {CONFETTI_SHAPES[p.id % CONFETTI_SHAPES.length]}
            </span>
          )}
        </span>
      ))}
    </div>
  )
}
