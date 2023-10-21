import React from 'react'
import ContactUsForm from './ContactUsForm'

const ContactFormSection = () => {
    return (
        <div className='w-[100%] mx-auto md:mt-20  flex flex-col justify-center items-center text-white gap-2'>
            <h1 className='md:text-[30px] md:font-bold'>
                Get in touch
            </h1>
            <p className='text-[14px] font-semibold'>
                We'd love here for you please fill out this form
            </p>

            <ContactUsForm className="mt-6" />


        </div>
    )
}

export default ContactFormSection