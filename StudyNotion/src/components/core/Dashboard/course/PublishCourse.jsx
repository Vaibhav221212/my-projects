import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { COURSE_STATUS } from '../../../../utils/constant'
import { setStep, resetCourseState } from '../../../../slices/courseSlice'
import { editCourseDetails } from '../../../../services/operations/course'

const PublishCourse = () => {

  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const token = JSON.parse(localStorage.getItem("token"))
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("publish", true)
    }
  }, [])

  const goToBack = () => {
    dispatch(setStep(2));
  }

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses");
  }

  const handleCoursePublish = async () => {

    //if course allredy published
    if (getValues("publish")) {
      goToCourses();
      return;
    }

    const info = {
      courseId: course._id,
      status: "Published"
    }
    setLoading(true);
    const result = await editCourseDetails(info, token)

    if (result) {
      goToCourses();
      setLoading(false);
      return;
    }
  }

  const onSubmit = (data) => {

    handleCoursePublish()
  }
  return (
    <div className='relative rounded-md border-[2px] border-blue-700 border-dotted border-spacing-1 bg-richblue-800 p-6'>
      <div className='text-2xl font-semibold text-richblack-5'>
        Publish Setting
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* checkBox */}

        <div className='my-6 mb-8'>
          <label htmlFor='public' className='inline-flex items-center text-lg'>
            <input
              type='checkbox'
              id='public'
              {...register("public")}
              className='border-pure-greys-300 h-4 w-4  rounded bg-richblue-500 text-richblue-400 focus:right-5'
            >
            </input>
            <span className="ml-2 text-richblack-400">
              Make this course as public
            </span>



          </label>
        </div>

        {/* nnext prev button */}

        <div className='ml-auto flex max-w-max items-center gap-x-4'>

          <button
            type='button'
            className="flex px-3 py-  hover:scale-90 transition-all duration-200 cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
            disabled={loading}
            onClick={goToBack}

          >
            goToBack

          </button>


          <button
            className='px-3 text-black font-semibold py-2 rounded-lg bg-yellow-5 hover:scale-90 transition-all duration-200'
            disabled={loading}
            type='submit'>
            Save Changes
          </button>



        </div>
      </form>
    </div>
  )
}

export default PublishCourse