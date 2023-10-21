import React from 'react'
import { setCourse } from '../../../../slices/courseSlice'
import Upload from './Upload'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { toast } from "react-hot-toast"
import { RxCross2 } from 'react-icons/rx'
import { useEffect } from 'react'

import { updateSubSection, createSubSection } from '../../../../services/operations/course'
const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues
    } = useForm()

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)


    useEffect(() => {
        setValue("courseName", modalData.title)
        setValue("lectureDesc", modalData.description)
        setValue("lectureVideo", modalData.videoUrl)
    }, [])

    // detect wehthwe thw form is upadte or not
    const isFormUpdate = () => {
        const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)

        if (
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ) {
            return true;
        }
        return false;
    }





    const handleEditSubSection = async () => {





    }
    const onSubmit = async (data) => {
        // console.log(data)
        if (view) return

        if (edit) {
            const info = {

                sectionId: modalData.sectionId,
                subSectionId: modalData._id,
                title: data.lectureTitle,
                description: data.lectureDesc,
                video: data.videoUrl

            }
            console.log(info);

            setLoading(true);
            const result = await updateSubSection(info, token)

            console.log("swecond result", result)
            if (result) {
                // console.log("result", result)
                // update the structure of course
                const updateCourseContent = course.courseContent.map((section) =>

                    section._id === modalData.sectionId ? result : section
                )
                const updatedCourse = { ...course, courseContent: updateCourseContent }
                dispatch(setCourse(updatedCourse))
            }
            setModalData(null)
            setLoading(false)
            return
        }

        const formData = new FormData()
        formData.append("sectionId", modalData)
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc)
        formData.append("video",data.lectureVideo)
        setLoading(true)

        // const info =
        // {
        //     sectionId: modalData,
        //     title: data.lectureTitle,
        //     description: data.lectureDesc,
        //     video: data.lectureVideo,
        //     courseId: course._id
        // }

        const result = await createSubSection(formData, token)
        if (result) {
            // update the structure of course
            console.log(result);
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(false)
    }




    return (
        <div className='absolute fixed -ml-36 mt-[-560px]  grid w-[1140px] place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
            <div className='my-10 ml-[-400px] flex flex-col justify-center items-center max-w-[600px] rounded-lg border border-richblue-400 bg-richblue-800'>
                {/* Modal Header */}
                <div className="flex items-center w-[100%] justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">
                        {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
                    </p>
                    <button onClick={() => (!loading ? setModalData(null) : {})}>
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>
                </div>
                {/* Modal Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8 px-8 py-10"
                >
                    {/* Lecture Video Upload */}
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />
                    {/* Lecture Title */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
                            Lecture Title {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <input
                            disabled={view || loading}
                            id="lectureTitle"
                            placeholder="Enter Lecture Title"
                            {...register("lectureTitle", { required: true })}
                            className="pl-10 form-style w-full px-3 py-2 rounded-lg text-white font-semibold outline-none bg-richblue-700"
                        />
                        {errors.lectureTitle && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture title is required
                            </span>
                        )}
                    </div>
                    {/* Lecture Description */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
                            Lecture Description{" "}
                            {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <textarea
                            disabled={view || loading}
                            id="lectureDesc"
                            placeholder="Enter Lecture Description"
                            {...register("lectureDesc", { required: true })}
                            className="pl-10 form-style w-full h-[150px] px-3 py-2 rounded-lg text-white font-semibold outline-none bg-richblue-700"
                        />
                        {errors.lectureDesc && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture Description is required
                            </span>
                        )}
                    </div>
                    {!view && (
                        <div className="flex justify-end">
                            <button type='submit'
                        className="hover:scale-90 transition-all duration-200 text-black bg-yellow-25 px-3 py-2 rounded-lg flex justify-center items-center"
                                disabled={loading}>
                                {loading ? "Loading.." : edit ? "Save Changes" : "Save"}
                            </button>
                        </div>
                    )}
                </form>


            </div>

        </div>
    )

}
export default SubSectionModal
