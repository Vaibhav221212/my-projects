import React from 'react'
import {RiEditBoxLine} from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'


const IconBtn = ({text,setIsEdit}) => {
  const navigate=useNavigate();
  return (
    <div onClick={()=>navigate("/dashboard/setting")} className='hover:scale-90 bg-yellow-25 text-richblue-700 font-semibold flex justify-center items-center p-2 px-3 gap-4 rounded-lg'>{text}
     <RiEditBoxLine/></div>
  )
}

export default IconBtn