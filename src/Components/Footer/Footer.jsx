import React, { useRef, useState } from 'react'
import LaserFlow from './LaserFlow'
import Dock from '../ui/Dock'
import { IconBrandLinkedin, IconMail, IconBrandGithub, IconFileText } from '@tabler/icons-react'
import { useUpsideDown } from '../../contexts/UpsideDownContext';

function Footer() {
  const { isUpsideDown, setIsFooterHovered, toggleUpsideDown } = useUpsideDown();
  const videoRef = useRef(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  const handleFooterMouseEnter = () => {
    setIsFooterHovered(true);
    if (videoRef.current && isUpsideDown) {
      if (videoRef.current.currentTime < 0.5) {
        videoRef.current.currentTime = 24;
      }
      videoRef.current.volume = 0; // Start muted
      videoRef.current.play().catch(e => console.log("Video play failed", e));

      // Quick volume fade in
      let vol = 0;
      const fade = setInterval(() => {
        if (vol < 1) {
          vol += 0.1;
          videoRef.current.volume = Math.min(1, vol);
        } else {
          clearInterval(fade);
        }
      }, 50);
    }
  };

  const handleFooterMouseLeave = () => {
    setIsFooterHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      // Do NOT reset currentTime - allows resuming from pause point
    }
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const items = [
    { icon: <IconBrandLinkedin size={18} />, label: 'LinkedIn', onClick: () => window.open('https://www.linkedin.com/in/s-rahul-885613312/', '_blank') },
    {
      icon: <IconMail size={18} />, label: 'Email', onClick: () => {
        navigator.clipboard.writeText('s.rahul5116@gmail.com').then(() => {
          showToast('Email copied to Clipboard 📋');
        }).catch(() => {
          showToast('Email: s.rahul5116@gmail.com');
        });
      }
    },
    { icon: <IconBrandGithub size={18} />, label: 'GitHub', onClick: () => window.open('https://github.com/RahulDev-01', '_blank') },
    {
      icon: <IconFileText size={18} />, label: 'Resume', onClick: async () => {
        const link = document.createElement('a');
        link.href = `/Resume.pdf?v=${Date.now()}`;
        link.download = 'Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('Resume download started!');
      }
    },
  ];

  return (
    <>
      {/* Toast Notification */}
      {toast.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: isUpsideDown ? '#7f1d1d' : '#274DA5',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 9999,
          transform: 'translateX(0)',
          transition: 'transform 0.3s ease-out'
        }}>
          {toast.message}
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      <div className='relative w-full h-[500px] md:h-[1000px] group'
        style={{
          overflow: 'hidden',
          backgroundColor: isUpsideDown ? '#0a0000' : '#060010',
          '--x': '0px',
          '--y': '0px'
        }}
        onMouseLeave={handleFooterMouseLeave}
        onMouseEnter={handleFooterMouseEnter}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty('--x', `${x}px`);
          e.currentTarget.style.setProperty('--y', `${y}px`);
        }}
      >
        {/* Upside Down Button - Vertical on Right */}
        <button
          onClick={toggleUpsideDown}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-auto
                     bg-gradient-to-b from-red-900/80 via-black/90 to-red-950/80
                     hover:from-red-800 hover:via-red-950 hover:to-black
                     text-white font-bold
                     px-2 py-4 sm:px-2.5 sm:py-6
                     rounded-l-xl
                     shadow-[0_0_20px_rgba(139,0,0,0.5)]
                     hover:shadow-[0_0_30px_rgba(220,38,38,0.8)]
                     border-l-2 border-t-2 border-b-2 border-red-700/50
                     hover:border-red-500
                     transition-all duration-300
                     group
                     overflow-hidden cursor-pointer"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          <span className="relative z-10 text-sm sm:text-base md:text-lg tracking-wider
                           transition-all duration-300
                           drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]">
            {isUpsideDown ? "ESCAPE THE UPSIDE DOWN" : "ENTER INTO UPSIDE DOWN"}
          </span>

          {/* Animated particles effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-red-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-red-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
          </div>

          {/* Glitch effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/20 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-200
                          group-hover:animate-pulse"></div>
        </button>

        {/* Normal World GitHub Background */}
        {!isUpsideDown && (
          <div
            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
            style={{
              backgroundImage: 'url(/image.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maskImage: 'radial-gradient(circle 200px at var(--x) var(--y), black 20%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(circle 200px at var(--x) var(--y), black 20%, transparent 100%)'
            }}
          />
        )}

        {/* Helper Video Background */}
        <video
          ref={videoRef}
          src="/Videos/Stranger_Things_5_Vecna_Finds_Max..._Netflix_1080P.mp4"
          loop
          muted={false}
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: isUpsideDown ? 0.6 : 0,
            zIndex: 0,
            filter: 'brightness(0.98) contrast(1.1) sepia(0.2)'
          }}
        />
        <LaserFlow
          horizontalBeamOffset={0.3}
          verticalBeamOffset={-0.4}
          color={isUpsideDown ? "#7f1d1d" : "#274DA5"}
          flowSpeed={isUpsideDown ? 0.2 : 1.0}
          wispSpeed={isUpsideDown ? 5.0 : 25.0}
          fogIntensity={isUpsideDown ? 0.8 : 0.45}
        />

        <div style={{
          position: 'absolute',
          bottom: '0%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '10%',
          backgroundColor: isUpsideDown ? '#0a0000' : '#060010',
          borderRadius: '20px',
          border: `2px solid ${isUpsideDown ? '#dc2626' : '#274DA5'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '2rem',
          zIndex: 6,
          overflow: 'hidden' // Clip vines to border radius
        }}>

          {/* Your content here */}
          <nav className='w-full'>
            <div className='flex items-center w-full px-8 overflow-hidden gap-8'>
              <div className='flex items-center gap-4 justify-between w-full'>
                <div className='text-gray-500 text-[16px] flex-shrink-0 hidden md:block'>© 2025 Savvan Rahul⚡. All Rights Reserved .</div>
                <div className='text-gray-500 text-[16px] flex-shrink-0'>For Contact - s.rahul5116@gmail.com</div>
              </div>
            </div>
          </nav>
          <Dock
            items={items}
            panelHeight={60}
            baseItemSize={40}
            magnification={60}
            itemAlignment='items-center'
            className='max-w-fit cursor-pointer mb-25 sm:mb-25 md:mb-34 lg:mb-3'
            style={{
              position: 'relative',
              top: '0px',
              transform: 'translateY(0px)'
            }}
          />
        </div>



        {/* Upside Down Vines Overlay */}
        {isUpsideDown && (
          <div className="absolute inset-0 z-[7] pointer-events-none opacity-80" style={{
            backgroundImage: 'url(/stranger_things_vines_1767352200308.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'multiply'
          }} />
        )}
      </div>
    </>
  )
}

export default Footer