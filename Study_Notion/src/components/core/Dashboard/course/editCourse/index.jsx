import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../../../../../services/operations/course'
import { setEditCourse, setCourse } from '../../../../../slices/courseSlice'
import RenderStep from '../RenderStep'

const EditCourse = () => {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  console.log("courseId",courseId);
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const token = JSON.parse(localStorage.getItem("token"))


  useEffect(() => {
    console.log(courseId);
    const fetchCourse = async() => {
      setLoading(true);
      const result = await getFullDetailsOfCourse({courseId}, token)

      if (result?.courseDetails) {
        dispatch(setEditCourse(true))
        dispatch(setCourse(result?.courseDetails))
      }
      setLoading(false)
    }
    fetchCourse();
  }, [])



  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  return (
    <div className='text-white'>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>
      <div className="mx-auto max-w-[600px]">
        {
          course ? (<RenderStep />)
            : (<p className="mt-14 text-center text-3xl font-semibold text-richblack-100">Course Not Found</p>)
        }
      </div>
    </div>
  )
}

export default EditCourse