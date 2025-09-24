import React, { useEffect, useState } from 'react'
import MagicBento from './MagicBento'

function Header() {
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHasScrolled(y > 0)
      setIsScrollingUp(y < lastY)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const glassWhenUp = isScrollingUp
    ? 'backdrop-blur-md bg-white/10 border-b border-white/10 shadow-sm'
    : 'backdrop-blur-0 bg-transparent border-b-0 shadow-none'

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${glassWhenUp}`}>
      <div className="w-full flex justify-center py-2">
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
        />
      </div>
    </header>
  )
}

export default Header