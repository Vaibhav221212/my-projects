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


const CourseDetails = () => {

  const {user} = useSelector((state)=>state.profile);
  const {token} = useSelector((state)=>state.auth);
  const {loading} = useSelector((state) => state.profile);
  const {paymentLoading} = useSelector((state)=> state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {courseId}  = useParams();

  const [courseData , setCourseData] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  useEffect(()=> {
      const getCourseFullDetails = async() => {
          try{
              const result = await  apiConnector("POST", "/getCourseDetails", {courseId})
              console.log("Printing CourseData-> " , result);
              setCourseData(result);
          }
          catch(error) {
              console.log("Could not fetch coursse details");
          }
      }
      getCourseFullDetails();
      
  }, [courseId]);

  const [avgReviewCount, setAverageReviewCount] = useState(0);

  useEffect(()=> {
      const count = avgRating(courseData?.data?.data?.ratingAndReviews);
      setAverageReviewCount(count);
  },[courseData])

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(()=> {
      let lectures = 0;
      courseData?.data?.data?.courseContent?.forEach((sec) => {
          lectures += sec.subSection.length || 0
      })
      setTotalNoOfLectures(lectures);

  },[courseData]);


  const [isActive,setIsActive]=useState("");

  const handleActive=(id)=>
  {
      setIsActive(
         !isActive.includes(id)
         ? setIsActive(id)
         : setIsActive(null)
      )
  }

  

  const handleBuyCourse = () => {
      
      if(token) {
          buyCourse(token, [courseId], user, navigate, dispatch);
          return;
      }
      setConfirmationModal({
          text1:"you are not Logged in",
          text2:"Please login to purchase the course",
          btn1Text:"Login",
          btn2Text:"Cancel",
          btn1Handler:() => navigate("/login"),
          btn2Handler:()=>setConfirmationModal(null),
      })

  }

  if(loading || !courseData) {
      return (
          <div>
              Loading...
          </div>
      )
  }

  if(!courseData) {
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

return (
  <div className='flex flex-col  text-white'>

      <div className='relative flex flex-col justify-start p-8'>
          <p>{courseName}</p>
          <p>{courseDescription}</p>
          <div className='flex gap-x-2'>
              <span>{avgReviewCount}</span>
              <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
              <span>{`(${ratingAndReviews.length} reviews) `}</span>
              <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
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

          <div>
              <CourseDetailsCard 
                  course = {courseData?.data?.data}
                  setConfirmationModal = {setConfirmationModal}
                  handleBuyCourse = {handleBuyCourse}
              />
          </div>
      </div>

      <div>
          <p> What You WIll learn</p>
          <div>
              {whatYouWillLearn}
          </div>
      </div>

      <div>
          <div>
              <p>Course Content:</p>
          </div>

          <div className='flex gap-x-3 justify-between'>

                 <div>
                  <span>{courseContent.length} section(s)</span>

                      <span>
                          {totalNoOfLectures} lectures
                      </span>
                      <span>
                          {courseData.data?.totalDuration} total length
                      </span>
                 </div>

                 <div>
                      <button
                          onClick={() => setIsActive([])}>
                          Collapse all Sections
                      </button>
                 </div>

          </div>
      </div>




  </div>
)
}

export default CourseDetails