import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteProfile } from '../../../../services/operations/Profile'
import {FiTrash2} from 'react-icons/fi'
import { useState } from 'react'
import ConfirmationModal from '../ConfirmationModal'

const DeleteAccount = () => {
  const [confirmationMOdal,setConfirmationModal]=useState("");

  const token=JSON.parse(localStorage.getItem("token"))
  const dispatch = useDispatch()
  const navigate = useNavigate()  


  async function handleDeleteAccount()
  {
    try{
      setConfirmationModal({
        text1: "Are you sure?",
        text2: "You will be logged out of your account.",
        btn1Text: "Logout",
        btn2Text: "Cancel",
        btn1Handler: () =>dispatch(deleteProfile(token,navigate)),
        btn2Handler: () => setConfirmationModal(null),
      })
     
    }
    catch(e)
    {
    console.log("ERROR MESSAGE - ", e.message)
    }
  }

  return (
    <div className="relative my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="w-3/5 text-pink-25">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer ring-1 md:py-2 md:px-3 rounded-lg hover:scale-90 outline-blue-600 italic text-pink-300"
            onClick={handleDeleteAccount}
          >
              delete my account.
          </button>
        </div>
         {
           confirmationMOdal && (<ConfirmationModal modalData={confirmationMOdal} />)
         }
      </div>
  )
}

export default DeleteAccount