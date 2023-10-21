import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/Authslice'
import ProfileSlice from "../slices/ProfileSlice";
import cartSlice from "../slices/cartSlice";
import courseSlice from "../slices/courseSlice";
import viewCourseSlice from "../slices/viewCourseSlice";

const rootReducer = combineReducers(
    {
        auth: authReducer,
        profile: ProfileSlice,
        cart: cartSlice,
        course: courseSlice,
        viewCourse: viewCourseSlice,
    }
)

export default rootReducer;