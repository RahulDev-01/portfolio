import React, { useRef, useEffect, useCallback } from 'react'
import FuzzyText  from '../Components/ui/FuzzyText';
// Placeholder images. Replace these URLs with your own when ready.
const imageUrls = [
  '../public/Logos/figma.png',
  '../public/Logos/html.png',
  '../public/Logos/css.png',
  '../public/Logos/js.png',
  '../public/Logos/react.png',
  '../public/Logos/typescript.png',
  '../public/Logos/bootstrap.png',
  '../public/Logos/tailwind.png',
  '../public/Logos/shadcn.png',
  '../public/Logos/nodejs.png',
  '../public/Logos/express js.png',
  '../public/Logos/git.png',
  '../public/Logos/github1.png',
  '../public/Logos/mongo-db.png',
  '../public/Logos/nextjs.png',
  '../public/Logos/postman.png',
  '../public/Logos/mysql.png',
  '../public/Logos/postgres1.png',
  '../public/Logos/docker.png',
  '../public/Logos/aws.png',

];

function Skills() {
  // Use refs to get direct access to the DOM elements
  // Fix: Define hoverIntensity and enableHover for FuzzyText
  const hoverIntensity = 0;
  const enableHover = true;
  const stickyWrapperRef = useRef(null);
  const skillsContentRef = useRef(null);
  const horizontalSectionRef = useRef(null);

  // rAF guard
  const tickingRef = useRef(false);
  // How quickly horizontal moves relative to vertical progress (1 = 1:1). Increase to reach end sooner.
  const SPEED = 1.8;
  // Accumulated horizontal offset for wheel fallback
  const offsetRef = useRef(0);

  // Compute wrapper height from content width
  const updateWrapperHeight = useCallback(() => {
    const stickyWrapper = stickyWrapperRef.current;
    const skillsContent = skillsContentRef.current;
    const horizontalSection = horizontalSectionRef.current;
    if (!stickyWrapper || !skillsContent || !horizontalSection) return;
    const visibleWidth = horizontalSection.offsetWidth;
    const maxShift = Math.max(0, skillsContent.scrollWidth - visibleWidth);
    // Reduce required vertical distance by SPEED so the user reaches the end sooner
    const requiredVertical = Math.max(0, Math.ceil(maxShift / Math.max(0.1, SPEED)));
    stickyWrapper.style.height = `${window.innerHeight + requiredVertical}px`;
    // Reset transform at start of measurement
    skillsContent.style.transform = 'translate3d(0, 0, 0)';
    offsetRef.current = 0;
  }, []);

  // Function to handle the scroll logic (robust, rAF-driven)
  const handleScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      const stickyWrapper = stickyWrapperRef.current;
      const skillsContent = skillsContentRef.current;
      const horizontalSection = horizontalSectionRef.current;
      if (!stickyWrapper || !skillsContent || !horizontalSection) {
        tickingRef.current = false;
        return;
      }

      const rect = stickyWrapper.getBoundingClientRect();
      const wrapperHeight = stickyWrapper.offsetHeight;
      const visibleWidth = horizontalSection.offsetWidth;
      const maxShift = Math.max(0, skillsContent.scrollWidth - visibleWidth);
      const totalScrollableDistance = Math.max(1, wrapperHeight - window.innerHeight);
      const relativeScroll = Math.min(totalScrollableDistance, Math.max(0, -rect.top));
      const clampedProgress = Math.max(0, Math.min(1, relativeScroll / totalScrollableDistance));
      // Apply SPEED to move faster horizontally; clamp to maxShift
      const translateAmount = Math.min(maxShift, clampedProgress * maxShift * Math.max(0.1, SPEED));

      skillsContent.style.transform = `translate3d(-${translateAmount}px, 0, 0)`;
      tickingRef.current = false;
    });
  }, []);

  // Attach and cleanup listeners
  useEffect(() => {
    const onResize = () => { updateWrapperHeight(); handleScroll(); };
    const onLoad = () => { updateWrapperHeight(); handleScroll(); };

    // Recompute when any image loads (scrollWidth depends on them)
    const imgs = Array.from(document.querySelectorAll('#skills-content img'));
    const imgListeners = [];
    imgs.forEach(img => {
      const cb = () => { updateWrapperHeight(); handleScroll(); };
      img.addEventListener('load', cb, { once: true });
      imgListeners.push([img, cb]);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onLoad);
    updateWrapperHeight();
    handleScroll();

    // Wheel fallback: consume wheel to drive horizontal translate when possible
    const wheelEl = horizontalSectionRef.current;
    const onWheel = (e) => {
      const stickyWrapper = stickyWrapperRef.current;
      const skillsContent = skillsContentRef.current;
      const horizontalSection = horizontalSectionRef.current;
      if (!stickyWrapper || !skillsContent || !horizontalSection) return;
      const visibleWidth = horizontalSection.offsetWidth;
      const maxShift = Math.max(0, skillsContent.scrollWidth - visibleWidth);
      if (maxShift <= 0) return;
      let next = offsetRef.current + e.deltaY;
      next = Math.max(0, Math.min(maxShift, next));
      if (next !== offsetRef.current) {
        e.preventDefault();
        offsetRef.current = next;
        skillsContent.style.transform = `translate3d(-${next}px, 0, 0)`;
      }
    };
    wheelEl?.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onLoad);
      imgListeners.forEach(([img, cb]) => img.removeEventListener('load', cb));
      wheelEl?.removeEventListener('wheel', onWheel);
    };
  }, [handleScroll, updateWrapperHeight]);


  return (
    <div id="app">

      {/* 2. The STICKY WRAPPER (h-[500vh] controls the vertical scroll duration) */}
      <section ref={stickyWrapperRef} id="sticky-wrapper" className="relative w-full bg-[#060010] text-white">

        {/* This is the element that becomes STICKY */}
        <div ref={horizontalSectionRef} id="horizontal-scroll-section" className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-start p-8">

          <FuzzyText
            className='text-start leading-tight'
            fontSize='clamp(3.75rem, 2.2vw, 5rem)'
            fontWeight={700}
            baseIntensity={0.2}
            hoverIntensity={hoverIntensity}
          >
            Skills
          </FuzzyText>

          {/* The WIDE CONTENT (This element receives the CSS transform) */}
          <div ref={skillsContentRef} id="skills-content" className="flex flex-row flex-nowrap w-max gap-16 py-12 px-8 md:px-12 lg:px-16 will-change-transform overflow-hidden">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex-none w-28 md:w-32 lg:w-40 h-16 md:h-40 lg:h-44 flex items-center justify-center">
                <img
                  src={url}
                  alt={`Skill ${index + 1}`}
                  className="h-30 mt-30 w-auto object-cover select-none pointer-events-none"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
          {/* End WIDE CONTENT */}
        </div>
      </section>
      {/* End STICKY WRAPPER */}
    </div>
  );
}

export default Skills