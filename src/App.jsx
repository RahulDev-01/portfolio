import React, { Suspense, lazy, memo, useCallback, useState, useEffect, useMemo } from 'react'
import './App.css'
import { debounce, throttle, preloadImages, measurePerformance, logMemoryUsage } from './utils/performance'

// Lazy load heavy components with preloading
const Footer = lazy(() => import('./Components/Footer/Footer'))
const Header = lazy(() => import('./Components/Header/Header'))
const HeroSection = lazy(() => import('./Components/HeroSection/HeroSection'))
const Skills = lazy(() => import('./Skills/Skills'))
const Projects = lazy(() => import('./Projects/Projects'))
const ContactMe = lazy(() => import('./ContactMe/ContactMe'))

// Preload components for better performance
const preloadComponents = () => {
  import('./Components/Footer/Footer')
  import('./Skills/Skills')
  import('./Projects/Projects')
  import('./ContactMe/ContactMe')
}

// Preload critical images
const preloadCriticalImages = () => {
  const criticalImages = [
    '/profile.jpg',
    '/Logos/figma.png',
    '/Logos/html.png',
    '/Logos/css1.png',
    '/Logos/js.png',
    '/Logos/react.png',
    '/Logos/typeScript.png',
    '/Logos/tailwind.png',
    '/Logos/nodejs.png'
  ]
  preloadImages(criticalImages)
}

// Loading component
const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center min-h-screen bg-[#060010]">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
      </div>
    </div>
  </div>
))

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-[#060010] text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Intersection Observer hook for lazy loading
const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasIntersected) {
        setIsIntersecting(true)
        setHasIntersected(true)
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, hasIntersected, options])

  return isIntersecting
}

// Optimized component wrapper
const OptimizedComponent = memo(({ children, fallback = <LoadingSpinner /> }) => (
  <ErrorBoundary>
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  </ErrorBoundary>
))

{
  // // Skills component was lazy loaded
  /* <div ref={skillsRef}>
  {skillsVisible && (  // ← Only loaded when visible
    <OptimizedComponent>
      <Skills />
    </OptimizedComponent>
  )}
</div>

// Skills component loads immediately
<div ref={skillsRef}>
  <OptimizedComponent>  // ← Loads right away
    <Skills />
  </OptimizedComponent>
</div>

*/}

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [skillsLoaded, setSkillsLoaded] = useState(false)
  const [projectsLoaded, setProjectsLoaded] = useState(false)
  const [contactLoaded, setContactLoaded] = useState(false)
  const [footerLoaded, setFooterLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileAlert, setShowMobileAlert] = useState(false)
  const skillsRef = React.useRef(null)
  const projectsRef = React.useRef(null)
  const contactRef = React.useRef(null)

  // Memoized mobile detection function
  const checkMobile = useCallback(() => {
    const mobile = window.innerWidth <= 768
    setIsMobile(mobile)
    if (mobile) {
      setShowMobileAlert(true)
      // Auto-hide alert after 5 seconds
      setTimeout(() => {
        setShowMobileAlert(false)
      }, 5000)
    }
  }, [])

  // Progressive loading with optimized delays
  useEffect(() => {
    const timers = []
    
    // Preload critical images immediately
    preloadCriticalImages()
    
    // Preload components after initial render
    timers.push(setTimeout(() => {
      preloadComponents()
    }, 100))
    
    // Load skills after 200ms (faster)
    timers.push(setTimeout(() => {
      setSkillsLoaded(true)
    }, 200))
    
    // Load projects after 400ms (faster)
    timers.push(setTimeout(() => {
      setProjectsLoaded(true)
    }, 400))
    
    // Load contact after 600ms (faster)
    timers.push(setTimeout(() => {
      setContactLoaded(true)
    }, 600))
    
    // Load footer after 800ms (faster)
    timers.push(setTimeout(() => {
      setFooterLoaded(true)
    }, 800))

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [])

  // Optimized mobile detection with debouncing
  useEffect(() => {
    let timeoutId
    const debouncedCheckMobile = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkMobile, 100)
    }

    checkMobile()
    window.addEventListener('resize', debouncedCheckMobile)

    return () => {
      window.removeEventListener('resize', debouncedCheckMobile)
      clearTimeout(timeoutId)
    }
  }, [checkMobile])

  // Preload critical components after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
      // Log performance metrics in development
      if (process.env.NODE_ENV === 'development') {
        logMemoryUsage()
      }
    }, 50) // Faster initial load

    return () => clearTimeout(timer)
  }, [])

  return (
    <ErrorBoundary>
      <div className='h-full w-full bg-[#060010] overflow-x-hidden'>
        {/* Mobile Alert - Only visible on mobile screens */}
        {showMobileAlert && (
          <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white p-3 sm:hidden">
            <div className="flex items-center justify-between max-w-sm mx-auto">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium">
                  Switch to laptop for better experience
                </p>
              </div>
              <button
                onClick={() => setShowMobileAlert(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Critical above-the-fold components */}
        <OptimizedComponent>
          <Header />
        </OptimizedComponent>
        
        <div id="hero-section">
          <OptimizedComponent>
            <HeroSection />
          </OptimizedComponent>
        </div>

        {/* Progressive loading for below-the-fold components */}
        <div id="skills-section" ref={skillsRef}>
          {skillsLoaded && (
            <OptimizedComponent>
              <Skills />
            </OptimizedComponent>
          )}
        </div>

        <div id="projects-section" ref={projectsRef}>
          {projectsLoaded && (
            <OptimizedComponent>
              <Projects />
            </OptimizedComponent>
          )}
        </div>

        <div id="contact-section" ref={contactRef}>
          {contactLoaded && (
            <OptimizedComponent>
              <ContactMe />
            </OptimizedComponent>
          )}
        </div>

        {/* Footer loads last */}
        {footerLoaded && (
          <OptimizedComponent>
            <Footer />
          </OptimizedComponent>
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App