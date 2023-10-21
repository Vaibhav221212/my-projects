import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useRef } from 'react';
import { render } from 'react-dom';
import { useEffect } from 'react';
import Iconbtn from '../Iconbtn'
import { FiUpload } from 'react-icons/fi'
import { updateDisplayPicture } from '../../../../services/operations/Profile';
import { getUser } from '../../../../services/operations/Profile';

const ChnageProfilePicture = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const { user, setUser } = useSelector((state) => state.profile);
  const dispatch = useDispatch()


  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      console.log("uploading...")
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
    

      dispatch(updateDisplayPicture(formData, token)).then(() => {
        //  const User= getUser(user._id,token);

        //  if(User)
        //  {
        //     dispatch(setUser(User));
        //  }
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])


  return (
    <div className='flex items-center justify-between rounded-md border-[1px] border-richblue-700 bg-richblue-800 p-8 px-12 text-richblue-5'>
      <div className='flex flex-col md:flex-row ml-[-30px] md:ml-0 items-center gap-x-10'>
        <img src={user?.image}
          alt={`profile-${user?.firstName}`}
          className='aspect-square w-[78px] rounded-full object-cover'
        >
        </img>

        <div className='flex justify-center items-start gap-5 flex-col'>
          <p className='text-[16px] font-semibold'>Chnage profile picture</p>
          <div className='flex flex-row gap-6'>
            <input type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              className='hidden'
              accept="image/png, image/gif, image/jpeg,"
            >
            </input>
            <button
              onClick={handleClick}
              disabled={loading}
              className='md:px-2 md:py-2 cursor-pointer rounded-md bg-richblue-700 py-2 font-semibold text-richblue-50'
            >
              Select

            </button>
            <button

              onClick={handleFileUpload}
            >
              {loading ? "uploading..." : "upload"}

              {
                !loading && (
                  <FiUpload className="text-lg text-richblue-900" />
                )
              }
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ChnageProfilePicture