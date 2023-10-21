import React from 'react'
import RenderStep from './RenderStep'

const index  = () => {
    return (
        <div className='relative calc(w-screen-40%) flex gap-10'>
            <div className='w-[60%]  text-white flex flex-col justify-center items-center'>
                <h1>Add course</h1>
                <div className=' w-[90%]'>
                    <RenderStep/>
                </div>
            </div>

            <div className='w-[40%] text-white mt-10'>
                <p> Code Upload Tips</p>
                <ul>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                </ul>
            </div>
        </div>
    )
}

export default index