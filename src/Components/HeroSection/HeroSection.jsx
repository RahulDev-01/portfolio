import React, { useState, useEffect, useRef, memo, useCallback, useMemo, Suspense } from 'react'
import VariableProximity from '../ui/VariableProximity';
import { useUpsideDown } from '../../contexts/UpsideDownContext';
import FloatingParticles from '../ui/FloatingParticles';
import GlitchText from '../ui/GlitchText';
import VShapedPortalTransition from '../ui/VShapedPortalTransition';
import StrangerVines, { VineRing } from '../ui/StrangerVines';
import StrangerThingsLoader from '../ui/StrangerThingsLoader';
import UpsideDownAudio from '../ui/UpsideDownAudio';
// import React, { Suspense } from 'react';
const LiquidEther = React.lazy(() => import('../ui/LiquidEther'));
import SplitText from "../ui/SplitText";
import TextType from '../ui/TextType';

const HeroSection = memo(() => {
  const { isUpsideDown, isTransitioning, toggleUpsideDown, completeTransition } = useUpsideDown();
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
    className: '',
    style: {},
    colors: isUpsideDown ? ['#ff4d4d', '#ff0000', '#ff8080'] : ['#5227FF', '#FF9FFC', '#B19EEF'],
    mouseForce: 20,
    cursorSize: 70,
    isViscous: false,
    viscous: 30,
    iterationsViscous: 32,
    iterationsPoisson: 32,
    resolution: 0.5,
    isBounce: false,
    autoDemo: true,
    autoSpeed: isUpsideDown ? 0.8 : 0.5,
    autoIntensity: isUpsideDown ? 4.5 : 2.2,
    takeoverDuration: 0.25,
    autoResumeDelay: 1000,
    autoRampDuration: 0.6,
  }), [isVPHover, isUpsideDown]);

  // Memoize VariableProximity props
  const variableProximityProps = useMemo(() => ({
    fromFontVariationSettings: "'wght' 400, 'opsz' 9",
    toFontVariationSettings: "'wght' 1000, 'opsz' 40",
    radius: 100,
    falloff: 'linear',
    onMouseEnter: handleVPMouseEnter,
    onMouseLeave: handleVPMouseLeave,
  }), [handleVPMouseEnter, handleVPMouseLeave]);

  // Memoize TextType props
  const textTypeProps = useMemo(() => ({
    text: ["Full Stack Developer", "Figma Designer", "Web Designer", "Freelancer ."],
    typingSpeed: 50,
    pauseDuration: 600,
    deletingSpeed: 25,
    showCursor: true,
    textColors: isUpsideDown ? ["#fca5a5", "#f87171"] : ["#00A9E5", "#00A9E5"],
    cursorCharacter: "⚡",
    cursorBlinkDuration: 0.8,
    className: 'text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2 sm:mt-3 md:mt-5 text-red-300 font-bold text-center md:text-left'
  }), [isUpsideDown]);
  return (
    <div className={`text-white w-full relative min-h-[520px] sm:min-h-[580px] md:h-[700px] overflow-hidden transition-all duration-1000 ${isUpsideDown ? 'bg-black' : ''
      }`}>
      {/* Dark overlay for Upside Down mode */}
      {isUpsideDown && (
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 via-black/50 to-red-950/20 z-[1] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(139, 0, 0, 0.15) 0%, transparent 50%)',
          }}
        />
      )}

      {/* LiquidEther Background - Red in Upside Down mode */}
      <Suspense fallback={<div aria-hidden="true" className="absolute inset-0 pointer-events-none" />}>
        <LiquidEther {...liquidEtherProps} />
      </Suspense>

      {/* V-Shaped Portal Transition Effect with Demogorgon */}
      <VShapedPortalTransition isActive={isTransitioning} onComplete={completeTransition} />

      {/* Upside Down Background Texture */}
      {isUpsideDown && (
        <div
          className="absolute inset-0 z-[2] opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'url(/upside_down_texture.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'multiply'
          }}
        />
      )}

      {/* Floating Particles - Only in Upside Down mode */}
      {isUpsideDown && <FloatingParticles count={40} />}

      {/* Stranger Things Loading Screen - Shows only when ENTERING Upside Down */}
      {isTransitioning && isUpsideDown && <StrangerThingsLoader />}

      {/* Ambient Audio - Only in Upside Down mode */}
      {/* Temporarily disabled until audio file is added to /public folder */}
      {/* {isUpsideDown && <UpsideDownAudio key="upside-down-audio" />} */}

      {/* Stranger Things Vines - Left and Right sides */}
      {isUpsideDown && <StrangerVines />}

      {/* Overlay content above the effect */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-2 sm:px-4 pr-12 sm:pr-16 md:pr-20">
        <div className="text-center px-3 sm:px-6">
          {/* Main Div */}
          <div className='flex flex-col-reverse md:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-16 lg:gap-40 mb-6 sm:mb-10 md:mb-20'>
            {/* left section */}
            {/* left section - Profile Photo */}
            <div className='flex-shrink-0 p-1 md:p-4'>
              <div className="relative">
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className={`w-28 h-28 xs:w-32 xs:h-32 sm:w-40 sm:h-40 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full object-cover border-2 shadow-xl transition-all duration-700 ${isUpsideDown
                    ? 'border-red-900 shadow-[0_0_50px_rgba(180,0,0,0.6)]'
                    : 'border-white/10'
                    }`}
                  style={isUpsideDown ? { filter: 'brightness(0.6) contrast(1.2) saturate(1.1)' } : {}}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                {/* Vine ring around photo - only in Upside Down mode */}
                {isUpsideDown && <VineRing />}
              </div>
            </div>

            <div className='w-full'>
              {/* right section */}
              <div className='mb-4 sm:mb-8 md:mb-16 flex flex-col items-center md:items-start px-4 sm:px-6 md:px-0 max-w-[95vw] sm:max-w-[80vw] md:max-w-2xl lg:max-w-3xl'>
                <SplitText
                  key={reloadKey}
                  text={"Hello ,"}
                  className={`text-base sm:text-lg md:text-2xl font-semibold text-center md:text-left ${isUpsideDown ? 'text-red-400' : 'text-blue-300'}`}
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

                <div className="mt-2 sm:mt-3">
                  <div ref={titleRef} style={{ position: 'relative', display: 'inline-block' }}>
                    {isUpsideDown ? (
                      <GlitchText className={'mt-2 sm:mt-3 text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-center md:text-left text-red-300'}>
                        I'm Savvana Rahul
                      </GlitchText>
                    ) : (
                      <VariableProximity
                        label={`I'm Savvana Rahul`}
                        className={'mt-2 sm:mt-3 text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-center md:text-left'}
                        containerRef={titleRef}
                        {...variableProximityProps}
                      />
                    )}
                  </div>
                </div>

                <div className="w-full flex justify-center md:justify-start">
                  <TextType {...textTypeProps} />
                </div>

                <div className="mt-2 w-full"></div>

                <div className="mt-6 sm:mt-10">
                  <div ref={desc1Ref} style={{ position: 'relative', display: 'inline-block' }}>
                    <VariableProximity
                      label={`A personal portfolio is a collection of your work, achievements,`}
                      className={'mt-4 sm:mt-5 text-xs sm:text-sm md:text-base lg:text-lg text-white/70 text-center md:text-left w-full max-w-full md:max-w-xl'}
                      containerRef={desc1Ref}
                      {...variableProximityProps}
                    />
                  </div>
                </div>

                <div>
                  <div ref={desc2Ref} style={{ position: 'relative', display: 'inline-block' }}>
                    <VariableProximity
                      label={`and skills that highlights your and professional growth.`}
                      className={'text-xs sm:text-sm md:text-base lg:text-lg text-white/70 text-center md:text-left w-full max-w-full md:max-w-xl'}
                      containerRef={desc2Ref}
                      {...variableProximityProps}
                    />
                  </div>
                </div>

                <div className="pointer-events-auto mt-6 sm:mt-8 w-full flex justify-center md:justify-start">
                  <button
                    onClick={async () => {
                      const link = document.createElement('a');
                      link.href = `/Resume.pdf?v=${Date.now()}`; // Add timestamp to prevent caching
                      link.download = 'Resume.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className={`group relative block sm:inline-flex justify-center px-6 py-3 sm:px-8 sm:py-4 text-white font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl transition-all duration-300 ease-out cursor-pointer hover:brightness-115 ${isUpsideDown
                      ? 'bg-gradient-to-b from-black via-red-800 to-black border border-red-600/60 shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.8)]'
                      : 'bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 shadow-lg hover:shadow-sm'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download My Resume
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
})

export default HeroSection
