import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-rating-stars-component'
import GiNinjaStar from 'react-icons/gi'
import RiDeleteBin6Line from 'react-icons/ri'
const RenderCartCourses = () => {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const clickHandler = () => {

    }
    return (
        <div>
            {
                cart.map((course, index) =>
                (
                    <div>
                        <div>
                            <img src={course?.thumbnail}></img>
                            <div>
                                <p>{course?.coursname}</p>
                                <p>{course?.category}</p>

                                <div>
                                    <span>4.8</span>
                                    <ReactStars
                                        count={5}
                                        size={20}
                                        edit={false}
                                        activeColor={"#ffd700"}
                                        emptyIcon={<GiNinjaStar />}
                                        fullIcon={<GiNinjaStar />}
                                    />
                                    <span>{course?.ratingAndReviews?.length} Ratings </span>
                                </div>
                            </div>

                        </div>
                        <button onClick={clickHandler}>
                            <RiDeleteBin6Line />
                            <span>Remove</span>
                            <p>Rs {course?.price}</p>
                        </button>

                    </div>
                ))
            }

        </div>
    )
}

export default RenderCartCourses