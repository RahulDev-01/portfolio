import React from 'react'
import Hyperspeed from '../Components/ui/Hyperspeed';
import PixelTrail from '../Components/ui/PixelTrail';
import SplashCursor from '../Components/ui/SplashCursor'
import { CardContainer, CardBody, CardItem } from '../Components/ui/3d-card'
import { motion } from "motion/react";
import { LinkPreview } from "../Components/ui/link-preview";

function Projects() {
  return (
    <div className='relative text-white h-screen w-full overflow-hidden'>
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
      <div className='relative z-10 h-full flex flex-col items-start justify-start'>
        <div className='w-full'>
          <h1 className='text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent m-10 animate-gradient-x'>
            My Projects
          </h1>
          {/* Main Div */}
          <div className='w-full flex h-[600px] p-10 rounded-xl gap-5'>
            <CardContainer className="inter-var">
              <CardBody className="bg-black/20 backdrop-blur-md relative group/card hover:shadow-2xl hover:shadow-purple-500/[0.3] border-purple-400/30 w-auto sm:w-[30rem] h-[450px] rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  Destin Ai
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  It is an intelligent web application designed to simplify and enhance the travel planning experience 🌍. The leverages AI-powered recommendations, custom itineraries, and real-time notifications to help users plan their perfect trips. 
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <img
                    src="../public/Projects/DestinAi.png"
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl transition-transform duration-300 group-hover/card:scale-105 group-hover/card:-translate-y-1"
                    alt="thumbnail"
                  />
                </CardItem>
                <div className="flex justify-between items-center m-4">
                  <CardItem
                    translateZ={20}
                    as="a"
                    href="https://destinai-rahul.vercel.app/"
                    target="__blank"
                    className="px-4 py-2 rounded-xl text-xs font-normal text-gray-100 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/50"
                  >
                    Click Here →
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
            {/* Right Section */}
            <div className='bg-black/20 backdrop-blur-sm w-full flex h-[450px] p-10 rounded-xl border border-purple-400/30 mt-8'>
            <div className="flex justify- items-center h-[40rem] flex-col px-4">
      <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto mb-10">
        <LinkPreview
          url="https://destinai-rahul.vercel.app/"
          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
        >
          Destin-AI
        </LinkPreview>{" "}
         an intelligent travel planning application"
         AI-Powered Destination Suggestions 🏝️, Custom Itinerary Creation 🗺️, Google OAuth Integration 🔒. Plan smarter with powerful features Everything you need to craft the perfect trip—without the spreadsheets.
      <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mt-10 mx-auto">
        Technologies Used 🧰  : React.js , React Router , Sonner , Tailwind , Google OAuth, Vite ⚡, Version Management {" "}
        <LinkPreview url="https://github.com/RahulDev-01/Destin-ai" className="font-bold text-blue-400">
          Git-Hub 
        </LinkPreview>{" "}
        and My GitHub Profile {" "} 
        <LinkPreview url="https://github.com/RahulDev-01" className="font-bold text-red-700">
          RahulDev-01 
        </LinkPreview>{" "} , Website is also hosted in Vercel Platform .       
      </p>

      </p>
    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects