import React from 'react'
import Navbar from './components/Navbar'
// import UserLocation from './components/UserLocation'
import Slider from './components/Slider'

const App = () => {
  return (
    <div>
     <Navbar/>
     {/* <div className="min-h-screen flex justify-center items-center bg-gray-200"><UserLocation/></div> */}
     <Slider/>
    </div>
  )
}

export default App

