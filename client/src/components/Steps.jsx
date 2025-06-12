import React from 'react'
import { assets } from '../assets/assets'

const Steps = () => {
    return (
        <div className='mx-4 lg:mx-44 py-20 xl:py-40 '>

            <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>Steps to remove background <br /> image in seconds.</h1>

            <div className=' flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center'>

                <div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
                    <img className='max-w-9' src={assets.upload_icon} alt="" />
                    <div>
                        <p className='text-xl font-medium'>Upload image</p>
                        <p className='text-sm text-neutral-500 mt-1'>Easily upload your image or video to get started. <br/>Our system will automatically extract frames from <br/> your video or accept standalone images for background removal.</p>
                    </div>
                </div>

                <div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
                    <img className='max-w-9' src={assets.remove_bg_icon} alt="" />
                    <div>
                        <p className='text-xl font-medium'>Remove background</p>
                        <p className='text-sm text-neutral-500 mt-1'>With a single click, remove the background from your<br/> images using advanced AI-powered tools. Clean,<br/> accurate, and ready-to-use results in seconds.</p>
                    </div>
                </div>

                <div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
                    <img className='max-w-9' src={assets.download_icon} alt="" />
                    <div>
                        <p className='text-xl font-medium'>Download image</p>
                        <p className='text-sm text-neutral-500 mt-1'>Once processing is complete, preview and download your<br/> final image with the background removed — perfect for <br/> designs, presentations, and more. </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Steps