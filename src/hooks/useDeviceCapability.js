import { useState, useEffect } from 'react';

/**
 * Detects device capability and returns a performance tier.
 * 
 * Tiers:
 *   "high"   – Desktop with good specs, full animations
 *   "medium" – Older desktops, tablets, mid-range phones
 *   "low"    – Weak phones, devices requesting reduced motion
 * 
 * Also returns `reducedMotion` boolean separately for a11y.
 */

const detectTier = () => {
  // Check prefers-reduced-motion
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    return { tier: 'low', reducedMotion: true };
  }

  let score = 0; // 0-10 scale

  // 1. CPU cores (navigator.hardwareConcurrency)
  const cores = navigator.hardwareConcurrency || 2;
  if (cores >= 8) score += 3;
  else if (cores >= 4) score += 2;
  else score += 0;

  // 2. Device memory (navigator.deviceMemory) – Chrome/Edge only
  const memory = navigator.deviceMemory || 4; // default assume 4GB
  if (memory >= 8) score += 3;
  else if (memory >= 4) score += 2;
  else if (memory >= 2) score += 1;
  else score += 0;

  // 3. Screen size as proxy for device class
  const width = window.innerWidth;
  if (width >= 1280) score += 2;
  else if (width >= 768) score += 1;
  else score += 0;

  // 4. Touch-primary device (phones/tablets are often weaker)
  const isTouch =
    'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch && width < 1024) score -= 1;

  // 5. Connection speed (if available)
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection) {
    const effectiveType = connection.effectiveType;
    if (effectiveType === '2g' || effectiveType === 'slow-2g') score -= 1;
  }

  // Clamp score
  score = Math.max(0, Math.min(10, score));

  let tier;
  if (score >= 6) tier = 'high';
  else if (score >= 3) tier = 'medium';
  else tier = 'low';

  return { tier, reducedMotion: false };
};

const useDeviceCapability = () => {
  const [capability, setCapability] = useState(() => detectTier());

  useEffect(() => {
    // Re-detect on resize (e.g. rotating tablet)
    const handleResize = () => {
      setCapability(detectTier());
    };

    // Listen for reduced-motion changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {
      setCapability(detectTier());
    };

    window.addEventListener('resize', handleResize);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return capability;
};

export default useDeviceCapability;
