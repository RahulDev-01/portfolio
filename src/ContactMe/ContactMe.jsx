import React, { Suspense } from 'react'
import BlobCursor from '../Components/ui/BlobCursor';
import Lanyard from '../Components/ui/Lanyard'
import ElectricBorder from '../Components/ui/ElectricBorder'
import { Label } from "../Components/ui/label";
import { Input } from "../Components/ui/input";
import { cn } from "../lib/utils";
import { useState } from "react";
import { motion } from "motion/react";
import { World } from "../Components/ui/globe";
const globeConfig = {
  pointSize: 4,
  globeColor: "#062056",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#062056",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#38bdf8",
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
};
const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
const sampleArcs = [
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

// Component for label and input container
const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

// Component for bottom gradient
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

function ContactMe() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('error'); // 'error' or 'success'
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

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
  return (
        <div className='relative w-full overflow-hidden'>
            {/* Toast Notification */}
            {showToast && (
                <div className={`fixed top-4 right-4 z-50 ${toastType === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white px-6 py-3 rounded-lg shadow-lg animate-bounce`}>
                    <div className="flex items-center space-x-2">
                        <span>{toastType === 'error' ? '⚠️' : '✅'}</span>
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}
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
            
            {/* Contact Us Section */}
            <div 
              className='h-[600px] mt-[10px] my-10 text-white relative overflow-hidden'
              onMouseMove={handleMouseMove}
            >

                {/* BlobCursor Background Effect - Like Hero Section */}
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

                {/* Lanyard Background Effect */}
                <div className='absolute inset-0 w-full h-full' style={{ zIndex: 1.5 }}>
                    {/* <Lanyard gravity={[0, -40, 0]} /> */}
                </div>

                  {/* Contact Content - Overlay like Hero Section */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto p-[10px]">
                     <div className='flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-40 w-full h-full'>
                          {/* Globe - Hidden on tablet and smaller screens */}
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
             {/* <Label htmlFor="name" className='text-white'>Name</Label> */}
             <Input 
               id="name" 
               placeholder="Your Name" 
               type="text" 
               value={formData.name}
               onChange={handleInputChange}
               className="focus-visible:ring-4 focus-visible:ring-blue-500 hover:ring-2 hover:ring-blue-400 transition-all duration-200" 
             />
            </LabelInputContainer>
            <LabelInputContainer>
             <Input 
               id="phone" 
               placeholder="Phone Number" 
               type="number" 
               value={formData.phone}
               onChange={handleInputChange}
               className="focus-visible:ring-4 focus-visible:ring-blue-500 hover:ring-2 hover:ring-blue-400 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
             />
            </LabelInputContainer>
        </div>
        <div className="mb-4 flex flex-col space-y-2 sm:space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer className="mb-4">
          {/* <Label htmlFor="email" className='text-white'>Email Address</Label> */}
          <Input 
            id="email" 
            placeholder="Your E-mail" 
            type="email" 
            value={formData.email}
            onChange={handleInputChange}
            className="focus-visible:ring-4 focus-visible:ring-blue-500 hover:ring-2 hover:ring-blue-400 transition-all duration-200" 
          />
          </LabelInputContainer>
          <LabelInputContainer>
            <Input 
              id="subject" 
              placeholder="Subject" 
              type="text" 
              value={formData.subject}
              onChange={handleInputChange}
              className="focus-visible:ring-4 focus-visible:ring-blue-500 hover:ring-2 hover:ring-blue-400 transition-all duration-200 " 
            />
          </LabelInputContainer>
        </div>
        
         <LabelInputContainer className="mb-4">
           {/* <Label htmlFor="password" className='text-white'>Password</Label> */}
            <textarea 
              id="message" 
              placeholder="Message" 
              value={formData.message}
              onChange={handleInputChange}
              className="flex h-24 sm:h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:ring-2 hover:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-200 text-black"
              style={{ paddingTop: '8px' }}
            />
         </LabelInputContainer>

 
        <button
          className="group/btn relative block h-10 sm:h-13 w-full rounded-md bg-gradient-to-bl from-blue-100 to-blue-00 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer text-sm sm:text-base"
          type="submit"
        >
          Submit {" "} &rarr;
          <BottomGradient />
        </button>
 

      </form>
  
                            </div>
                        </ElectricBorder>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default ContactMe