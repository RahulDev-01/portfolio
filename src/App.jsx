import { useRef, useState } from 'react'
// bg : #060010
import './App.css'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import HeroSection from './Components/HeroSection/HeroSection'

function App() {
  return (
  <>
  <div className='h-full w-full bg-[#060010]'>
    <Header />
    <HeroSection />

    
 {/* <Footer /> */}
 </div>
   
  </>
  )
}

export default App
