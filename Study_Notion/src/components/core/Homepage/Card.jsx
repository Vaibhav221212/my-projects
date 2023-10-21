import React from 'react'
import CTAButton from './Button'

const Card = ({heading,subheading,ctabtn1,ctabtn2}) => {
  return (
    <div className='w-[100%] rounded-md flex justify-center mx-auto  w-[40%] items-center'>
          <div className='w-[80%] flex flex-col gap-4 md:justify-center md:items-center'>
      
        {heading}
      

        {/* sun heading */}
        <div className='text-richblue-300 px-9 md:w-[] text-[14px] flex flex-wrap flex-col md:text-[18px] md:w-[400px]   font-bold w-[100%]'>
          {subheading}  
        </div>

        {/* Buttons */}
        <div className='flex-col md:flex-row flex items-center justify-center gap-6 mt-3'>
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className='flex gap-2 items-center'>
              {ctabtn1.btntext}
               </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btntext}
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default Card