import React from 'react'
import Hyperspeed from '../Components/ui/Hyperspeed';
import PixelTrail from '../Components/ui/PixelTrail';
import SplashCursor from '../Components/ui/SplashCursor'
import { CardContainer, CardBody, CardItem } from '../Components/ui/3d-card'
import { motion } from "motion/react";
import { LinkPreview } from "../Components/ui/link-preview";

function Projects() {
  return (
    <div className='relative text-white w-full overflow-hidden'>
      {/* Hyperspeed Background */}
      <div className='absolute inset-0 z-0'>
        <Hyperspeed
  effectOptions={{
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 4,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0xFFFFFF,
      brokenLines: 0xFFFFFF,
      leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
      rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
      sticks: 0x03B3C3,
    }
  }}
/>
      </div>
      
      {/* Content Overlay */}
      <div className='relative z-10 flex flex-col items-start justify-start '>
        <div className='w-full flex flex-col items-start justify-start '>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent m-6 md:m-8 lg:m-10 animate-gradient-x '>
            My Projects  <hr className='w-full h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mt-5 animate-gradient-x border-0' />
          </h1>
          {/* Main Div */}
          <div className='w-full flex flex-col lg:flex-row h-auto lg:h-[600px] p-4 md:p-6 lg:p-10 rounded-xl gap-4 lg:gap-5'>
            <CardContainer className="inter-var">
              <CardBody className="bg-black/20 backdrop-blur-md relative group/card hover:shadow-2xl hover:shadow-purple-500/[0.3] border-purple-400/30 w-full lg:w-auto lg:sm:w-[30rem] h-[400px] md:h-[450px] rounded-xl p-4 md:p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-lg md:text-xl font-bold text-neutral-600 dark:text-white"
                >
                  Destin Ai
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-xs md:text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  It is an intelligent web application designed to simplify and enhance the travel planning experience 🌍. The leverages AI-powered recommendations, custom itineraries, and real-time notifications to help users plan their perfect trips. 
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <img
                    src="/Projects/destinAi.png"
                    height="1000"
                    width="1000"
                    className="h-48 md:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl transition-transform duration-300 group-hover/card:scale-105 group-hover/card:-translate-y-1"
                    alt="thumbnail"
                  />
                </CardItem>
                <div className="flex justify-between items-center m-4">
                  <CardItem
                    translateZ={20}
                    as="a"
                    href="https://destinai-rahul.vercel.app/"
                    target="__blank"
                    className="px-3 md:px-4 py-2 rounded-xl text-xs font-normal text-gray-100  hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/50"
                  >
                    Click Here →
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
            {/* Right Section */}
            <div className='bg-black/20 backdrop-blur-sm w-full flex h-[400px] md:h-[450px] p-4 md:p-6 lg:p-10 rounded-xl border border-purple-400/30 mt-4 lg:mt-8 hover:shadow-2xl hover:shadow-purple-500/[0.3] transition-all duration-300 hover:scale-102 hover:-translate-y-1'>
            <div className="flex justify-center items-center h-full flex-col px-2 md:px-4">
      <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base lg:text-lg xl:text-2xl max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-3xl mx-auto mb-4 md:mb-6 lg:mb-10">
        <LinkPreview
          url="https://destinai-rahul.vercel.app/"
          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
        >
          Destin-AI
        </LinkPreview>{" "}
         an intelligent travel planning application with AI-Powered Destination Suggestions 🏝️, Custom Itinerary Creation 🗺️, Google OAuth Integration 🔒. Plan smarter with powerful features Everything you need to craft the perfect trip—without the spreadsheets.
      </p>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base lg:text-lg xl:text-2xl max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-3xl mx-auto mb-4 md:mb-6 lg:mb-10 ">
        Technologies Used 🧰: React.js, React Router, Sonner, Tailwind, Google OAuth, Vite ⚡, Version Management {" "}
        <LinkPreview url="https://github.com/RahulDev-01/Destin-ai" className="font-bold text-blue-400">
          Git-Hub 
        </LinkPreview>{" "}
        and My GitHub Profile {" "} 
        <LinkPreview url="https://github.com/RahulDev-01" className="font-bold text-red-700">
          RahulDev-01 
        </LinkPreview>{" "}, Website is also hosted in Vercel Platform.       
      </p>
    </div>
            </div>
          </div>
        </div>
      </div>
      {/* Second Card */}
      <div className='w-full flex flex-col lg:flex-row h-auto lg:h-[600px] p-4 md:p-6 lg:p-10 rounded-xl gap-4 lg:gap-5'>
        <CardContainer className="inter-var">
          <CardBody className="bg-black/20 backdrop-blur-md relative group/card hover:shadow-2xl hover:shadow-purple-500/[0.3] border-purple-400/30 w-full lg:w-auto lg:sm:w-[30rem] h-[400px] md:h-[450px] rounded-xl p-4 md:p-6 border">
            <CardItem translateZ="50" className="text-lg md:text-xl font-bold text-neutral-600 dark:text-white">
            Gemini App 🚀
            </CardItem>
            <CardItem as="p" translateZ="60" className="text-neutral-500 text-xs md:text-sm max-w-sm mt-2 dark:text-neutral-300">
            Gemini is a simple React-based application that interacts with users by generating responses based on user prompts. It includes features such as user-friendly prompts, result display. 
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <img
                src="/Projects/gemini.png"
                height="1000"
                width="1000"
                className="h-48 md:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl transition-transform duration-300 group-hover/card:scale-105 group-hover/card:-translate-y-1"
                alt="thumbnail"
              />
              </CardItem>
              <div className="flex justify-between items-center m-4">
                <CardItem
                  translateZ={20}
                  as="a"
                  href="https://destinai-rahul.vercel.app/"
                  target="__blank"
                  className="px-3 md:px-4 py-2 rounded-xl text-xs font-normal text-gray-100 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/50"
                >
                  Click Here →
                </CardItem>
              </div>
            </CardBody>
        </CardContainer>
        <div className='bg-black/20 backdrop-blur-sm w-full flex h-[400px] md:h-[450px] p-4 md:p-6 lg:p-10 rounded-xl border border-purple-400/30 mt-4 lg:mt-8 hover:shadow-2xl hover:shadow-purple-500/[0.3] transition-all duration-300 hover:scale-102 hover:-translate-y-1'>
          <div className="flex justify-center items-center h-full flex-col px-2 md:px-4">
            <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base lg:text-lg xl:text-2xl max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-3xl mx-auto mb-4 md:mb-6 lg:mb-10">
              <LinkPreview
                url="https://gemini-clone-six-ruby.vercel.app/"
                className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
              >
                Gemini App 
              </LinkPreview>{" "}
              🚀User-friendly Interface: Greet users and suggest helpful prompt cards. 👋
Prompt Submission: Users can type a prompt in the search box or click on predefined prompt cards. 💬
Responsive Design: The app adjusts to various screen sizes. 📱
Result Display: The app shows the results once the prompt is sent, including a loading state until the response is ready.
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base lg:text-lg xl:text-2xl max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-3xl mx-auto mb-4 md:mb-6 lg:mb-10">
              Technologies Used 🧰: React.js, React Router, Sonner, Tailwind, Google OAuth, Vite ⚡, Version Management {" "}
        <LinkPreview url="https://github.com/RahulDev-01/Gemini-clone" className="font-bold text-blue-400">
          Git-Hub 
        </LinkPreview>{" "}
        and My GitHub Profile {" "} 
        <LinkPreview url="https://github.com/RahulDev-01" className="font-bold text-red-700">
          RahulDev-01 
        </LinkPreview>{" "}, Website is also hosted in Vercel Platform.       
            </p>
          </div>

        </div>
      </div>
      <div className='w-full flex flex-col lg:flex-row h-auto lg:h-[600px] p-4 md:p-6 lg:p-10 rounded-xl gap-4 lg:gap-5'>
        <CardContainer className="inter-var">
          <CardBody className="bg-black/20 backdrop-blur-md relative group/card hover:shadow-2xl hover:shadow-purple-500/[0.3] border-purple-400/30 w-full lg:w-auto lg:sm:w-[30rem] h-[400px] md:h-[450px] rounded-xl p-4 md:p-6 border">
            <CardItem translateZ="50" className="text-lg md:text-xl font-bold text-neutral-600 dark:text-white ">
            Interactive Map 🗺️   
            </CardItem>
            <CardItem as="p" translateZ="60" className="text-neutral-500 text-xs md:text-sm max-w-sm mt-2 dark:text-neutral-300">
            This project is a responsive web application displaying an interactive map with multiple city markers. It allows users to toggle between the standard Open Street Map and Satellite .
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <img
                src="/Projects/Map.png"
                height="1000"
                width="1000"
                className="h-48 md:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl transition-transform duration-300 group-hover/card:scale-105 group-hover/card:-translate-y-1"
                alt="thumbnail"
              />
              </CardItem>
              <div className="flex justify-between items-center m-4">
                <CardItem
                  translateZ={20}
                  as="a"
                  href="https://map-rahul.netlify.app/"
                  target="_blank"
                  className="px-3 md:px-4 py-2 rounded-xl text-xs font-normal text-gray-100  hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/50"
                >
                  Click Here →
                </CardItem>
              </div>
            </CardBody>
        </CardContainer>
        <div className='bg-black/20 backdrop-blur-sm w-full flex h-[400px] md:h-[450px] p-4 md:p-6 lg:p-10 rounded-xl border border-purple-400/30 mt-4 lg:mt-8 hover:shadow-2xl hover:shadow-purple-500/[0.3] transition-all duration-300 hover:scale-102 hover:-translate-y-1'>
          <div className="flex justify-center items-center h-full flex-col px-2 md:px-4">
            <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base lg:text-lg xl:text-2xl max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-3xl mx-auto mb-4 md:mb-6 lg:mb-10">
              <LinkPreview
                url="https://map-rahul.netlify.app/"
                className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
              >
                Interactive Map 
              </LinkPreview>{" "}
              🗺️  Interactive Map rendered with Leaflet.js 🌍
Markers for Delhi, Mumbai, Kolkata, Bengaluru, and New York 🏙️,  with info popups 💬
Zoom Controls on the top left 🔍
Satellite View Toggle Button positioned directly below the zoom controls 🌐
Button icon is fetched dynamically from an API 🔄 .
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base lg:text-lg xl:text-2xl max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-3xl mx-auto mb-4 md:mb-6 lg:mb-10">
              Technologies Used 🧰: React.js, React Router, Sonner, Tailwind, Google OAuth, Vite ⚡, Version Management {" "}
        <LinkPreview url="https://github.com/RahulDev-01/interactive-map-design" className="font-bold text-blue-400">
          Git-Hub 
        </LinkPreview>{" "}
        and My GitHub Profile {" "} 
        <LinkPreview url="https://github.com/RahulDev-01" className="font-bold text-red-700">
          RahulDev-01 
        </LinkPreview>{" "}, Website is also hosted in Vercel Platform.       
            </p>
          </div>

        </div>
      </div>
      {/* Bottom padding to ensure background covers all content */}
      <div className='h-20'></div>
    </div>
  )
}
export default Projects