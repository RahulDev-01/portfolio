import React from 'react';

const DimensionalLoader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="dimensional-loader">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="loader-video"
      >
        <source src="/Videos/Stranger_Things_Demogorgon_Video_Generation.mp4" type="video/mp4" />
      </video>

      <style>{`
        .dimensional-loader {
          position: fixed;
          inset: 0;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        .loader-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default DimensionalLoader;
