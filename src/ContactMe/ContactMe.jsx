import React, { Suspense, memo, useRef, useMemo } from 'react'
import BlobCursor from '../Components/ui/BlobCursor';
import Lanyard from '../Components/ui/Lanyard'
import ElectricBorder from '../Components/ui/ElectricBorder'
import { Label } from "../Components/ui/label";
import { Input } from "../Components/ui/input";
import { cn } from "../lib/utils";
import { useState } from "react";
import { motion } from "motion/react";
import { World } from "../Components/ui/Globe";
import { useUpsideDown } from '../contexts/UpsideDownContext';
const ContactMe = memo(() => {
  const { isUpsideDown } = useUpsideDown();

  const globeConfig = useMemo(() => ({
    pointSize: 4,
    globeColor: isUpsideDown ? "#5c0000" : "#062056",
    showAtmosphere: true,
    atmosphereColor: isUpsideDown ? "#ff0000" : "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: isUpsideDown ? "#5c0000" : "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: isUpsideDown ? "#dc2626" : "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  }), [isUpsideDown]);

  const sampleArcs = useMemo(() => {
    const colors = isUpsideDown ? ["#dc2626", "#b91c1c", "#991b1b"] : ["#06b6d4", "#3b82f6", "#6366f1"];
    return [
      {
        order: 1,
        startLat: -19.885592,
        startLng: -43.951191,
        endLat: -22.9068,
        endLng: -43.1729,
        arcAlt: 0.1,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 1,
        startLat: 28.6139,
        startLng: 77.209,
        endLat: 3.139,
        endLng: 101.6869,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 1,
        startLat: -19.885592,
        startLng: -43.951191,
        endLat: -1.303396,
        endLng: 36.852443,
        arcAlt: 0.5,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 2,
        startLat: 1.3521,
        startLng: 103.8198,
        endLat: 35.6762,
        endLng: 139.6503,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 2,
        startLat: 51.5072,
        startLng: -0.1276,
        endLat: 3.139,
        endLng: 101.6869,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 2,
        startLat: -15.785493,
        startLng: -47.909029,
        endLat: 36.162809,
        endLng: -115.119411,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 3,
        startLat: -33.8688,
        startLng: 151.2093,
        endLat: 22.3193,
        endLng: 114.1694,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 3,
        startLat: 21.3099,
        startLng: -157.8581,
        endLat: 40.7128,
        endLng: -74.006,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 3,
        startLat: -6.2088,
        startLng: 106.8456,
        endLat: 51.5072,
        endLng: -0.1276,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 4,
        startLat: 11.986597,
        startLng: 8.571831,
        endLat: -15.595412,
        endLng: -56.05918,
        arcAlt: 0.5,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 4,
        startLat: -34.6037,
        startLng: -58.3816,
        endLat: 22.3193,
        endLng: 114.1694,
        arcAlt: 0.7,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 4,
        startLat: 51.5072,
        startLng: -0.1276,
        endLat: 48.8566,
        endLng: -2.3522,
        arcAlt: 0.1,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 5,
        startLat: 14.5995,
        startLng: 120.9842,
        endLat: 51.5072,
        endLng: -0.1276,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 5,
        startLat: 1.3521,
        startLng: 103.8198,
        endLat: -33.8688,
        endLng: 151.2093,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 5,
        startLat: 34.0522,
        startLng: -118.2437,
        endLat: 48.8566,
        endLng: -2.3522,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 6,
        startLat: -15.432563,
        startLng: 28.315853,
        endLat: 1.094136,
        endLng: -63.34546,
        arcAlt: 0.7,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 6,
        startLat: 37.5665,
        startLng: 126.978,
        endLat: 35.6762,
        endLng: 139.6503,
        arcAlt: 0.1,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 6,
        startLat: 22.3193,
        startLng: 114.1694,
        endLat: 51.5072,
        endLng: -0.1276,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 7,
        startLat: -19.885592,
        startLng: -43.951191,
        endLat: -15.595412,
        endLng: -56.05918,
        arcAlt: 0.1,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 7,
        startLat: 48.8566,
        startLng: -2.3522,
        endLat: 52.52,
        endLng: 13.405,
        arcAlt: 0.1,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 7,
        startLat: 52.52,
        startLng: 13.405,
        endLat: 34.0522,
        endLng: -118.2437,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 8,
        startLat: -8.833221,
        startLng: 13.264837,
        endLat: -33.936138,
        endLng: 18.436529,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 8,
        startLat: 49.2827,
        startLng: -123.1207,
        endLat: 52.3676,
        endLng: 4.9041,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 8,
        startLat: 1.3521,
        startLng: 103.8198,
        endLat: 40.7128,
        endLng: -74.006,
        arcAlt: 0.5,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 9,
        startLat: 51.5072,
        startLng: -0.1276,
        endLat: 34.0522,
        endLng: -118.2437,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 9,
        startLat: 22.3193,
        startLng: 114.1694,
        endLat: -22.9068,
        endLng: -43.1729,
        arcAlt: 0.7,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 9,
        startLat: 1.3521,
        startLng: 103.8198,
        endLat: -34.6037,
        endLng: -58.3816,
        arcAlt: 0.5,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 10,
        startLat: -22.9068,
        startLng: -43.1729,
        endLat: 28.6139,
        endLng: 77.209,
        arcAlt: 0.7,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 10,
        startLat: 34.0522,
        startLng: -118.2437,
        endLat: 31.2304,
        endLng: 121.4737,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 10,
        startLat: -6.2088,
        startLng: 106.8456,
        endLat: 52.3676,
        endLng: 4.9041,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 11,
        startLat: 41.9028,
        startLng: 12.4964,
        endLat: 34.0522,
        endLng: -118.2437,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 11,
        startLat: -6.2088,
        startLng: 106.8456,
        endLat: 31.2304,
        endLng: 121.4737,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 11,
        startLat: 22.3193,
        startLng: 114.1694,
        endLat: 1.3521,
        endLng: 103.8198,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 12,
        startLat: 34.0522,
        startLng: -118.2437,
        endLat: 37.7749,
        endLng: -122.4194,
        arcAlt: 0.1,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 12,
        startLat: 35.6762,
        startLng: 139.6503,
        endLat: 22.3193,
        endLng: 114.1694,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 12,
        startLat: 22.3193,
        startLng: 114.1694,
        endLat: 34.0522,
        endLng: -118.2437,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 13,
        startLat: 52.52,
        startLng: 13.405,
        endLat: 22.3193,
        endLng: 114.1694,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 13,
        startLat: 11.986597,
        startLng: 8.571831,
        endLat: 35.6762,
        endLng: 139.6503,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 13,
        startLat: -22.9068,
        startLng: -43.1729,
        endLat: -34.6037,
        endLng: -58.3816,
        arcAlt: 0.1,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
      {
        order: 14,
        startLat: -33.936138,
        startLng: 18.436529,
        endLat: 21.395643,
        endLng: 39.883798,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
      },
    ];
  }, [isUpsideDown]);

  // Component for label and input container
  const LabelInputContainer = ({ children, className }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
  };

  // Component for bottom gradient
  const BottomGradient = ({ isUpsideDown }) => {
    return (
      <>
        <span className={`group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 ${isUpsideDown ? 'bg-gradient-to-r from-transparent via-red-500 to-transparent' : 'bg-gradient-to-r from-transparent via-cyan-500 to-transparent'}`} />
        <span className={`group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 ${isUpsideDown ? 'bg-gradient-to-r from-transparent via-red-700 to-transparent' : 'bg-gradient-to-r from-transparent via-indigo-500 to-transparent'}`} />
      </>
    );
  };

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('error'); // 'error' or 'success'
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeLetters, setActiveLetters] = useState({});  // Track active letters for 5sec persistence
  const [byersMessage, setByersMessage] = useState(''); // Message for Byers Lights
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  // Handle Byers Lights typing - each letter lights up
  const handleByersInput = (e) => {
    // Allow only alphabets and spaces
    const rawValue = e.target.value.toUpperCase();
    const newValue = rawValue.replace(/[^A-Z\s]/g, '');

    const oldValue = byersMessage;

    // Only update if the value actually changed (or is valid)
    setByersMessage(newValue);
    byersMessageRef.current = newValue;

    // If a new valid char was added, activate it via typing logic
    if (newValue.length > oldValue.length) {
      const newLetter = newValue[newValue.length - 1];
      // Only light up if it's a letter (A-Z), ignoring spaces
      if (/[A-Z]/.test(newLetter)) {
        handleTypingActivate(newLetter);
      }
    }
  };

  const handleByersKeyDown = (e) => {
    if (e.key === 'Enter') {
      setByersMessage('');
      byersMessageRef.current = '';
      setActiveLetters({});
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  };


  const timeoutRef = useRef(null);
  const byersMessageRef = useRef('');

  // TYPING: Stays active until 3 seconds of inactivity, then ALL clear
  const handleTypingActivate = (letter) => {
    setActiveLetters(prev => ({ ...prev, [letter]: true }));

    // Clear existing timeout to reset the batch timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout to clear ALL active letters after 3 seconds of inactivity
    timeoutRef.current = setTimeout(() => {
      setActiveLetters({});
    }, 3000);
  };

  // HOVER: Active for 1 second then turns off (independent of typing batch)
  const handleHoverActivate = (letter) => {
    // Only activate if not already participating in a typing sequence (optional, but cleaner)
    setActiveLetters(prev => ({ ...prev, [letter]: true }));

    setTimeout(() => {
      // Only turn off if it hasn't been refreshed by typing logic (simple check)
      // AND if it's NOT currently in the typed message
      setActiveLetters(prev => {
        if (byersMessageRef.current.includes(letter)) {
          return prev; // Keep it on if it's part of the message
        }
        return { ...prev, [letter]: false };
      });
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const showToastMessage = (message, type, redirectUrl = null) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      if (redirectUrl) {
        window.open(redirectUrl, '_blank');
      }
    }, 3000); // Hide toast after 3 seconds, then redirect
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    const isEmpty = Object.values(formData).some(value => value.trim() === '');

    if (isEmpty) {
      showToastMessage("Please fill all fields before submitting!", "error");
      return;
    }

    console.log("Form submitted with data:", formData);

    // Show success message and redirect to LinkedIn
    showToastMessage("Form submitted successfully! Redirecting to LinkedIn...", "success", "https://www.linkedin.com/in/s-rahul-885613312");

    // Reset form after successful submission
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    });

    // Here you can add your actual form submission logic (API call, etc.)
  }
  // Render Normal Mode View (Globe + Form)
  const renderNormalView = () => (
    <>
      <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent px-4 sm:px-6 md:px-10 lg:px-12 pt-20 sm:pt-32 md:pt-40 mb-4 sm:mb-6 text-center' style={{
        backgroundImage: 'linear-gradient(135deg, #3b82f6, #06b6d4, #00d9ff, #3b82f6)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 1s ease infinite',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Contact Me
      </h1>
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>

      <div
        className='h-[600px] mt-[10px] my-10 text-white relative overflow-hidden'
        onMouseMove={handleMouseMove}
      >
        {/* BlobCursor Background Effect */}
        <div className='absolute inset-0' style={{ zIndex: 1, pointerEvents: 'none' }}>
          <BlobCursor
            blobType="circle"
            fillColor="#3b82f6"
            trailCount={3}
            sizes={[50, 80, 60]}
            innerSizes={[20, 30, 25]}
            innerColor="rgba(6, 182, 212, 0.8)"
            opacities={[0.6, 0.6, 0.6]}
            shadowColor="rgba(59, 130, 246, 0.3)"
            shadowBlur={5}
            shadowOffsetX={5}
            shadowOffsetY={5}
            filterStdDeviation={15}
            useFilter={true}
            fastDuration={0.1}
            slowDuration={0.5}
            zIndex={1}
            mousePosition={mousePosition}
          />
        </div>

        {/* Contact Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto p-[10px]">
          <div className='flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-10 w-full h-full'>
            <div className='hidden lg:block pointer-events-auto relative overflow-hidden w-[500px] h-[500px]'>
              <Suspense fallback={<div className="flex items-center justify-center h-full text-white">Loading Globe...</div>}>
                <World data={sampleArcs} globeConfig={globeConfig} />
              </Suspense>
            </div>
            <ElectricBorder
              color="#7df9ff"
              speed={1}
              chaos={0.5}
              thickness={2}
              style={{ borderRadius: 16 }}
            >
              <div className='pt-4 pr-4 pl-4 sm:pt-[30px] sm:pr-[30px] sm:pl-[30px] w-full max-w-[700px] sm:w-[700px]'>
                <form className="my-4 sm:my-8 min-h-[350px] sm:h-[350px]" onSubmit={handleSubmit}>
                  <div className="mb-4 flex flex-col space-y-2 sm:space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                    <LabelInputContainer>
                      <Input
                        id="name"
                        placeholder="Your Name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="transition-all duration-200 focus-visible:ring-4 focus-visible:ring-blue-500 hover:ring-2 hover:ring-blue-400"
                      />
                    </LabelInputContainer>
                    <LabelInputContainer>
                      <Input
                        id="phone"
                        placeholder="Phone Number"
                        type="number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-4 focus-visible:ring-blue-500 hover:ring-2 hover:ring-blue-400"
                      />
                    </LabelInputContainer>
                  </div>
                  <LabelInputContainer className="mb-4">
                    <Input
                      id="email"
                      placeholder="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="transition-all duration-200 focus-visible:ring-4 focus-visible:ring-blue-500 hover:ring-2 hover:ring-blue-400"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                    <Input
                      id="subject"
                      placeholder="Subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="transition-all duration-200 focus-visible:ring-4 focus-visible:ring-blue-500 hover:ring-2 hover:ring-blue-400"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-8">
                    <textarea
                      id="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="shadow-input dark:shadow-[0px_0px_1px_1px_#262626] flex min-h-[80px] sm:min-h-[100px] w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-4 focus-visible:ring-blue-500 hover:ring-2 hover:ring-blue-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:placeholder:text-neutral-600 resize-none text-white"
                    />
                  </LabelInputContainer>

                  <button
                    className="group/btn relative block h-10 sm:h-13 w-full rounded-md bg-gradient-to-bl from-blue-100 to-blue-00 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer text-sm sm:text-base"
                    type="submit"
                  >
                    Submit {" "} &rarr;
                    <BottomGradient isUpsideDown={false} />
                  </button>
                </form>
              </div>
            </ElectricBorder>
          </div>
        </div>
      </div>
    </>
  );

  // Render Upside Down Mode View (Byers Lights Wall)
  const renderUpsideDownView = () => (
    <div className='relative w-full min-h-screen overflow-hidden flex items-center justify-center'
      style={{
        background: 'linear-gradient(to bottom, #1a0505 0%, #000000 100%)',
        boxShadow: 'inset 0 0 150px rgba(0,0,0,0.9)'
      }}
    >
      {/* Vintage wallpaper pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 50px,
            rgba(139, 90, 43, 0.1) 50px,
            rgba(139, 90, 43, 0.1) 51px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 50px,
            rgba(139, 90, 43, 0.1) 50px,
            rgba(139, 90, 43, 0.1) 51px
          )`
        }}
      />

      <div className="relative w-full max-w-[1200px] min-h-[600px] p-10 flex flex-col items-center justify-center pb-10">
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl md:text-4xl font-black bg-clip-text text-transparent mb-24 text-center tracking-[0.2em] uppercase whitespace-nowrap" style={{
          backgroundImage: 'linear-gradient(to bottom, #ef4444, #7f1d1d)',
          fontFamily: "'ITC Benguiat', 'Times New Roman', serif", // Stranger Things style
          textShadow: '0 0 5px rgba(220, 38, 38, 0.4), 1px 1px 0px rgba(0,0,0,0.8)',
          filter: 'drop-shadow(0 0 2px rgba(220, 38, 38, 0.4))'
        }}>
          Send a Signal to the Home World
        </h2>

        {/* Row 1: A-H */}
        <div className="relative w-full flex justify-center gap-3 sm:gap-6 md:gap-[4vw]">
          {/* Wire Thread */}
          <div className="absolute top-[8px] left-[5%] right-[5%] h-[2px] bg-neutral-900/90 rounded-full box-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ filter: 'blur(0.5px)' }} />

          {'ABCDEFGH'.split('').map((letter, i) => (
            <div
              key={letter}
              onMouseEnter={() => handleHoverActivate(letter)}
              className="relative flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95 will-change-transform"
            >
              {/* Wire Connector */}
              <div className="absolute -top-1 sm:-top-2 w-[1px] sm:w-[2px] h-2 sm:h-4 bg-neutral-900/90" />

              <div
                className={`relative z-10 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-150 ease-out mb-1 sm:mb-2 md:mb-4 ${activeLetters[letter] ? 'scale-[2.5] brightness-150' : 'scale-100 opacity-60'}`}
                style={{
                  backgroundColor: ['#ef4444', '#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e', '#a855f7'][i],
                  boxShadow: activeLetters[letter]
                    ? `0 0 20px ${['#ef4444', '#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e', '#a855f7'][i]}, 0 0 40px ${['#ef4444', '#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e', '#a855f7'][i]}, 0 0 60px ${['#ef4444', '#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e', '#a855f7'][i]}`
                    : `inset -2px -2px 4px rgba(0,0,0,0.5), 0 0 5px ${['#ef4444', '#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e', '#a855f7'][i]}`
                }}
              />
              <span
                className={`text-3xl sm:text-5xl md:text-7xl lg:text-8xl transition-all duration-200 ease-out ${activeLetters[letter] ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'text-white/20'}`}
                style={{
                  fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
                  fontWeight: 'normal',
                  color: activeLetters[letter] ? ['#ef4444', '#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e', '#a855f7'][i] : undefined
                }}
              >
                {letter}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2: I-Q */}
        <div className="relative w-full flex justify-center gap-3 sm:gap-6 md:gap-[4vw] mt-8 sm:mt-12 md:mt-16 pl-[2vw]">
          {/* Wire Thread */}
          <div className="absolute top-[8px] left-[5%] right-[5%] h-[2px] bg-neutral-900/90 rounded-full box-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ filter: 'blur(0.5px)' }} />

          {'IJKLMNOPQ'.split('').map((letter, i) => (
            <div
              key={letter}
              onMouseEnter={() => handleHoverActivate(letter)}
              className="relative flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95 will-change-transform"
            >
              {/* Wire Connector */}
              <div className="absolute -top-1 sm:-top-2 w-[1px] sm:w-[2px] h-2 sm:h-4 bg-neutral-900/90" />

              <div
                className={`relative z-10 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-150 ease-out mb-1 sm:mb-2 md:mb-4 ${activeLetters[letter] ? 'scale-[2.5] brightness-150' : 'scale-100 opacity-60'}`}
                style={{
                  backgroundColor: ['#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24'][i],
                  boxShadow: activeLetters[letter]
                    ? `0 0 20px ${['#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24'][i]}, 0 0 40px ${['#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24'][i]}, 0 0 60px ${['#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24'][i]}`
                    : `inset -2px -2px 4px rgba(0,0,0,0.5), 0 0 5px ${['#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24'][i]}`
                }}
              />
              <span
                className={`text-3xl sm:text-5xl md:text-7xl lg:text-8xl transition-all duration-200 ease-out ${activeLetters[letter] ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'text-white/20'}`}
                style={{
                  fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
                  fontWeight: 'normal',
                  color: activeLetters[letter] ? ['#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24'][i] : undefined
                }}
              >
                {letter}
              </span>
            </div>
          ))}
        </div>

        {/* Row 3: R-Z */}
        <div className="relative w-full flex justify-center gap-3 sm:gap-6 md:gap-[4vw] mt-8 sm:mt-12 md:mt-16">
          {/* Wire Thread */}
          <div className="absolute top-[8px] left-[5%] right-[5%] h-[2px] bg-neutral-900/90 rounded-full box-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ filter: 'blur(0.5px)' }} />

          {'RSTUVWXYZ'.split('').map((letter, i) => (
            <div
              key={letter}
              onMouseEnter={() => handleHoverActivate(letter)}
              className="relative flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95 will-change-transform"
            >
              {/* Wire Connector */}
              <div className="absolute -top-1 sm:-top-2 w-[1px] sm:w-[2px] h-2 sm:h-4 bg-neutral-900/90" />

              <div
                className={`relative z-10 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-150 ease-out mb-1 sm:mb-2 md:mb-4 ${activeLetters[letter] ? 'scale-[2.5] brightness-150' : 'scale-100 opacity-60'}`}
                style={{
                  backgroundColor: ['#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e'][i],
                  boxShadow: activeLetters[letter]
                    ? `0 0 20px ${['#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e'][i]}, 0 0 40px ${['#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e'][i]}, 0 0 60px ${['#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e'][i]}`
                    : `inset -2px -2px 4px rgba(0,0,0,0.5), 0 0 5px ${['#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e'][i]}`
                }}
              />
              <span
                className={`text-3xl sm:text-5xl md:text-7xl lg:text-8xl transition-all duration-200 ease-out ${activeLetters[letter] ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'text-white/20'}`}
                style={{
                  fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
                  fontWeight: 'normal',
                  color: activeLetters[letter] ? ['#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e', '#a855f7', '#ef4444', '#fbbf24', '#22c55e'][i] : undefined
                }}
              >
                {letter}
              </span>
            </div>
          ))}
        </div>

        {/* Typing Input - Positioned RELATIVE to flow to prevent overlap */}
        <div className="relative mt-24 mb-10 w-full flex justify-center px-4">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              value={byersMessage}
              onChange={handleByersInput}
              onKeyDown={handleByersKeyDown}
              placeholder="TRANSMIT MESSAGE..."
              className="w-full bg-black/40 border-2 border-red-900/50 text-red-100 text-center py-2 sm:py-4 px-4 sm:px-6 focus:outline-none focus:border-red-500/50 focus:bg-black/60 placeholder:text-red-900/30 transition-all duration-300 rounded-lg backdrop-blur-sm"
              style={{
                fontFamily: "'ITC Benguiat', 'Times New Roman', serif",
                fontSize: 'clamp(16px, 4vw, 24px)',
                letterSpacing: '0.2em',
                textShadow: '0 0 10px rgba(220, 38, 38, 0.5)'
              }}
              maxLength={20}
            />
            {/* Blinking Cursor Indicator (Visual flair) */}
            <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-red-600 shadow-[0_0_10px_#dc2626] ${byersMessage ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className='relative w-full overflow-hidden'
      style={isUpsideDown ? {
        background: 'linear-gradient(to bottom, #1a0505 0%, #000000 100%)'
      } : {}}
    >
      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 z-50 ${toastType === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white px-6 py-3 rounded-lg shadow-lg animate-bounce`}>
          <div className="flex items-center space-x-2">
            <span>{toastType === 'error' ? '⚠️' : '✅'}</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {isUpsideDown ? renderUpsideDownView() : renderNormalView()}
    </div>
  )
})

ContactMe.displayName = 'ContactMe'
export default ContactMe
