import React, { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react'
import VariableProximity from '../ui/VariableProximity';
import LiquidEther from '../ui/LiquidEther';
import SplitText from "../ui/SplitText";
import TextType from '../ui/TextType';

const HeroSection = memo(() => {
  const containerRef = useRef(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [isVPHover, setIsVPHover] = useState(false);
  
  // Memoize the reload effect to prevent unnecessary re-renders
  useEffect(() => {
    const interval = setInterval(() => {
      setReloadKey(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Memoize hover handlers to prevent re-renders
  const handleVPMouseEnter = useCallback(() => setIsVPHover(true), []);
  const handleVPMouseLeave = useCallback(() => setIsVPHover(false), []);

  // Memoize LiquidEther props to prevent re-renders
  const liquidEtherProps = useMemo(() => ({
    className: isVPHover ? '!pointer-events-none !touch-none' : '!pointer-events-auto !touch-auto',
    style: { pointerEvents: isVPHover ? 'none' : 'auto', touchAction: isVPHover ? 'none' : 'auto' },
    colors: ['#5227FF', '#FF9FFC', '#B19EEF'],
    mouseForce: 20,
    cursorSize: 70,
    isViscous: false,
    viscous: 30,
    iterationsViscous: 32,
    iterationsPoisson: 32,
    resolution: 0.5,
    isBounce: false,
    autoDemo: false,
    autoSpeed: 0.5,
    autoIntensity: 2.2,
    takeoverDuration: 0.25,
    autoResumeDelay: 3000,
    autoRampDuration: 0.6,
  }), [isVPHover]);

  // Memoize VariableProximity props
  const variableProximityProps = useMemo(() => ({
    fromFontVariationSettings: "'wght' 400, 'opsz' 9",
    toFontVariationSettings: "'wght' 1000, 'opsz' 40",
    containerRef,
    radius: 100,
    falloff: 'linear',
    onMouseEnter: handleVPMouseEnter,
    onMouseLeave: handleVPMouseLeave,
  }), [handleVPMouseEnter, handleVPMouseLeave]);

  // Memoize TextType props
  const textTypeProps = useMemo(() => ({
    text: ["Full Stack Developer", "Figma Designer", "Web Designer", "Freelancer ."],
    typingSpeed: 75,
    pauseDuration: 1500,
    showCursor: true,
    textColors: ["#00A9E5", "#00A9E5"],
    cursorCharacter: "|",
    className: 'text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2 sm:mt-3 md:mt-5 text-red-300 font-bold text-center md:text-left'
  }), []);
  return (
    <div className='text-white w-full relative min-h-[400px] sm:min-h-[500px] md:h-[700px] overflow-hidden'>
      <LiquidEther {...liquidEtherProps} />
      
      {/* Overlay content above the effect */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-2 sm:px-4">
        <div className="text-center px-3 sm:px-6">
          {/* Main Div */}
          <div className='flex flex-col-reverse md:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-16 lg:gap-40 mb-6 sm:mb-10 md:mb-20'>
            {/* left section */}
            <img 
              src="/profile.jpg" 
              alt="Profile" 
              className='w-32 h-32 sm:w-40 sm:h-40 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full object-cover flex-shrink-0' 
              loading="lazy"
            />

            <div>
              {/* right section */}
              <div className='mb-6 sm:mb-10 md:mb-20 flex flex-col items-center md:items-start max-w-[95vw] sm:max-w-[90vw] md:max-w-2xl lg:max-w-3xl'>
                <SplitText 
                  key={reloadKey} 
                  text={"Hello ,"} 
                  className="text-lg sm:text-2xl md:text-3xl font-semibold text-center md:text-left text-blue-300" 
                  delay={100} 
                  duration={0.6} 
                  ease="power3.out" 
                  splitType="chars" 
                  from={{ opacity: 0, y: 40 }} 
                  to={{ opacity: 1, y: 0 }} 
                  threshold={0.1} 
                  rootMargin="-100px" 
                  textAlign="center" 
                />
                
                <div className="pointer-events-auto mt-2 sm:mt-3" ref={containerRef}>
                  <VariableProximity
                    label={`I'm Savvana Rahul a `}
                    className={'variable-proximity-demo mt-2 sm:mt-3 text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-center md:text-left'}
                    {...variableProximityProps}
                  />
                </div>
                
                <div className="w-full flex justify-center md:justify-start">
                  <TextType {...textTypeProps} />
                </div>
                
                <div className="mt-2 w-full"></div>
                
                <div className="pointer-events-auto mt-6 sm:mt-10" ref={containerRef}>
                  <VariableProximity
                    label={`A personal portfolio is a collection of your work, achievements,`}
                    className={'variable-proximity-demo mt-4 sm:mt-5 text-xs sm:text-sm md:text-base lg:text-lg text-white/70 text-center md:text-left w-full max-w-full md:max-w-xl'}
                    {...variableProximityProps}
                  />
                </div>
                
                <div className="pointer-events-auto" ref={containerRef}>
                  <VariableProximity
                    label={`and skills that highlights your and professional growth.`}
                    className={'variable-proximity-demo text-xs sm:text-sm md:text-base lg:text-lg text-white/70 text-center md:text-left w-full max-w-full md:max-w-xl'}
                    {...variableProximityProps}
                  />
                  
                </div>
                
                {/* Download Resume Button */}
                <div className="pointer-events-auto mt-6 sm:mt-8 w-full flex justify-center md:justify-start">
                  <button
                    onClick={() => {
                      try {
                        const link = document.createElement('a');
                        link.href = '/Savvana_Rahul_Resume.pdf';
                        link.download = 'Savvana_Rahul_Resume.pdf';
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      } catch (error) {
                        console.error('Download error:', error);
                      }
                    }}
                    className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-400 text-white font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden  cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download My Resume
                    </span>
                    
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 -top-2 -left-2 w-0 h-0 bg-white/20 rounded-full group-hover:w-full group-hover:h-full group-hover:top-0 group-hover:left-0 transition-all duration-500 ease-out"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default HeroSection
