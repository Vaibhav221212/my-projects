import React from 'react'
import Highlighttext from './Highlighttext'
import know_your_progress from '../../../assets/Images/Know_your_progress.png';
import compare_with_others from '../../../assets/Images/Compare_with_others.png';
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './Button'

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-32'>
      <div className='flex flex-col gap-5 items-center justify-center '>
        <div className='md:text-4xl text-2xl font-semibold text-center'>
          Your Swiss Knife for
          <Highlighttext text={"learning any language"}></Highlighttext>
        </div>

        <div className='flex  w-[400px] justify-center items-center px-14 md:p-0 md:w-[40%]'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex  md:flex-row  flex-col w-[20%] md:w-[40%] items-center justify-center mt-5'>
          <img
            src={know_your_progress}
            alt="know your weather"
            className='object-contain -mr-32'
          />

          <img
            src={compare_with_others}
            className='object-contain'
          >
          </img>

          <img
            src={plan_your_lesson}
            className='object-contain -ml-36'>

          </img>
        </div>

        <div>

          <CTAButton active={true} linkto={"signup"}>
            <div>
              Learn More
            </div>
          </CTAButton>
        </div>
      </div>

    </div>
  )
}

export default LearningLanguageSection