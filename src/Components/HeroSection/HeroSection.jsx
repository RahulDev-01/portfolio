import React, { useState, useEffect , useRef } from 'react'
import VariableProximity from '../ui/VariableProximity';
import LiquidEther from '../ui/LiquidEther';
import SplitText from "../ui/SplitText";
import TextType from '../ui/TextType';
function HeroSection() {
  const containerRef = useRef(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [isVPHover, setIsVPHover] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setReloadKey(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className='text-white w-full relative min-h-[500px] md:h-[700px] overflow-hidden'>
      <LiquidEther
        className={isVPHover ? '!pointer-events-none !touch-none' : '!pointer-events-auto !touch-auto'}
        style={{ pointerEvents: isVPHover ? 'none' : 'auto', touchAction: isVPHover ? 'none' : 'auto' }}
        colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
        mouseForce={20}
        cursorSize={70}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={false}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />
  {/* Overlay content above the effect */}
  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4">
    <div className="text-center px-6 ">
      {/* Main Div */}
      <div className='flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-40 mb-10 md:mb-20'>
        {/* left section */}
        <img src="/profile.png" alt="" className='w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full object-cover flex-shrink-0' />

        <div>

       {/* right section */}
        <div className='mb-10 md:mb-20 flex flex-col items-start max-w-[90vw] sm:max-w-2xl md:max-w-3xl'>
          <SplitText key={reloadKey} text={"Hello ,"} className="text-2xl sm:text-3xl font-semibold text-left text-blue-300" delay={100} duration={0.6} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-100px" textAlign="left" />
          <div className="pointer-events-auto mt-3" ref={containerRef}>
            <VariableProximity
              label={`I'm Savvana Rahul a `}
              className={'variable-proximity-demo mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight'}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={100}
              falloff='linear'
              onMouseEnter={() => setIsVPHover(true)}
              onMouseLeave={() => setIsVPHover(false)}
            />
          </div>
          <TextType 
  text={["Full Stack Developer", "Figma Designer", "Web Designer","Freelancer."]}
  typingSpeed={75}
  pauseDuration={1500}
  showCursor={true}
    textColors={["#00A9E5", "#00A9E5"]}
  cursorCharacter="|"
  className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-3 md:mt-5 text-red-300 font-bold'
/>
            <div className="mt-2 w-full">
            </div>
    <div className="pointer-events-auto mt-10" ref={containerRef}>
            <VariableProximity
              label={`A personal portfolio is a collection of your work, achievements,`}
              className={'variable-proximity-demo mt-5 text-sm sm:text-base md:text-lg text-white/70 text-left w-full max-w-xl'}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={100}
              falloff='linear'
              onMouseEnter={() => setIsVPHover(true)}
              onMouseLeave={() => setIsVPHover(false)}
            />
          </div>
    <div className="pointer-events-auto " ref={containerRef}>
            <VariableProximity
              label={`and skills that highlights your and professional growth. It serves as`}
              className={'variable-proximity-demo text-sm sm:text-base md:text-lg text-white/70 text-left w-full max-w-xl'}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={100}
              falloff='linear'
              onMouseEnter={() => setIsVPHover(true)}
              onMouseLeave={() => setIsVPHover(false)}
            />
          </div>
        </div>
      {/* If you need clickable buttons, wrap them in a container with pointer-events-auto */}
      {/* <div className="mt-6 pointer-events-auto">
        <button className="px-5 py-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/20">
        Call to Action
        </button>
        </div> */}
    </div>
        </div>
        </div>
  </div>
    </div>
  )
}

export default HeroSection
