import React from 'react'
import { FaRocketchat } from 'react-icons/fa'
import {GiEarthAfricaEurope} from 'react-icons/gi'
import ContactUsForm from '../components/core/About/ContactUsForm'
import {BiSolidPhoneCall} from 'react-icons/bi'

const ContactUs = () => {
    return (
        <div className='w-screen text-white bg-richblack-900 flex justify-center items-center'>
            <div className='w-[90%] mt-10 flex flex-col md:flex-row justify-center gap-5 items-center '>
                <div className=' text-[12px] md:text-[14px] w-[90%] md:w-[35%] bg-pure-greys-600 flex px-5 py-9 flex-col gap-10 px-2 py-3 rounded-lg'>
                    <div className='w-[90%] md:w-[80%]'>
                        <div className='flex gap-3 items-center'> <FaRocketchat /> <h1 className='text-2xl font-semibold'>Chat on us</h1> </div>
                        <p className='w-[55%]'>Come and say hello at our office HQ. CodePlay Office, Bhopal-462022</p>
                    </div>

                    <div>

                        <div className='flex gap-3 items-center'> <GiEarthAfricaEurope/> <h1 className='text-2xl font-semibold'>Chat on us</h1> </div>
                        <p className='w-[55%]'>Mon - Fri From 8am to 5pm +123 456 7869</p>
                    </div>

                    <div className=''>
                        <div className='flex gap-3 items-center'> <BiSolidPhoneCall /> <h1 className='text-2xl font-semibold'>Chat on us</h1> </div>
                        <p className='w-[55%]'>Mon - Fri From 8am to 5pm +123 456 7869</p>
                    </div>
                </div>


                <div className='md:w-[60%] mt-20 flex justify-center items-center rounded-lg '>
                   <ContactUsForm className="w-[100%]"/>
                </div>
            </div>
        </div>
    )
}

export default ContactUs