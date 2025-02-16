"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"

export default function NotFound() {
  const houseRef = useRef(null)
  const textRef = useRef(null)
  const linkContainerRef = useRef(null) // Ref for animating the button

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.from(houseRef.current, { y: -50, opacity: 0, duration: 1 })
      .from(textRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
      .from(linkContainerRef.current, { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")

    gsap.to(houseRef.current, { y: -10, repeat: -1, yoyo: true, duration: 1.5, ease: "power1.inOut" })
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-100 to-red-300 p-4">
      <div ref={houseRef} className="mb-8">
        <svg className="w-32 h-32 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </div>
      <div ref={textRef} className="text-center">
        <h1 className="text-4xl font-bold text-red-700 mb-2">Oops! Property Not Found</h1>
        <p className="text-xl text-red-600 mb-8">It seems this dream home has vanished into thin air.</p>
      </div>
      <div ref={linkContainerRef} className="text-center">
        <Link href="/" passHref legacyBehavior>
          <a className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl transition duration-300 ease-in-out transform hover:scale-105">
            Return to Home Listings
          </a>
        </Link>
      </div>
    </div>
  )
}
