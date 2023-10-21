import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../../../services/operations/course'
import { VscAdd } from 'react-icons/vsc'
import CourseTable from './CourseTable'
import toast from 'react-hot-toast'
import { apiConnector } from '../../../../../services/apiconnector'

const MyCorses = () => {
  const token = JSON.parse(localStorage.getItem("token"))
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    var fetchCorses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {

        await setCourses(result);
      }
    }
    fetchCorses()
  }, [])

  const delteAllCourse = async () => {
    const toastId = toast.loading("deleting..,");

    try {
      const result = await apiConnector("DELETE", "/deleteAllCourse")
      if (result.data.success) {
        toast.success("deleted All Courses.,");
        const result = await fetchInstructorCourses(token)
        if (result) {

          await setCourses(result);
        }
      }
    }
    catch (e) {

    }
    toast.dismiss(toastId);

  }
  return (
    <div className='relative'>
      <div className="mb-14 flex  items-center justify-between relative">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>

        <div className='w-[50%] gap-3 flex justify-center items-center'>

          <button className='px-3 flex justify-center items-center gap-2 text-black font-semibold py-2 rounded-lg bg-richblue-600 text-white hover:scale-90 transition-all duration-200'
            onClick={delteAllCourse}>
            Delete All courses
          </button>

          <button
            onClick={() => navigate("/dashboard/add-course")}
            className='px-3 flex justify-center items-center gap-2 text-black font-semibold py-2 rounded-lg bg-yellow-5 hover:scale-90 transition-all duration-200'
          >
            Add Course
            <VscAdd />
          </button>
        </div>
      </div>


      {courses && <CourseTable courses={courses} setCourse={setCourses} />}
    </div>
  )
}

export default MyCorses;