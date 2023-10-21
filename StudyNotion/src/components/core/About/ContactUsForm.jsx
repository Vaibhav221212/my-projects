import React from 'react'
import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CountryCode from '../../../data/countrycode.json'
import { contactUs } from '../../../services/operations/authAPI';
import { useDispatch } from 'react-redux';
const ContactUsForm = () => {

  const [loading, setLoadnig] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm();

  const dispatch= useDispatch();
const submitContactForm=(data)=>
{
  console.log(data)
   const name=`${data.firstname}${" "}${data.lastname}`;
   const e_mail=data.email;
   const phone_no=data.phonenumber;
   const message=data.message;

  const body={
    name,
    e_mail,
    phone_no,
    message
  }
  dispatch(contactUs(body));
}


useEffect(()=>{
 
  if(isSubmitSuccessful)
  {
    reset({
      email:"",
      firstname:"",
      lastname:"",
      message:"",
      phone_no:""
    })
  }
})

  return (
    <form onSubmit={handleSubmit(submitContactForm)} className='mt-4 text-[12px] font-normal md:text-[17px] w-[95%] md:w-[55%] py-2 px-2 flex flex-col justify-center items-center'>
      <div className='w-[100%] flex flex-col gap-14'>

        <div className=' w-[100%] flex flex-col  md:mt-4'>


          <div className='w-[100%] flex justify-between items-center gap-2'>

            {/* firstname */}
            <div className=' flex flex-col gap-1 py-1 w-[50%]'>
              <label htmlFor='firstname'>
                first Name
              </label>
              <input
                typeof='text'
                name='firstname'
                id='firstname'
                placeholder='Enter your First name'
                className='px-3 py-2  outline-0 rounded-lg bg-pure-greys-600 text-white border-none w-[100%]'
                {...register("firstname", { required: true })}>
              </input>

              {
                errors.firstname && (
                  <span className='text-[11px] md:text-[12px] text-yellow-50'>Please enter first name</span>
                )

              }
            </div>


            {/* lastname */}
            <div className='flex flex-col gap-1 w-[50%]'>
              <label htmlFor='lastname'>
                Last Name
              </label>
              <input
                type='text'
                id='lastname'
                name='lastname'
                className='w-[100%] px-3 py-2 outline-0 bg-pure-greys-600 rounded-lg text-white border-none'
                placeholder='enter lastname'
                {...register("lasttname", { required: true })}>
              </input>
            
              {
                errors.lasttname && (
                  <span className='text-[11px] md:text-[12px] text-yellow-50'>Please enter last name</span>
                )

              }
            </div>

          </div>




          {/* email */}
          <div className='flex flex-col mt-7 gap-1  w-[100%]'>
            <label htmlFor='email'>
              Email
            </label>

            <input
              type='email'
              id='email'
              name='email'
              placeholder='email'
              className=' w-[100%] px-3 border-b-blue-200 outline-0 py-2 bg-pure-greys-600  rounded-lg  text-white border-none'
              {...register("email", { required: true })}>
            </input>
            {
              errors.email && (<span className=' text=[11px] md:text-[12px] text-yellow-50'>please enter your email adreess</span>)
            }
          </div>

          {/* phoneNO */}
          <div className='flex flex-col gap-1  mt-3 w-[100%]'>
            <label>
              phone no
            </label>

            <div className='flex justify-between items-center gap-2 w-[100%] '>
              {/* gropdown */}

              <select
                name='dropdown'
                id='dropdown'
                className='w-[30%] px-3 outline-0 py-2 bg-pure-greys-600  rounded-lg  text-white border-none md:w-[80px]'
                {...register("dropdown", { required: true })}>
                {
                  CountryCode.map((element, index) => {
                    return (
                      <option key={index} value={element.code}  className=''>
                        {element.code} -{element.country}
                      </option>
                    )
                  })
                }
              </select>

              <input type='number'
                name='phonenumber'
                id='phonenumber'
                placeholder='98786561390'
                className=' w-[65%] md:w-[80%] outline-0 select-none px-3 flex justify-between items-center  py-2 rounded-lg bg-pure-greys-600 text-white border-none w-[calc(100%-100px)]'
                {...register("phonenumber",
                  {
                    required: { value: true, message: "Please enter phon number" },
                    maxLength: { value: 10, message: "Invalid phone number " },
                    minLength: { value: 8, message: "Invalid phone number" }
                  })}>
              </input>
              {
                errors.phonenumber && (
                  <span className='text-[11px] md:text-[12px] text-yellow-50'>{errors.phonenumber.message}</span>
                )
              }
            </div>

            {/* message */}
            <div className='flex flex-col  md:mt-3 gap-1 mt-2'>
              <label>
                Message
              </label>
              <textarea
                name='message'
                id='message'
                cols="30"
                className='px-3 py-2 bg-pure-greys-600 outline-0  rounded-lg  text-white border-none'
                rows="7"
                placeholder='Enter your message'
                {
                ...register("message", { required: true })
                }>
              </textarea>
              {
                errors.message && (<span className=' text-[11px] md:text-[12px] text-yellow-50'>Please enter your message</span>)
              }
            </div>
          </div>
        </div>
      </div>
      <button type='submit' className='mt-4 hover:scale-90 outline-0  rounded-md bg-yellow-200 py-2 px-2 text-center px-6 text-[16px] font-bold text-black md:w-[50%]' >
        send message
      </button>
    </form>
  )
}

export default ContactUsForm