import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'

const Button = ({ children, active, linkto, }) => {
  return (
    <div >
      <Link to={linkto} >
        <div className={`z-20 flex  justify-center items-center w-[190px] md:w-[150px] lg:w-[200px]  gap-5 text-center text-[13px] px-2 py-3 rounded-md font-bold
        ${active ? "bg-yellow-50 text-black":"bg-richblack-800 text-white"}
         hover:scale-95 transition-all duration-200`}>
                 {children}
                 < BsFillArrowRightCircleFill></BsFillArrowRightCircleFill>

        </div>
      </Link>
    </div>
  )
}

export default Button