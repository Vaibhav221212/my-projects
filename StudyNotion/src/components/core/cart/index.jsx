import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'


const Cart = () => {

    const { total, totalItems } = useSelector((state) => state.cart);
    console.log("totalItem",totalItems)
    console.log("toatl",total)
    return (
        <div>

            <h1 className='mb-14 text-3xl font-medium text-caribbeangreen-5'>
                Cart
            </h1>
            <p className='border-r border-r-blue-400 pb-2 font-semibold text-richblue-400'>
                {totalItems} Courses In Cart
            </p>

            {
                total > 0 ?
                    (<div className='mt-8 flex flex-col-reverse items-center gap-x-10 gap-y-6 lg:flex-row'>
                     <RenderCartCourses/>
                    </div>) : (<div>no</div>)
            }
        </div>
    )
}

export default Cart