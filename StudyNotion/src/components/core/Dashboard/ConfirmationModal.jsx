import React from 'react'
import { logout } from '../../../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';




const ConfirmationModal = ({modalData}) => {
  const disptach=useDispatch();
  const navigate=useNavigate()
  return (
   
      <div className=' absolute modal  z-10 text-[10px] md:text-[17px] lg:ml-[480px] mt-[-430px] md:ml-[250px] ml-[50px] rounded-lg px-4 py-5 text-white  flex flex-col items-center gap-6 z-10'>
        <p>
           {modalData?.text1}
        </p>
        <p>{modalData?.text2}</p>

        <div className='flex justify-between gap-10 items-center z-10'>
           <button onClick={()=>modalData?.btn1Handler()}>
              {modalData?.btn1Text}
           </button>

           <button onClick={()=>modalData?.btn2Handler()}>
            {modalData?.btn2Text}
           </button>
        </div>
      </div>
 
  )
}

export default ConfirmationModal