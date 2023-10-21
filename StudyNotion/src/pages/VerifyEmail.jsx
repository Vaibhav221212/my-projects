import React, { useState } from 'react'
import OtpInput from "react-otp-input";
import { signUp } from '../services/operations/authAPI'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sendOtp } from '../services/operations/authAPI'


const VerifyEmail = () => {

  const { signupData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");

  const submitHandler = (e) => {

    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
     
    } = signupData;

    console.log(firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,)
    dispatch(signUp(accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
      navigate))

  }


  return (
    <div className='w-screen flex justify-center items-center'>
      <div className=' w-[30%] flex flex-col gap-3 items-center mt-10'>
        <h1>
          Enter you have sent Otp
        </h1>

        <form onSubmit={submitHandler}>
        <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />


          <div>
            <button type='submit'>
              submit
            </button>

            <button onClick={sendOtp(signupData.email)}>
              resend it
            </button>
          </div>
        </form>


      </div>
    </div>

  )
}

export default VerifyEmail