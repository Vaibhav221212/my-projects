import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTaotalItem from './RenderTaotalItem';

const Cart= () => {
const {total,totalItems}=useSelector((state)=>state.auth);

     return(
        <div className='text-white'>
            <h1>
                Your Cards
            </h1>
            <p>{totalItems} Course in Cart </p>
             {
                total > 0 ?
                (<div>
                    <RenderCartCourses/>
                    <RenderTaotalItem/>
                </div>)
                :(<p>Your Cart is Empty</p>)
             }
        </div>
     )
     }
export default Cart