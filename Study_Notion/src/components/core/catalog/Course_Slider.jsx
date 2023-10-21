import React from 'react'
import CourseCard from './CourseCard'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import { useState } from 'react'
import "swiper/css/pagination"
import { Navigation, Pagination, Scrollbar, A11y, FreeMode, Autoplay, Thumbs } from 'swiper/modules';


const CourseSlider = ({ Courses }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <>
          {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
        </>
    )
}

export default CourseSlider
