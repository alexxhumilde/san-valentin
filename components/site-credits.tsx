"use client"

import { useEffect } from "react"

export function SiteCredits() {
    useEffect(() => {
        // Styles for the console logs
        const titleStyle = [
            "font-family: 'Poppins', sans-serif",
            "font-size: 14px",
            "font-weight: bold",
            "color: #ff4d88", // Pink to match theme
            "margin-bottom: 5px",
        ].join(";")

        const linkStyle = [
            "font-family: 'Poppins', sans-serif",
            "font-size: 12px",
            "text-decoration: underline",
            "color: #3b82f6", // Blue link color
            "cursor: pointer",
        ].join(";")

        // Use setTimeout to ensure it logs after other initial noise
        setTimeout(() => {
            console.log(
                "%cDesarrollado por alexxhumilde\n%chttps://guns.lol/alexxhumilde",
                titleStyle,
                linkStyle
            )
            console.log(
                "%cRepositorio\n%chttps://github.com/alexxhumilde/san-valentin",
                titleStyle,
                linkStyle
            )
        }, 1000)
    }, [])

    return null
}
