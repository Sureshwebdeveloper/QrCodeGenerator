import React from 'react'
import Qrcode from './components/Qrcode'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='bg-gradient-to-b h-screen grid place-content-center from-[#833ab4da] via-[#fd1d1dde] to-[#fcb045df] pb-7'>
      <Qrcode /> 
      <Footer/>
    </div>
  )
}

export default App