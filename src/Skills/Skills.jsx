import React, { useRef, useEffect, useCallback, useState } from 'react'
import FuzzyText  from '../Components/ui/FuzzyText';
// Placeholder images. Replace these URLs with your own when ready.
const imageUrls = [
  '/Logos/figma.png',
  '/Logos/html.png',
  '/Logos/css1.png',
  '/Logos/js.png',
  '/Logos/react.png',
  '/Logos/typeScript.png',
  '/Logos/bootstrap.png',
  '/Logos/tailwind.png',
  '/Logos/shadcn.png',
  '/Logos/nodejs.png',
  '/Logos/express.png',
  '/Logos/git.png',
  '/Logos/github1.png',
  '/Logos/mongo-db.png',
  '/Logos/nextjs.png',
  '/Logos/postman.png',
  '/Logos/mysql.png',
  '/Logos/postgres1.png',
  '/Logos/docker.png',
  '/Logos/aws.png',

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
  const SPEED = 1.5;
  // Accumulated horizontal offset for wheel fallback
  const offsetRef = useRef(0);
  // Guard to avoid repeated smooth-scroll triggers
  const snapGuardRef = useRef(false);
  // Debounce timer for scroll events
  const scrollDebounceRef = useRef(null);
  // Wheel scroll debounce
  const wheelDebounceRef = useRef(null);
  // Smooth scroll configuration
  const SMOOTH_SCROLL_DURATION = 1200; // Duration in milliseconds - slightly longer for smoother feel
  const SCROLL_EASING = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Smooth easing
  // Transition state for smooth ending
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Mouse hover state for scroll control
  const [isMouseOver, setIsMouseOver] = useState(false);

  // Smooth scroll function with custom easing
  const smoothScrollTo = useCallback((targetY, duration = SMOOTH_SCROLL_DURATION) => {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    
    // Don't scroll if distance is too small
    if (Math.abs(distance) < 10) {
      return;
    }
    
    const startTime = performance.now();
    setIsTransitioning(true);

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Apply smooth cubic-bezier easing for more natural feel
      const easeProgress = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      const currentY = startY + distance * easeProgress;
      window.scrollTo(0, currentY);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setIsTransitioning(false);
      }
    };

    requestAnimationFrame(animateScroll);
  }, [SMOOTH_SCROLL_DURATION]);

  // Compute wrapper height from content width
  const updateWrapperHeight = useCallback(() => {
    const stickyWrapper = stickyWrapperRef.current;
    const skillsContent = skillsContentRef.current;
    const horizontalSection = horizontalSectionRef.current;
    if (!stickyWrapper || !skillsContent || !horizontalSection) return;
    
    // Store current transform before updating
    const currentTransform = skillsContent.style.transform;
    
    const visibleWidth = horizontalSection.offsetWidth;
    const maxShift = Math.max(0, skillsContent.scrollWidth - visibleWidth);
    // Reduce required vertical distance by SPEED so the user reaches the end sooner
    const requiredVertical = Math.max(0, Math.ceil(maxShift / Math.max(0.1, SPEED)));
    // Apply additional height reduction multiplier
    const heightMultiplier = 0.7; // Reduce height by 30%
    const finalHeight = (window.innerHeight + requiredVertical) * heightMultiplier;
    stickyWrapper.style.height = `${finalHeight}px`;
    
    // Restore the transform to maintain scroll position
    if (currentTransform) {
      skillsContent.style.transform = currentTransform;
    }
  }, []);

  // Function to handle the scroll logic - only respond to actual user scroll
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
      
      // Check if we're in the skills section - more flexible detection for all screen sizes
      const isInSkillsSection = rect.top < window.innerHeight && rect.bottom > 0;
      const isSticky = rect.top <= 0 && rect.bottom >= 0;
      
      if (isInSkillsSection || isSticky) {
        // Calculate scroll progress - proper direction-based calculation
        const scrollProgress = totalScrollableDistance > 0 
          ? Math.max(0, Math.min(1, -rect.top / totalScrollableDistance))
          : 0;
        const rawProgress = scrollProgress;
        
        // Apply smooth easing function for better scroll experience
        const easeProgress = rawProgress < 0.5 
          ? 2 * rawProgress * rawProgress 
          : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;
        
        const clampedProgress = Math.max(0, Math.min(1, easeProgress));
        
        // Apply SPEED to move horizontally; clamp to maxShift
        let translateAmount = Math.min(maxShift, clampedProgress * maxShift * Math.max(0.1, SPEED));
        
        // Snap to exact end to avoid subpixel remainder near the end
        if (maxShift > 0 && maxShift - translateAmount < 1) {
          translateAmount = maxShift;
        }

        // Apply the transform
        skillsContent.style.transform = `translate3d(-${translateAmount}px, 0, 0)`;

        // Auto-advance to next section ONLY when we've reached the very end
        // Only trigger when we're at 98% or more of the maximum scroll
        if (!snapGuardRef.current && !isTransitioning && maxShift > 0 && translateAmount >= maxShift * 0.98) {
          snapGuardRef.current = true;
          const target = stickyWrapper.offsetTop + wrapperHeight + 50;
          smoothScrollTo(target);
          setTimeout(() => { snapGuardRef.current = false; }, SMOOTH_SCROLL_DURATION + 300);
        }
      }
      tickingRef.current = false;
    });
  }, [smoothScrollTo, isTransitioning, SPEED, isMouseOver]);

  // Attach and cleanup listeners
  useEffect(() => {
    const onResize = () => { updateWrapperHeight(); };
    const onLoad = () => { updateWrapperHeight(); };

    // Recompute when any image loads (scrollWidth depends on them)
    const imgs = Array.from(document.querySelectorAll('#skills-content img'));
    const imgListeners = [];
    imgs.forEach(img => {
      const cb = () => { updateWrapperHeight(); };
      img.addEventListener('load', cb, { once: true });
      imgListeners.push([img, cb]);
    });

    // Use smooth scroll handling with throttling for better performance
    let scrollTimeout;
    const handleScrollSmooth = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        handleScroll();
      }, 4); // ~250fps for faster, more responsive scrolling
    };
    
    // Add scroll event with passive for better performance
    window.addEventListener('scroll', handleScrollSmooth, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onLoad);
    
    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
      
      const touchCurrentX = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;
      const deltaX = touchStartX - touchCurrentX;
      const deltaY = touchStartY - touchCurrentY;
      
      // Only handle vertical touch movement for horizontal scroll
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        const skillsContent = skillsContentRef.current;
        const horizontalSection = horizontalSectionRef.current;
        if (!skillsContent || !horizontalSection) return;
        
        const visibleWidth = horizontalSection.offsetWidth;
        const maxShift = Math.max(0, skillsContent.scrollWidth - visibleWidth);
        if (maxShift <= 0) return;
        
        const touchSensitivity = 0.5;
        let next = offsetRef.current + (deltaY * touchSensitivity);
        next = Math.max(0, Math.min(maxShift, next));
        
        // If at start and user swipes down (deltaY < 0), navigate to previous section
        const atStart = next <= 1;
        if (atStart && deltaY < 0 && !snapGuardRef.current) {
          snapGuardRef.current = true;
          const target = Math.max(0, stickyWrapperRef.current.offsetTop - 1);
          smoothScrollTo(target);
          setTimeout(() => { snapGuardRef.current = false; }, SMOOTH_SCROLL_DURATION + 200);
          return;
        }

        if (next !== offsetRef.current) {
          e.preventDefault();
          offsetRef.current = next;
          skillsContent.style.transform = `translate3d(-${next}px, 0, 0)`;
        }
      }
    };
    
    const horizontalSection = horizontalSectionRef.current;
    horizontalSection?.addEventListener('touchstart', handleTouchStart, { passive: true });
    horizontalSection?.addEventListener('touchmove', handleTouchMove, { passive: false });
    updateWrapperHeight();

    // Wheel fallback: consume wheel to drive horizontal translate when possible
    const wheelEl = horizontalSectionRef.current;
    const onWheel = (e) => {
      const stickyWrapper = stickyWrapperRef.current;
      const skillsContent = skillsContentRef.current;
      const horizontalSection = horizontalSectionRef.current;
      if (!stickyWrapper || !skillsContent || !horizontalSection || isTransitioning) return;
      
      // Debounce wheel events to prevent rapid changes
      if (wheelDebounceRef.current) {
        clearTimeout(wheelDebounceRef.current);
      }
      
      const visibleWidth = horizontalSection.offsetWidth;
      const maxShift = Math.max(0, skillsContent.scrollWidth - visibleWidth);
      if (maxShift <= 0) return;
      
      // Handle wheel scroll - deltaY > 0 means scrolling down (move images right)
      // Apply smooth easing to wheel scroll with minimum threshold
      const wheelSensitivity = 0.4; // Further reduced sensitivity for more controlled scrolling
      const deltaThreshold = 3; // Increased threshold to prevent micro-movements
      
      if (Math.abs(e.deltaY) < deltaThreshold) return;
      
      let next = offsetRef.current + (e.deltaY * wheelSensitivity);
      next = Math.max(0, Math.min(maxShift, next));
      
      // Check if we're at the very end (98% or more)
      const atEnd = next >= maxShift * 0.98;
      const atStart = next <= 1;
      
      // When reaching end and user scrolls down, smoothly advance to next section in document flow
      // Only advance if we're at 98% or more of max shift
      if (atEnd && e.deltaY > 0 && !snapGuardRef.current) {
        snapGuardRef.current = true;
        // Calculate target position more precisely for smoother transition
        const target = stickyWrapper.offsetTop + stickyWrapper.offsetHeight + 50;
        smoothScrollTo(target);
        setTimeout(() => { snapGuardRef.current = false; }, SMOOTH_SCROLL_DURATION + 300);
        return;
      }
      
      // When at start and user scrolls up, smoothly go to the previous section
      if (atStart && e.deltaY < 0 && !snapGuardRef.current) {
        snapGuardRef.current = true;
        const target = Math.max(0, stickyWrapper.offsetTop - 50);
        smoothScrollTo(target);
        setTimeout(() => { snapGuardRef.current = false; }, SMOOTH_SCROLL_DURATION + 300);
        return;
      }
      
      if (next !== offsetRef.current) {
        e.preventDefault();
        offsetRef.current = next;
        skillsContent.style.transform = `translate3d(-${next}px, 0, 0)`;
        
        // Set debounce timeout
        wheelDebounceRef.current = setTimeout(() => {
          // Reset debounce after processing
        }, 16);
      }
    };
    wheelEl?.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScrollSmooth);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onLoad);
      imgListeners.forEach(([img, cb]) => img.removeEventListener('load', cb));
      wheelEl?.removeEventListener('wheel', onWheel);
      horizontalSection?.removeEventListener('touchstart', handleTouchStart);
      horizontalSection?.removeEventListener('touchmove', handleTouchMove);
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      if (wheelDebounceRef.current) {
        clearTimeout(wheelDebounceRef.current);
      }
    };
  }, [handleScroll, updateWrapperHeight]);


  return (
    <div id="app">

      {/* 2. The STICKY WRAPPER (h-[500vh] controls the vertical scroll duration) */}
      <section ref={stickyWrapperRef} id="sticky-wrapper" className={`relative w-full bg-[#060010] text-white transition-opacity duration-300 ${isTransitioning ? 'opacity-95' : 'opacity-100'}`}>

        {/* This is the element that becomes STICKY */}
        <div 
          ref={horizontalSectionRef} 
          id="horizontal-scroll-section" 
          className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-start p-2 sm:p-4 md:p-6 lg:p-8"
          onMouseEnter={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}
        >

          <div className="flex flex-col sm:flex-row items-start  sm:items-center justify-between w-full gap-2 sm:gap-4">
            <FuzzyText
              className='text-start leading-tight'
              fontSize='clamp(2rem, 4vw, 5rem)'
              fontWeight={700}
              baseIntensity={0.2}
              hoverIntensity={hoverIntensity}
            >
              Skills
            </FuzzyText>
            {/* Subtle indicator when approaching end */}
            <div className={`text-xs sm:text-sm text-gray-400 transition-opacity duration-500 ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}>
              Scroll to continue →
            </div>
          </div>

          {/* The WIDE CONTENT (This element receives the CSS transform) */}
          <div ref={skillsContentRef} id="skills-content" className="flex flex-row flex-nowrap w-max gap-4 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 py-4 sm:py-6 md:py-8 pr-4 pl-12 sm:pr-8 md:pr-12 lg:pr-16 xl:pr-20 will-change-transform overflow-hidden" style={{ transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
            {imageUrls.map((url, index) => {
              const isLastImage = index === imageUrls.length - 1;
              return (
                <div key={index} className={`flex-none w-24 sm:w-52 md:w-70 lg:w-72 xl:w-64 h-20 sm:h-24 md:h-32 lg:h-40 xl:h-48 flex mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 items-center justify-center ${index === 0 ? 'ml-0' : ''} ${isLastImage ? 'pr-2 sm:pr-4 md:pr-8 lg:pr-12 xl:pr-16' : ''}`}>
                  <img
                    src={url}
                    alt={`Skill ${index + 1}`}
                    className="max-h-full max-w-full w-auto h-auto object-contain select-none pointer-events-none mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
          {/* End WIDE CONTENT */}
        </div>
      </section>
      {/* End STICKY WRAPPER */}
    </div>
  );
}

export default Skills