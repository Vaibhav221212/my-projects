import React, { useState } from 'react'
import { changePassword } from '../../../../services/operations/Profile'
import Iconbtn from '../Iconbtn'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {FaEyeSlash} from 'react-icons/fa'
import {BsEyeFill} from 'react-icons/bs'
import { useDispatch } from 'react-redux'


const UpdatePassword = () => {
  const dispacth=useDispatch()
  const token = JSON.parse(localStorage.getItem("token"))
  const navigate = useNavigate()

  const [showPassword, setShowPasword] = useState()
  const [showConfirmPassword, setShowConfirmPAssword] = useState();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    console.log("passord data,", data)

    try {
      await dispacth( changePassword(token, data));
    }
    catch (e) {
       console.log("error message",e.message)
    }
  }
  return (
    <div>
 <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 text-white flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg t font-semibold text-richblack-5">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="oldPassword" className="lable-style font-semibold ">
                Current Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="form-style p-2 rounded-lg bg-richblack-900 text-white outline-none"
                {...register("oldPassword", { required: true })}
              />
              <span
                onClick={() => setShowPasword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <BsEyeFill  fontSize={24} fill="#AFB2BF" />
                ) : (
                  <FaEyeSlash fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}
            </div>
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="lable-style font-semibold">
                New Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="form-style p-2 rounded-lg bg-richblack-900 text-white outline-none"
                {...register("newPassword", { required: true })}
              />
              <span
                onClick={() => setShowConfirmPAssword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <BsEyeFill  fontSize={24} fill="#AFB2BF" />
                ) : (
                  < FaEyeSlash fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <button type='submit' className="bg-yellow-25  py-2 px-5 rounded-lg hover:scale-90 transition-all duration-200">Save</button>
        </div>
      </form>
    </div>
  )
}

export default UpdatePassword