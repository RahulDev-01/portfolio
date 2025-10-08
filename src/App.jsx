import React, { Suspense, lazy, memo, useCallback, useState, useEffect } from 'react'
import './App.css'

// Lazy load heavy components
const Footer = lazy(() => import('./Components/Footer/Footer'))
const Header = lazy(() => import('./Components/Header/Header'))
const HeroSection = lazy(() => import('./Components/HeroSection/HeroSection'))
const Skills = lazy(() => import('./Skills/Skills'))
const Projects = lazy(() => import('./Projects/Projects'))
const ContactMe = lazy(() => import('./ContactMe/ContactMe'))

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
  const skillsRef = React.useRef(null)
  const projectsRef = React.useRef(null)
  const contactRef = React.useRef(null)

  // Preload critical components after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Intersection observers for progressive loading
  const skillsVisible = useIntersectionObserver(skillsRef)
  const projectsVisible = useIntersectionObserver(projectsRef)
  const contactVisible = useIntersectionObserver(contactRef)

  return (
    <ErrorBoundary>
      <div className='h-full w-full bg-[#060010] overflow-x-hidden'>
        {/* Critical above-the-fold components */}
        <OptimizedComponent>
          <Header />
        </OptimizedComponent>
        
        <OptimizedComponent>
          <HeroSection />
        </OptimizedComponent>

        {/* Skills loads immediately */}
        <div ref={skillsRef}>
          <OptimizedComponent>
            <Skills />
          </OptimizedComponent>
        </div>

        <div ref={projectsRef}>
          {projectsVisible && (
            <OptimizedComponent>
              <Projects />
            </OptimizedComponent>
          )}
        </div>

        <div ref={contactRef}>
          {contactVisible && (
            <OptimizedComponent>
              <ContactMe />
            </OptimizedComponent>
          )}
        </div>

        {/* Footer loads last */}
        {isLoaded && (
          <OptimizedComponent>
            <Footer />
          </OptimizedComponent>
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App