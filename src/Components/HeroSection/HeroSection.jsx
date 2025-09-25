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
    <div className='text-white h-[700px] w-full relative'>
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
  <div className="absolute inset-0 z-10 flex  items-center justify-center pointer-events-none">
    <div className="text-center px-6 ">
      {/* Main Div */}
      <div className='flex  items-center justify-center gap-60 mb-20'>
        {/* left section */}
        <img src="./public/profile.png" alt="" className='w-[400px] h-[400px] rounded-full object-cover' />

        <div>

       {/* right section */}
        <div className='mb-20 flex flex-col items-start'>
          <SplitText key={reloadKey} text={"Hello ,"} className="text-3xl font-semibold text-left text-blue-300" delay={100} duration={0.6} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-100px" textAlign="left" />
          <div className="pointer-events-auto mt-3" ref={containerRef}>
            <VariableProximity
              label={`I'm Savvana Rahul a `}
              className={'variable-proximity-demo mt-5 text-6xl'}
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
  className='text-5xl mt-5 text-red-300 font-bold'
/>
            <div className="mt-2 w-full">
            </div>
    <div className="pointer-events-auto mt-10" ref={containerRef}>
            <VariableProximity
              label={`A personal portfolio is a collection of your work, achievements,`}
              className={'variable-proximity-demo mt-5 text-base md:text-lg text-white/50 text-left w-full'}
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
              className={'variable-proximity-demo  text-base md:text-lg text-white/50 text-left w-full'}
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
