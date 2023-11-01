import React from 'react'
import Image from './Image'

const ImageGallery = () => {
  return (
    <div className='md:w-[80%] lg:w-[90%] w-full bg-[#ffffff] md:h-[90%] h-full flex rounded-lg shadow-xl overflow-y-auto'>
      <Image/>
    </div>
  )
}

export default ImageGallery