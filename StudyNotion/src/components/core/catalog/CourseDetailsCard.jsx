import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { ACCOUNT_TYPE } from '../../../utils/constant';
import { addToCart } from '../../../slices/cartSlice';

import toast from 'react-hot-toast';
const CourseDetailsCard = ({ course, setConfirmationModal, handleBuyCourse }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const
    {
      thumbnail: ThumbnailImage,
      price: CurrentPrice

    } = course

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("you are Istructor you cant buy this course");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return
    }

  }

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copy successfully..,");
    return;
  }

  return (
    <div className='bg-richblack-600 right-20 p-5 rounded-lg w-[25%] z-30 absolute opacity-80 flex flex-col justify-center items-center gap-3 '>
      <img
        src={ThumbnailImage}
        alt="Thumbanil Image"
        className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl'
      >

      </img>

      <div className='flex  w-[80%] py-2 justify-between items-center'>
        <div>
          Rs.{CurrentPrice}
        </div>
        <button
          onClick={
            user && course?.studentsEnrolled.includes(user._id) ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse
          }
          className='flex justify-center items-center px-3 rounded-lg  bg-black text-richblack-25 py-2 '>
          {user && course?.studentsEnrolled.includes(user._id) ? "Go to course" : " Buy Now"}
        </button>
      </div>

      <div className='flex  flex-col  gap-y-6'>



        {
          !course?.studentsEnrolled.includes(user._id) &&
          <button onClick={handleAddToCart}
            className='bg-yellow-50  text-richblack-900 w-[100%] px-20 rounded-lg py-2'>
            Add to Cart
          </button>
        }
      </div>
      <div>
        <p>
          30-Day Money-Back Guranteed
        </p>
        <p>
          This course Includes:
        </p>
        <div className='flex flex-col gap-y-3'>
          {
            course?.instructions?.map((item, index) => {
              <p key={index} className='flex  gap-2'>
                <span>{item}</span>
              </p>
            })
          }
        </div>
      </div>
      <button onClick={handleShare}
        className='mx-auto  flex items-center gap-2 text-yellow-50'
      >
        Share
      </button>


    </div>
  )
}

export default CourseDetailsCard