import React, { useState, useEffect, useRef, memo, useCallback, useMemo ,Suspense } from 'react'
import VariableProximity from '../ui/VariableProximity';
// import React, { Suspense } from 'react';
const LiquidEther = React.lazy(() => import('../ui/LiquidEther'));
import SplitText from "../ui/SplitText";
import TextType from '../ui/TextType';

function HeroSection() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const desc1Ref = useRef(null);
  const desc2Ref = useRef(null);
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
    radius: 100,
    falloff: 'linear',
    onMouseEnter: handleVPMouseEnter,
    onMouseLeave: handleVPMouseLeave,
  }), [handleVPMouseEnter, handleVPMouseLeave]);

  // Memoize TextType props with optimized performance settings
  const textTypeProps = useMemo(() => ({
    text: ["Full Stack Developer", "Figma Designer", "Web Designer", "Freelancer"],
    typingSpeed: 35, // Faster typing speed
    pauseDuration: 1500, // Longer pause to improve readability
    deletingSpeed: 20, // Slightly faster deletion
    showCursor: true,
    textColors: ["#00A9E5", "#00A9E5"],
    cursorCharacter: "⚡",
    cursorBlinkDuration: 0.6, // Faster cursor blink for better responsiveness
    className: 'text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2 sm:mt-3 md:mt-5 text-blue-400 font-bold text-center md:text-left',
    useRAF: true, // Use requestAnimationFrame for smoother animations
    preRenderText: true, // Pre-render text for faster display
  }), []);
  return (
    <div className="text-white w-full relative min-h-[550px] sm:min-h-[600px] md:h-[700px] overflow-hidden">
      <Suspense fallback={
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-gradient-to-b from-blue-900/20 to-purple-900/20" />
      }> 
        <LiquidEther {...liquidEtherProps} />
      </Suspense>
      
      {/* Overlay content above the effect */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4 sm:px-6">
        <div className="w-full max-w-7xl mx-auto">
          {/* Main Div */}
          <div className='flex flex-col-reverse md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-16 lg:gap-40'>
            {/* left section */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-72 md:h-72 lg:w-96 lg:h-96">
              <img 
                src="/profile.jpg" 
                alt="Profile" 
                className='w-full h-full rounded-full object-cover flex-shrink-0 border-2 border-blue-400/30 shadow-lg shadow-blue-500/20' 
                loading="lazy"
              />

            </div>
            {/* right section */}
            <div className='w-full md:flex-1'>
              <div className='flex flex-col items-center md:items-start space-y-4 sm:space-y-6 md:space-y-8 px-4 sm:px-6 md:px-0'>
                <div className="w-full text-center md:text-left">
                  <SplitText 
                    key={reloadKey} 
                    text={"Hello ,"} 
                    className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400" 
                    delay={100} 
                    duration={0.6} 
                    ease="power3.out" 
                    splitType="chars" 
                    from={{ opacity: 0, y: 40 }} 
                    to={{ opacity: 1, y: 0 }} 
                    threshold={0.1} 
                    rootMargin="-100px"
                  />
                </div>
                
                <div className="mt-2 sm:mt-4">
                  <div ref={titleRef} className="relative inline-block">
                    <VariableProximity
                      label={`I'm Savvana Rahul a `}
                      className={'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight bg-gradient-to-r from-white to-white/90'}
                      containerRef={titleRef}
                      {...variableProximityProps}
                    />
                  </div>
                </div>
                
                <div className="w-full flex justify-center md:justify-start">
                  <TextType {...textTypeProps} />
                </div>
                
                <div className="w-full max-w-lg space-y-3">
                  <div ref={desc1Ref} style={{ position: 'relative' }} className="backdrop-blur-sm bg-white/5 p-4 rounded-lg">
                    <VariableProximity
                      label={`A personal portfolio is a collection of your work, achievements,`}
                      className={'text-sm sm:text-base md:text-lg text-white/90 leading-relaxed'}
                      containerRef={desc1Ref}
                      {...variableProximityProps}
                    />
                  </div>
                  
                  <div ref={desc2Ref} style={{ position: 'relative' }} className="backdrop-blur-sm bg-white/5 p-4 rounded-lg">
                    <VariableProximity
                      label={`and skills that highlights your and professional growth.`}
                      className={'text-sm sm:text-base md:text-lg text-white/90 leading-relaxed'}
                      containerRef={desc2Ref}
                      {...variableProximityProps}
                    />
                  </div>
                </div>
                
                {/* Download Resume Button */}
                <div className="pointer-events-auto mt-8 sm:mt-10 w-full flex justify-center md:justify-start">
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
                    className="group relative px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-white font-semibold text-base sm:text-lg rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-purple-500/20 transform hover:scale-[1.02] transition-all duration-300 ease-out overflow-hidden cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Resume
                      <span className="hidden sm:inline"> - PDF</span>
                    </span>
                    
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-45 translate-x-[-150%] animate-[shine_3s_ease-in-out_infinite]"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(HeroSection);