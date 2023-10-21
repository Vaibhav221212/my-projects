import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { resetPassword} from '../services/operations/authAPI'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UpdatePassword = () => {
 const dispatch=useDispatch();
 const navigate=useNavigate();
    const [formData, setFormData] = useState(
        {
            password: "",
            confirmPassword: ""
        }
    )
    const location = useLocation();

    const changeHandler = (e) => {
        setFormData((preData) => ({
            ...preData,
            [e.target.name]: e.target.value
        }))
      
    }
    const token = location.pathname.split("/").at(-1)
    const { password, confirmPassword } = formData;

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(resetPassword(password,confirmPassword,token,navigate));
        console.log("m")
        
    }

    return (
        <div className='w-screen  flex justify-center items-center'>
            <div className='md:w-[35%] text-white flex justify-center md:mt-5 items-center md:gap-5 flex-col md:text-[17px] md:h-[450px] rounded-lg px-5  bg-richblue-800'>
                <h1 className='text-[24px] font-semibold'>
                    Choose new Password</h1>
                <p className=''>
                    Almost done. Enter your new password and youre all set.
                </p>
                <form onSubmit={submitHandler} className='flex justify-center items-center  gap-4 flex-col'>
                    <label className='flex flex-col gap-4' >
                        <p>
                            New Password
                        </p>
                        <input className='py-1 px-2 text-black rounded-lg border-none'
                            required
                            name="password"
                            value={password}
                            onChange={changeHandler}>
                        </input>


                    </label>
                    <label>
                        <p>
                            confirm Password
                        </p>

                        <input className='py-1 px-2 text-black rounded-lg'
                            required
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={changeHandler}>
                        </input>

                    </label>

                    <button type='submit' className='hover:scale-90 bg-yellow-50 text-black fonts rounded-lg px-2 py-1 w-[60%] mt-4' >
                        Reset Pasword
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdatePassword