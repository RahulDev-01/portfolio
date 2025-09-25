import { useRef, useState } from 'react'
// bg : #060010
import './App.css'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import HeroSection from './Components/HeroSection/HeroSection'
import Skills from './Skills/Skills'

function App() {
  return (
  <>
  <div className='h-full w-full bg-[#060010]'>
    <Header />
    <HeroSection />
    <Skills />

    
 {/* <Footer /> */}
 </div>
   
  </>
  )
}

export default App
