import React, { useRef, useState } from 'react'
import LaserFlow from './LaserFlow'
import Dock from '../ui/Dock'
// import resume from '../../../public/Savvana_Rahul.pdf'
import { IconBrandLinkedin, IconMail, IconBrandGithub, IconFileText } from '@tabler/icons-react'
// import github from '../../../public/image.png'
function Footer() {
  const revealImgRef = useRef(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const items = [
    { icon: <IconBrandLinkedin size={18} />, label: 'LinkedIn', onClick: () => window.open('https://www.linkedin.com/in/s-rahul-885613312/', '_blank') },
    { icon: <IconMail size={18} />, label: 'Email', onClick: () => { 
      navigator.clipboard.writeText('s.rahul5116@gmail.com').then(() => {
        showToast('Email copied to Clipboard 📋');
      }).catch(() => {
        showToast('Email: s.rahul5116@gmail.com');
      });
    } },
    { icon: <IconBrandGithub size={18} />, label: 'GitHub', onClick: () => window.open('https://github.com/RahulDev-01', '_blank') },
    { icon: <IconFileText size={18} />, label: 'Resume', onClick: () => {
      try {
        // Direct download without opening in new tab
        const link = document.createElement('a');
        link.href = '/Savvana_Rahul_Resume.pdf';
        link.download = 'Savvana_Rahul_Resume.pdf';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('Resume download started!');
      } catch (error) {
        console.error('Download error:', error);
        showToast('Resume file not accessible. Please contact me directly.');
      }
    } },
  ];
  return (
    <>
      {/* Toast Notification */}
      {toast.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#274DA5',
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

      <div className='mt-10'
        style={{
          height: '1000px',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#060010'
        }}
        onMouseMove={(e) => {
          const el = revealImgRef.current;
          if (el) {
            const imgRect = el.getBoundingClientRect();
            const x = e.clientX - imgRect.left;
            const y = e.clientY - imgRect.top;
            el.style.setProperty('--mx', `${x}px`);
            el.style.setProperty('--my', `${y}px`);
          }
        }}
        onMouseLeave={() => {
          const el = revealImgRef.current;
          if (el) {
            el.style.setProperty('--mx', '-9999px');
            el.style.setProperty('--my', '-9999px');
          }
        }}
      >
        <LaserFlow
          horizontalBeamOffset={0.3}
          verticalBeamOffset={-0.4}
          color="#274DA5"
          flowSpeed={1.0}
          wispSpeed={25.0}
        />

        <div style={{
          position: 'absolute',
          bottom: '0%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '10%',
          backgroundColor: '#060010',
          borderRadius: '20px',
          border: '2px solid #274DA5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '2rem',
          zIndex: 6
        }}>
           {/* Your content here */}
           <nav className='w-full'>
              <div className='flex items-center w-full px-8 overflow-hidden gap-8'>
                <div className='flex items-center gap-4 justify-between w-full'>
                <div className='text-gray-500 text-[16px] flex-shrink-0'>© 2025 Savvana Rahul⚡. All Rights Reserved .</div>
                <div className='text-gray-500 text-[16px] flex-shrink-0'> For Contact - s.rahul5116@gmail.com</div>
                </div>
              </div>
           </nav>
                     <Dock
                       items={items}
                       panelHeight={60}
                       baseItemSize={40}
                       magnification={60}
                       itemAlignment='items-center'
                       className='max-w-fit cursor-pointer mb-3'
                       style={{ 
                         position: 'relative',
                         top: '0px',
                         transform: 'translateY(0px)'
                       }}
                     />
        </div>

        <img
          ref={revealImgRef}
          src="/image.png"
          alt="Reveal effect"
          style={{

            position: 'absolute',
            left: 0,
            top: 0,
            transform: 'none',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 5,
            mixBlendMode: 'screen',
            opacity: 0.5,
            pointerEvents: 'none',
            '--mx': '-9999px',
            '--my': '-9999px',
            WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
            maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat'
          }}
        />
      </div></>
  )
}

export default Footer