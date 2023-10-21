import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { setCompletedLectures, updateCompletedLectures } from '../../../services/operations/CourseDetails'
import { Player, BigPlayButton } from 'video-react'

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)



  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures

  } = useSelector((state) => state.viewCourse);

  const [videoData, setVideData] = useState([])
  const [previewSourcse, setPreviewSource] = useState("")
  const [videoEnd, setVideoEnded] = useState()
  const [loadig, setLoading] = useState(false)

  const setFlag = async () => {
    if (!courseSectionData.length) {
      return
    }

    if (!courseId && !sectionId && !subSectionId) {
      navigate(`/dashboard/enrolled-courses`)
    }
    else {
      const filterData = courseSectionData.filter((course) => course._id === sectionId)
      const filterVideoData = filterData?.[0]?.subSection.filter((subSection) =>
        (subSection._id === subSectionId))

      setVideData(filterVideoData?.[0]?.videoUrl);
      console.log("videoData", videoData)

      setPreviewSource(courseEntireData?.thumbnail)

      setVideoEnded(false)
    }
  }

  useEffect(() => {
    setFlag()

  }, [courseSectionData, courseEntireData, location.pathname])


  const isFirstVideo = () => {
    const currentSectionindex = courseSectionData.findIndex((section) => (
      section._id === sectionId
    ))

    const currentVideoIndex = courseSectionData?.[currentSectionindex]?.subSection.findIndex((subSection) =>
    (
      subSection._id === subSectionId
    ))

    if (currentSectionindex === 9 && currentVideoIndex === 0) {
      return true;
    }
    else {
      return false
    }
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((section) => (
      section._id === sectionId
    ))
    const totalSection = courseSectionData?.[currentSectionIndex]?.length;

    const currVideoIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((subSection) => (
      subSection._id === subSectionId
    ))

    const toatalSubSection = courseSectionData?.[currentSectionIndex]?.subSection?.[currVideoIndex]?.length;

    if (currentSectionIndex === totalSection - 1 &&
      currVideoIndex === toatalSubSection - 1) {
      return true;
    }
    else {
      return false
    }
  }

  const goToNext = () => {
    const currentSectionIndex = courseSectionData.findIndex((section) => (
      section._id === sectionId
    ))
    const totalSection = courseSectionData?.[currentSectionIndex]?.length;

    const currVideoIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((subSection) =>
      (subSection._id === subSectionId))

    if (currVideoIndex !== totalSection - 1) {
      const nextVideoId = courseSectionData?.[currentSectionIndex]?.subSection?.[currVideoIndex + 1]._id

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextVideoId}`)
    }
    else {
      const nextSectionId = courseSectionData?.[currentSectionIndex + 1]._id
      const nextVideoId = courseSectionData?.[currentSectionIndex + 1]?.subSection?.[0]._id
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextVideoId}`)
    }

  }
  const gotoToPrevious = () => {
    const currentSectionIndnex = courseSectionData.findIndex((section) => (
      section._id === sectionId
    ))
    const currVideoIndex = courseSectionData?.[currentSectionIndnex]?.subSection.findIndex((subSection) => (
      subSection._id === subSectionId
    ))

    if (currVideoIndex !== 0) {
      const preVideoId = courseSectionData?.[currentSectionIndnex]?.subSection[currVideoIndex - 1]?._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${preVideoId}`
      )
    }
    else {
      const preSectionId = courseSectionData?.[currentSectionIndnex - 1]._id;
      const preVideolength = courseSectionData?.[currentSectionIndnex - 1]?.length;
      const preVideoId = courseSectionData?.[currentSectionIndnex - 1]?.subSection?.[preVideolength - 1]

      navigate(
        `/view-course/${courseId}/section/${preSectionId}/sub-section/${preVideoId}`
      )
    }

  }

  const handleLectureCompleate = async () => {
    setLoading(true);
    console.log("updating.,")
    const res = await updateCompletedLectures({courseId:courseId, subSectionId:subSectionId}, token)

    if (res) {
      dispatch(updateCompletedLectures(sectionId))
    }
    setLoading(false);
  }

  return (
    <div className="flex  flex-col gap-5 text-white">
      {!videoData ? (
        <img
          src={previewSourcse}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData}
        >
          <BigPlayButton position="center" />
          {/* Render When Video Ends */}
          {videoEnd && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {!completedLectures.includes(subSectionId) && (
                <button
                  disabled={loadig}
                  onClick={handleLectureCompleate}

                  customClasses="text-xl max-w-max px-4 mx-auto"
                >{!loadig ? "Mark As Completed" : "Loading..."}</button>
              )}
              <button
                disabled={loadig}
                onClick={() => {
                  if (playerRef?.current) {
                    // set the current time of the video to 0
                    playerRef?.current?.seek(0)
                    setVideoEnded(false)
                  }
                }}

                className="text-xl bg-caribbeangreen-200  text-black font-semibold px-3 py-2 rounded-lg hover:scale-90 transition-all duration-200 px-4 mx-auto mt-2 "
                > Rewatch
                </button>

              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loadig}
                    onClick={gotoToPrevious}
                    className="blackButton bg-richblue-900 font-semibold text-white px-3 py-2 rounded-lg hover:scale-90 transition-all duration-200"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loadig}
                    onClick={goToNext}
                    className="blackButton bg-yellow-5 text-black font-semibold px-3 py-2 rounded-lg hover:scale-90 transition-all duration-200"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails