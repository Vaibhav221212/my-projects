import toast from "react-hot-toast";
import { apiConnector } from '../apiconnector'
import { useDispatch } from "react-redux";
import { setUser } from '../../slices/ProfileSlice'


export async function getEnrolledCourses(token) {

    const toastId = toast.loading("loading..")
    let result = [];

    try {
        const response = await apiConnector("POST", "/getEnrolledCourses",
            null,
            {
                Authorisation: `Bearer ${token}`,
            })

        console.log(response)

        if (!response.data.success) {
            toast.error(response.data.message)
            toast.dismiss(toastId);
            return;

        }

        toast.success("course get succesFull")
        result = response.data.data;
        toast.dismiss(toastId);

    }
    catch (e) {
        toast.error(e.message)
        toast.dismiss(toastId);
        return;
    }
    return result;
}

export function updateDisplayPicture(data, token) {

    return async (dispatch) => {
        const toastId = toast.loading("loding..,")
        try {

            const response = await apiConnector(
                "PUT",
                "/updateImage",
                data,
                {
                    Authorization: `Bearer ${token}`,
                }
            )
            if (!response.data.success) {
                toast.error(response.data.message)
                toast.dismiss(toastId);
                return;
            }

            toast.success("display picture uplodad succesfully")
            console.log("image", response.data.data.image)
            await dispatch(setUser(response.data.data));
            localStorage.setItem("user", JSON.stringify(response.data.data))


        }
        catch (e) {
            toast.error(e.message);
        }
        toast.dismiss(toastId);

    }
}

export function getUser(data, token) {

    return async (dispatch) => {

        let result = []
        const toastId = toast.loading("loding..,")
        try {

            const response = await apiConnector(
                "GET",
                "/getUser",
                data,
                {
                    Authorization: `Bearer ${token}`,
                }
            )

            console.log("user get successfully");


            if (!response.data.success) {
                toast.error(response.data.message)
                toast.dismiss(toastId);
                return;
            }

            toast.success("display picture uplodad succesfully")
            dispatch(setUser(response.data.data));

        }
        catch (e) {
            toast.error(e.message);
        }
        toast.dismiss(toastId);

    }
}

export function updateProfile(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("loading..,")
        try {
            const response = await apiConnector("PUT",
                "/updateProfile", formData,
                {
                    Authorization: `Bearer ${token}`,
                })

            console.log("updateProfile response=>", response);

            if (!response.data.success) {
                toast.error(response.data.message)
                toast.dismiss(toastId);
                return;
            }
            const userImage = response.data.image ?
                response.data.image :
                `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName}
                ${response.data.data.lastName}`

            await localStorage.setItem("image", JSON.stringify(userImage))
            await localStorage.setItem("user", JSON.stringify(response.data.data))



            toast.success("profile Update succesfully")

        }
        catch (e) {
            toast.error(e.message)

        }
        toast.dismiss(toastId);
    }
}

export function changePassword(token, formData) {

    return async (dispatch) => {
        const toastId = toast.loading("loading..,")
        try {
            console.log("updating", formData)
            const response = await apiConnector("PUT", "/updatePassword", formData,
                {
                    Authorisation: `Bearer ${token}`
                })
            console.log(response);
            if (!response.data.success) {
                toast.error(response.data.message)
                toast.dismiss(toastId);
                return;
            }

            toast.success('password update successfully');

        }
        catch (e) {
            toast.error(e.message);

        }
        toast.dismiss(toastId);
    }

}

export function deleteProfile(token, navigate) {

    return async (dispatch) => {
        const toastId = toast.loading("loading..,");
        try {


            const response = await apiConnector("DELETE", "/deleteProfile", null,
                {
                    Authorisation: `Bearer ${token}`
                })

            if (!response.data.success) {
                toast.error(response.data.message);
                toast.dismiss(toastId);
                return;
            }
            toast.success("Account delete succesfully")
            toast.dismiss(toastId)
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("image");
            navigate("/")
        }

        catch (e) {
            toast.error(e.message)
        }

        toast.dismiss(toastId);
    }
}

export const getInstructorData = async (token) => {
    let result = [];
    const toastId = toast.loading("loading.,")

    try {
        const res = await apiConnector("GET", "/getInstructorData", null,
            {
                Authorisation: `Bearer ${token}`
            })

        if (!res.data.success) {
            toast.error(res.data.message)

        }
        result = res?.data?.data;
        toast.success("data get successfully.,");
        toast.dismiss(toastId);
        return result;
    }
    catch (e) {
        toast.error(e.message)

    }

    toast.dismiss(toastId);
}