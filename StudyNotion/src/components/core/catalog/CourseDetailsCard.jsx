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
    <div>
      <img
        src={ThumbnailImage}
        alt="Thumbanil Image"
        className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl'
      >

      </img>
      <div>
        Rs.{CurrentPrice}
      </div>

      <div className='flex  flex-col  gap-y-6'>

        <button
          onClick={
            user && course?.studentsEnrolled.includes(user._id) ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse
          }
          className='flex flex-col gap-y-6'>
          {user && course?.studentsEnrolled.includes(user._id) ? "Go to course" : " Buy Now"}
        </button>

        {
          !course?.studentsEnrolled.includes(user._id) &&
          <button onClick={handleAddToCart}
            className='bg-yellow-50 w-fit text-richblack-900'>
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