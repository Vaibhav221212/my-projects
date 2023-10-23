import React, { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import { HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {
  console.log("subSection",subSec)
  return (
    <div className="">
      <div className="flex justify-between py-2">
        <div className={`flex items-center gap-2`}>
          <span>
            <HiOutlineVideoCamera />
          </span>
          <p className="text-white">{subSec.title}</p>
        </div>
      </div>
    </div>
  )
}

export default CourseSubSectionAccordion