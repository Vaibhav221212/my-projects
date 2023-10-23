import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../../../services/operations/courseBuy'
import toast from 'react-hot-toast'
import { apiConnector } from '../../../services/apiconnector'
import { useState } from 'react'
import avgRating from '../../../utils/avgRating';
import RatingStars from '../../common/RatingStars'
import CourseDetailsCard from './CourseDetailsCard'
import formatDate from '../../../services/formatDate'
import CourseAccordionBar from './CourseAccordionBar'


const CourseDetails = () => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.profile);
    const { paymentLoading } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [courseData, setCourseData] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    useEffect(() => {
        const getCourseFullDetails = async () => {
            try {
                const result = await apiConnector("POST", "/getCourseDetails", { courseId })
                console.log("Printing CourseData-> ", result);
                setCourseData(result);
            }
            catch (error) {
                console.log("Could not fetch coursse details");
            }
        }
        getCourseFullDetails();

    }, [courseId]);

    const [avgReviewCount, setAverageReviewCount] = useState(0);

    useEffect(() => {
        const count = avgRating(courseData?.data?.data?.ratingAndReviews);
        setAverageReviewCount(count);
    }, [courseData])

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(() => {
        let lectures = 0;
        courseData?.data?.data?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures);

    }, [courseData]);


    // // Collapse all
    // const [collapse, setCollapse] = useState("")
    const [isActive, setIsActive] = useState(Array(0))
    const handleActive = (id) => {
        // console.log("called", id)
        setIsActive(
            !isActive.includes(id)
                ? isActive.concat([id])
                : isActive.filter((e) => e != id)
        )
    }



    const handleBuyCourse = () => {

        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1: "you are not Logged in",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })

    }

    if (loading || !courseData) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (!courseData) {
        return (
            <div>
                error
            </div>
        )
    }
    const {
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData.data?.data;
    console.log("courseContent", courseContent)

    return (
        <div className='flex flex-col relative  text-white'>

            <div className=' text-[17px] text-richblue-5 z-20 font-semibold text-richblue-5 translate-x-2 flex flex-col md:flex-row justify-between p-10 pr-20'>

                <div className='flex justify-start mt-10 items-start gap-4 flex-col'>
                    <p className='text-5xl font-bold  '>{courseName}</p>
                    <p className='text-richblack-200'>{courseDescription}</p>
                    <div className='flex gap-2'>
                        <span>{avgReviewCount}</span>
                        <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                        <span>{`(${ratingAndReviews.length} reviews) `}</span>
                        <span>{`${studentsEnrolled.length} students enrolled`}</span>
                    </div>

                    <div>
                        <p>Created By {`${instructor.firstName}`}</p>
                    </div>

                    <div className='flex gap-x-3'>
                        <p>
                            Created At {formatDate(createdAt)}
                        </p>
                        <p>
                            {" "} English
                        </p>
                    </div>
                </div>
                <div className=' p-5 z-10'>
                    <CourseDetailsCard
                        course={courseData?.data?.data}
                        setConfirmationModal={setConfirmationModal}
                        handleBuyCourse={handleBuyCourse}
                    />


                </div>

            </div>

            <div className='w-[100%] bg-black  z-0 flex flex-col gap-5 py-8 justify-center items-start flc opacity-70'>

                <div className=' text-3xl flex justify-start items-start  gap-3 ml-12 border border-spacing-1 border-opacity-50 border-richblack-5 w-fit pr-80  pl-3 py-2 flex-col'>
                    <p className=''> What You WIll learn</p>
                    <div>
                        {whatYouWillLearn}
                    </div>
                </div>


                <div className='ml-14 text-3xl font-bold '>
                    <p>Course Content:</p>
                </div>

                <div>
                    {
                        courseContent.map((section, ind) => (
                            <CourseAccordionBar
                                course={section}
                                key={ind}
                                isActive={isActive}
                                handleActive={handleActive}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CourseDetails