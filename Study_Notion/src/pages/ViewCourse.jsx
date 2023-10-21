import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/course';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures, updateCompletedLecture } from '../slices/viewCourseSlice';
import { useEffect } from 'react';
import VideoSideBar from '../components/core/viewCourse/VideoSideBar';
import CourseReviewModal from '../components/core/viewCourse/CourseReviewModal';

const ViewCourse = () => {
    const [reviewModal, setReviewModal] = useState("");
    const { courseId } = useParams()
    const { token } = useSelector((state) => state.auth);
    const {user}=useSelector((state)=>state.profile);
    const dispacth = useDispatch()
    console.log("id=>", courseId)



    const setCourseSpecificData = async () => {
        const courseData = await getFullDetailsOfCourse({courseId}, token);
        if (courseData) {
     

            dispacth(setCourseSectionData(courseData?.courseDetails?.courseContent));
            dispacth(setEntireCourseData(courseData?.courseDetails))

            const currentStudentEnrolled_index=courseData?.courseDetails?.studentsEnrolled.findIndex((student)=>(
                student._id===user._id
            ))

            dispacth(setCompletedLectures(courseData?.courseDetails?.studentsEnrolled?.[currentStudentEnrolled_index]?.courseProgress?.[currentStudentEnrolled_index]?.courseCompleate));

            console.log("compleated video",courseData?.courseDetails?.studentsEnrolled?.[currentStudentEnrolled_index]?.courseProgress?.[currentStudentEnrolled_index]?.courseCompleate)
            let lectures = 0;

            courseData?.courseDetails?.courseContent?.forEach((section) => {
                lectures += section.subSection.length
            })

            dispacth(setTotalNoOfLectures(lectures))
        }
        else {
            console.log("data not present");
        }

    }

    useEffect(() => {
        setCourseSpecificData()
    }, [])

    return (
        <>
            <div className="relative flex min-h-[calc(100vh-3.5rem)]">
                <VideoSideBar setReviewModal={setReviewModal} />

                <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                    <div className="mx-6">
                        <Outlet/>
                    </div>
                </div>
            </div>

            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}</>
    )
}

export default ViewCourse