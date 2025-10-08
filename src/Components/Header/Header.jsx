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

  // Smooth scroll to section function
  const scrollToSection = (sectionId) => {
    console.log('Scrolling to section:', sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      console.log('Element found, scrolling...')
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    } else {
      console.log('Element not found:', sectionId)
    }
  }

  const glassWhenUp = 'backdrop-blur-0 bg-transparent border-b-0 shadow-none'

  return (
    <header className={`relative z-50 w-full transition-all duration-300 ${glassWhenUp}`}>
      <div className="w-full flex justify-center py-1 sm:py-2">
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect={true}
          spotlightRadius={200}
          particleCount={8}
          glowColor="132, 0, 255"
          onNavigate={scrollToSection}
        />
      </div>
    </header>
  )
}

export default Header