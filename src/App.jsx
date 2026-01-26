import React, { Suspense, lazy, memo, useCallback, useState, useEffect } from 'react'
import './App.css'
import { debounce, preloadImages, logMemoryUsage } from './utils/performance'
import { UpsideDownProvider, useUpsideDown } from './contexts/UpsideDownContext'

// Lazy load heavy components with preloading
const Footer = lazy(() => import('./Components/Footer/Footer'))
const Header = lazy(() => import('./Components/Header/Header'))
const HeroSection = lazy(() => import('./Components/HeroSection/HeroSection'))
const AboutMe = lazy(() => import('./Components/AboutMe/AboutMe'))
const Skills = lazy(() => import('./Skills/Skills'))
const Projects = lazy(() => import('./Projects/Projects'))
const Experience = lazy(() => import('./Components/Experience/Experience'))
const ContactMe = lazy(() => import('./ContactMe/ContactMe'))
import MuteButton from './Components/ui/MuteButton'
import UpsideDownAudio from './Components/ui/UpsideDownAudio'

// Preload components for better performance
const preloadComponents = () => {
  import('./Components/Footer/Footer')
  import('./Components/AboutMe/AboutMe')
  import('./Skills/Skills')
  import('./Projects/Projects')
  import('./Components/Experience/Experience')
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
const LoadingSpinner = memo(() => {
  const { isUpsideDown } = useUpsideDown();
  return (
    <div className={`flex items-center justify-center min-h-screen ${isUpsideDown ? 'bg-[#0a0000]' : 'bg-[#060010]'}`}>
      <div className="relative">
        <div className={`w-16 h-16 border-4 ${isUpsideDown ? 'border-red-900/30 border-t-red-600' : 'border-blue-500/30 border-t-blue-500'} rounded-full animate-spin`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/FavIcon.png"
            alt="Loading"
            className="w-8 h-8 animate-spin"
            style={{ animationDirection: 'reverse' }}
          />
        </div>
      </div>
    </div>
  );
})

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
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors cursor-pointer"
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

// Shared Group Loader Component
const GroupLoader = ({ children, triggerResult, id, className = "" }) => {
  return (
    <div id={id} className={className}>
      {triggerResult ? (
        <OptimizedComponent>
          {children}
        </OptimizedComponent>
      ) : (
        <div className="min-h-[100px] w-full" />
      )}
    </div>
  )
}

// Dynamic Scrollbar Styles Component
const ScrollbarStyles = () => {
  const { isUpsideDown } = useUpsideDown();

  return (
    <style>{`
      /* Scrollbar styling for Webkit browsers (Chrome, Safari, Edge) */
      ::-webkit-scrollbar {
        width: 12px;
        height: 12px;
      }

      ::-webkit-scrollbar-track {
        background: ${isUpsideDown ? '#1a0000' : '#060010'};
      }

      ::-webkit-scrollbar-thumb {
        background: ${isUpsideDown ? 'linear-gradient(180deg, #dc2626, #991b1b)' : 'linear-gradient(180deg, #3b82f6, #1d4ed8)'};
        border-radius: 6px;
        border: 2px solid ${isUpsideDown ? '#1a0000' : '#060010'};
      }

      ::-webkit-scrollbar-thumb:hover {
        background: ${isUpsideDown ? 'linear-gradient(180deg, #ef4444, #b91c1c)' : 'linear-gradient(180deg, #60a5fa, #2563eb)'};
      }

      ::-webkit-scrollbar-thumb:active {
        background: ${isUpsideDown ? '#dc2626' : '#3b82f6'};
      }

      /* Scrollbar styling for Firefox */
      * {
        scrollbar-width: thin;
        scrollbar-color: ${isUpsideDown ? '#dc2626 #1a0000' : '#3b82f6 #060010'};
      }
    `}</style>
  );
};


function App() {
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileAlert, setShowMobileAlert] = useState(false)

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

  // Optimized mobile detection with debouncing
  useEffect(() => {
    const debouncedCheckMobile = debounce(checkMobile, 100)

    checkMobile()
    window.addEventListener('resize', debouncedCheckMobile)

    return () => {
      window.removeEventListener('resize', debouncedCheckMobile)
      debouncedCheckMobile.cancel()
    }
  }, [checkMobile])

  // Preload critical images immediately
  useEffect(() => {
    preloadCriticalImages()
    // Preload chunks after main thread is idle
    const timer = setTimeout(() => {
      preloadComponents()
      if (process.env.NODE_ENV === 'development') {
        logMemoryUsage()
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // refs for intersection triggers
  const aboutRef = React.useRef(null)
  const projectsRef = React.useRef(null)
  const contactRef = React.useRef(null)

  // Intersection Observers for triggers
  // Group 1: About triggers About + Skills
  const isAboutVisible = useIntersectionObserver(aboutRef, { threshold: 0, rootMargin: '300px' })

  // Group 2: Projects triggers Projects + Experience
  const isProjectsVisible = useIntersectionObserver(projectsRef, { threshold: 0, rootMargin: '300px' })

  // Group 3: Contact triggers Contact + Footer
  const isContactVisible = useIntersectionObserver(contactRef, { threshold: 0, rootMargin: '300px' })


  return (
    <UpsideDownProvider>
      <ErrorBoundary>
        <ScrollbarStyles />
        <MuteButton />
        <UpsideDownAudio />
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

          {/* GROUP 1: About & Skills */}
          {/* Trigger for Group 1 */}
          <div ref={aboutRef}>
            <GroupLoader triggerResult={isAboutVisible} id="about-section">
              <AboutMe />
            </GroupLoader>
          </div>

          <GroupLoader triggerResult={isAboutVisible} id="skills-section">
            <Skills />
          </GroupLoader>

          {/* GROUP 2: Projects & Experience */}
          {/* Trigger for Group 2 */}
          <div ref={projectsRef}>
            <GroupLoader triggerResult={isProjectsVisible} id="projects-section">
              <Projects />
            </GroupLoader>
          </div>

          <GroupLoader triggerResult={isProjectsVisible} id="experience-section">
            <Experience />
          </GroupLoader>

          {/* GROUP 3: Contact & Footer */}
          {/* Trigger for Group 3 */}
          <div ref={contactRef}>
            <GroupLoader triggerResult={isContactVisible} id="contact-section">
              <ContactMe />
            </GroupLoader>
          </div>

          <GroupLoader triggerResult={isContactVisible} id="footer-section">
            <Footer />
          </GroupLoader>

        </div>
      </ErrorBoundary>
    </UpsideDownProvider>
  )
}

export default App
