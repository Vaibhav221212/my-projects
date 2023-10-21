import React from 'react'
import ChnageProfilePicture from './ChnageProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const Setting= () => {
    return (
        <div className='md:w-[60%] ml-32'>
            <h1 className=' mb-14 text-3xl font-medium text-richblue-5'>
                Edit Profile
            </h1>

            {/* chnage profile picture */}
            <ChnageProfilePicture />

            {/* EditProfile */}
            <EditProfile />

            {/* updtaepassword */}
            <UpdatePassword />

            {/* deleteaccount */}
            <DeleteAccount />



        </div>
    )
}

export default Setting