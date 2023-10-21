import React from 'react'
import { createSection, updateSection } from '../../../../services/operations/course'
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import {IoAddCircleOutline} from 'react-icons/io5'
import NestedView from './NestedView'


const CourseBuilderForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm()

  const { course } = useSelector((state) => state.course)
  const token = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [editSectionName, setEditSectionName] = useState(null)
  const dispatch = useDispatch();


  // handle form submission
  const onSubmit = async (data) => {
    setLoading(true)
    let result;

    if (editSectionName) {
      result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id

      }
        , token)
    }
    else {
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id
      }, token)
    }

    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "");

    }
    setLoading(false);
  }


  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "");

  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("please add atleast one section ")
    }

    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("please add atleast one subSection ")
    }
    dispatch(setStep(3));
    return
  }

  const goTOBack = () => {
    dispatch(setStep(2))
    dispatch(setEditCourse(true))
  }
  return (
    <div className='relative space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblue-700 p-6 '>
      <p className='text-2xl font-semibold text-richblue-5 '>
        Course Builder
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex flex-col scroll-py-2'>
          <label htmlFor='sectionName' className=' text-sm text-richblue-5'>
            Section Name
          </label>
          <input  type='text' id='sctionName' disabled={loading}
          placeholder='add a section to build your course '
          {...register("sectionName",{required:true})}
          className="pl-10 form-style w-full px-3 py-2 rounded-lg text-white font-semibold outline-none bg-richblue-900 mt-3">
          </input>
       
        </div>

        <div className='flex items-center gap-x-4'>
           <button type='submit' 
           className='hover:scale-90 transition-all duration-200  flex cursor-pointer items-center gap-x-2 rounded-md bg-richblue-300 py-2 text-white px-[20px] font-semibold text-richblue-900'
           disabled={loading}
           >
            {
              editSectionName ? " Edit Section Name":"Create Section"
            }
            <IoAddCircleOutline size={20} className="text-yellow-50" />
             
           </button>

           <button type='button'
           onClick={cancelEdit}>
            {editSectionName && <span>Cancel Edit </span>}

           </button>
        </div>

      </form>
      {
        course.courseContent.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
      }
      {/*next and prev button */}

      <div className='flex justify-end gap-x-3'>
        <button onClick={goTOBack}
        className={`hover:scale-90 transition-all duration-200 flex cursor-pointer items-center gap-x-2 rounded-md bg-richblue-300 py-2  px-[20px] font-semibold text-richblue-900`}>
          Back
        </button>

        
        <button onClick={goToNext}
        className={` hover:scale-90 transition-all duration-200  flex cursor-pointer items-center gap-x-2 rounded-md bg-richblue-300 py-[8ox] px-[20px] font-semibold text-richblue-900`}>
          Next
        </button>

      </div>

    </div>
  )
}

export default CourseBuilderForm