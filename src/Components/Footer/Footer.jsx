import React, { useRef } from 'react'
import LaserFlow from './LaserFlow'
import github from '../../../public/image.png'
function Footer() {
     const revealImgRef = useRef(null);
  return (
    <>
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
        horizontalBeamOffset={0.1}
        verticalBeamOffset={0.0}
        color="#274DA5"
      />
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '86%',
        height: '50%',
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
        <nav>
          <ul>
            <li>rahuk</li>
            <li>rahuk</li>
            <li>rahuk</li>
            <li>rahuk</li>
          </ul>
        </nav>
      </div>

      <img
        ref={revealImgRef}
        src={github}
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
          opacity: 0.7,
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