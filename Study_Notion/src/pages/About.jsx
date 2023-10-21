import React from 'react'
import Highlighttext from '../components/core/Homepage/Highlighttext'
import img1 from '../assets/Images/aboutus1.webp'
import img2 from '../assets/Images/aboutus2.webp'
import img3 from '../assets/Images/aboutus3.webp'

import img4 from '../assets/Images/FoundingStory.png'
import StatsComponent from '../components/core/About/Stats'
import LearningGridArray from '../components/core/About/LearningGridArray'
import ContactFormSection from '../components/core/About/ContactFormSection'
import ReviewSlider from '../components/common/ReviewSlider'

const About = () => {
    return (
        <div className='w-screen flex text-white flex-col bg-richblack-900 justify-center items-center mx-auto'>

            <div className='w-[100%] flex font-semibold justify-center items-center mx-auto gap-10 flex-col'>

                {/* section-one */}
                <div className=' w-[100%] mt-9 text-white flex bg-richblack-600 justify-center items-center mx-auto gap-10 flex-col'>

                    <div className='md:w-[70%] mt-5 md:mt-20 w-[80%] flex justify-center items-center mx-auto gap-3  flex-col '>
                        <h1 className='text-[13px] md:text-4xl flex justify-center items-center mx-auto text-center '>
                            Driving Innovation in Online Education for a Brighter Future
                        </h1>
                        <div className='md:text-5xl text-[14px]'><Highlighttext text={"Brighter Future"}></Highlighttext></div>

                        <p> Studynotion is at the forefront of driving innovation in online education. We're passionate
                            about creating a brighter future by offering cutting-edge courses, leveraging
                            emerging technologies, and nurturing a vibrant learning community.</p>

                    </div>

                    <div className='w-[70%] md:w-[100%] flex flex-col md:flex-row justify-center items-center gap-10 w-[100%] md:mt-[200px]'>
                        <div className='rotate-6 md:rotate-0 shadow-xl shadow-yellow-100'>
                            <img src={img1} ></img>
                        </div>

                        <div className='relative -rotate-6 shadow-xl shadow-blue-200'>
                            <div className='absolute  z-10'></div>
                            <img src={img2} className='z-50'></img>
                        </div>
                        <div className='rotate-6 shadow-xl shadow-pink-200'>
                            <img src={img3}></img>
                        </div>
                    </div>




                </div>

                {/* section-2 */}

                <div className='text-[12px] w-[100%] flex flex-col text-brown-5 justify-center gap-10 items-center flex-col md:w-[85%] ' >
                    <p className='w-[85%] md:w-[80] mt-5 md:mt-[150px] text-[12px] md:text-[30px]'>
                        We are passionate about revolutionizing the way we learn. Our innovative platform
                        combines technology<span>expertise,</span> <span>and community to </span>
                        <span> create an </span>unparalleled educational experience.
                    </p>

                    <div className='w-[90%] md:mt-14 flex flex-col-reverse md:flex-row gap-14 justify-between items-center'>

                        <div className='w-[94%] md:w-[60%] text-brown-5  flex justify-center items-start gap-2 flex-col'>
                            <h1>
                                Our Founding Story
                            </h1>
                            <div className='md:w-[100%] flex flex-col gap-3 md:text-[14px]'>
                                <p>
                                    Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                                </p>
                                <p>
                                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                                </p>
                            </div>
                        </div>

                        <div className='md:w-[60%]'>
                            <img src={img4}></img>
                        </div>

                    </div>

                    <div className='w-[90%] md:mt-14 flex gap-14 justify-between items-center'>

                        <div className='w-[70%] text-brown-5  flex justify-center items-start gap-2 flex-col'>
                            <h1>
                                Our Founding Story
                            </h1>
                            <div className='md:w-[100%] flex flex-col gap-3 md:text-[14px]'>
                                <p>
                                    With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                                </p>
                            </div>
                        </div>
                        <div className='w-[70%] text-brown-5  flex justify-center items-start gap-2 flex-col'>
                            <h1>
                                Our Founding Story
                            </h1>
                            <div className='md:w-[100%] flex flex-col gap-3 md:text-[14px]'>
                                <p>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                            </div>
                        </div>
                    </div>

                </div>




                {/* section-3 */}
                <div className='w-screen h-[100px] px-10 py-5 bg-richblack-800 text-brown-5'>
                    <StatsComponent />
                </div>


                <section className='mx-auto w-[85%] flex flex-col justify-center items-center  gap-5 mt-3 md:mt-[100px] mb-[15px]'>
                    <LearningGridArray />
                    <ContactFormSection />


                    {/* Review Slider */}
                    <div className=' mx-auto ml-[-140px] w-[1380px] flex flex-col justify-center gap-3 flex-col'>
                        <h1 className='text-white text-center text-4xl font-semibold opacity-80'>
                            Reviews from other learners
                        </h1>
                        <ReviewSlider  className="mr-[100px]"/>

                    </div>

                </section>

            </div>

        </div >
    )
}

export default About