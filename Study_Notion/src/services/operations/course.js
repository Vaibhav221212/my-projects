
import { toast } from "react-hot-toast";
import { apiConnector } from '../apiconnector'

export const getAllcourse = async () => {
    const toastId = toast.loading("loding")
    let result = []
    try {
        const response = await apiConnector("GET", "/")


        if (!response.data.success) {
            toast.error(response.data.message);
            toast.dismiss(toastId)
            return
        }
        toast.success("course get successfully")
        result = response?.data?.data;

    }
    catch (e) {
        toast.error(e.message)
    }
    toast.dismiss(toastId);
}
export const fetchInstructorCourses = async (token) => {
    const toastId = toast.loading("loding")
    let result = []
    try {
        const response = await apiConnector("GET", "/getInstructorCourses",{},
        {
             Authorisation:`Bearer ${token}`
        })


        if (!response.data.success) {
            toast.error(response.data.message);
            toast.dismiss(toastId)
            return
        }
        console.log(response)     
        result = response?.data?.data;
        toast.dismiss(toastId);
        return result;

    }
    catch (e) {
        toast.error(e.message)
    }
    toast.dismiss(toastId);
}

export const getFullDetailsOfCourse = async (data,token) => {
    console.log("data",data)
    const toastId = toast.loading("loding")
    let result = []
    try {
        const response = await apiConnector("POST", "/getFullCourseDetails",data,
        {
           Authorisation:`Bearer ${token}`
        })

        console.log(response)

        if (!response.data.success) {
            toast.error(response.data.message);
            toast.dismiss(toastId)
            return
        }
        toast.success("course get successfully")
        result = response?.data;
        toast.dismiss(toastId);
        return result;

    }
    catch (e) {
        toast.error(e.message)
        result = e.response.message;
    }
    toast.dismiss(toastId);
}

export const addCourseDetails = async (data, token) => {
   console.log("adding")
    const toastId = toast.loading("Loading...")
    let result = null
    try {

        const response = await apiConnector("POST", "/createCourse", data, {

            Authorisation: `Bearer ${token}`,
        })
        console.log("CREATE COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
            toast.error(response?.data?.message)
            toast.dismiss(toastId)
            return;
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data
    } catch (error) {

        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteCourse = async (data,token) => {
    const toastId = toast.loading("loding")

    try {
        const response = await apiConnector("DELETE", "/deleteCourse", data,
        {
            Authorisation:`Bearer ${token}`
        })


        if (!response.data.success) {
            toast.error(response.data.message);
            toast.dismiss(toastId)
            return
        }
        toast.success("course delete successfully")


    }
    catch (e) {
        toast.error(e.message)

    }
    toast.dismiss(toastId);
}



export const editCourseDetails = async (data, token) => {
    const toastId = toast.loading("loding")
    let result = []
    try {
        const response = await apiConnector("PUT", "/editCourseDetails", data,
            {
                Authorisation: `Bearer ${token}`,
            })


        if (!response.data.success) {
            toast.error(response.data.message);
            toast.dismiss(toastId)
            return
        }
        toast.success("Course Published Successfully")
        result = response?.data?.data;
        toast.dismiss(toastId);
        return result;

    }
    catch (e) {
        toast.error(e.message)
        result = e.response.message;
    }
    toast.dismiss(toastId);
}


export const fetchCategory = async () => {
    const toastId = toast.loading("loading.,")
    let result = []
    try {
        const response = await apiConnector("GET", '/getAllCategory')


        if (!response.data.success) {
            toast.error(response.data.message)
            toast.dismiss(toastId)
        }

        result = response.data.data;
        toast.dismiss(toastId)
        return result;

    }

    catch (e) {
        toast.error(e.message)

    }
    toast.dismiss(toastId)

}

export const createSection = async (data, token) => {
    const toastId = toast.loading("loading.,")
    let result = []
    try {
        const response = await apiConnector("POST", '/createSection', data, {
            Authorisation: `Bearer ${token}`
        })
        console.log(response)

        if (!response.data.success) {
            toast.error(response.data.message)
            toast.dismiss(toastId)
        }
        toast.success("Section create Successfully")
        result = response.data.data;
        toast.dismiss(toastId)
        return result;

    }

    catch (e) {
        toast.error(e.message)

    }
    toast.dismiss(toastId)
}

export const updateSection = async (data, token) => {

    const toastId = toast.loading("loading.,")
    let result = []
    try {
        const response = await apiConnector("PUT", '/updateSection', data,
            {
                Authorisation: `Bearer ${token}`
            })


        if (!response.data.success) {
            toast.error(response.data.message)
            toast.dismiss(toastId)
        }
        toast.success("update Section succesfully")
        result = response.data.data;
        toast.dismiss(toastId)
        return result;

    }

    catch (e) {
        toast.error(e.message)

    }
    toast.dismiss(toastId)
}

export const deleteSection = async (data, token) => {
    const toastId = toast.loading("loading.,")
    let result = []
    try {
        const response = await apiConnector("DELETE", '/deleteSection', data,
            {
                Authorisation: `Bearer ${token}`
            })


        if (!response.data.success) {
            toast.error(response.data.message)
            toast.dismiss(toastId)
        }
        toast.success("delete Section succesfully")
        result = response.data.data;
        toast.dismiss(toastId)
        return result;

    }

    catch (e) {
        toast.error(e.message)

    }
    toast.dismiss(toastId)
}

export const createSubSection = async (data, token) => {
    const toastId = toast.loading("loading.,")
    let result = []
    try {
        const response = await apiConnector("POST", '/createSubSection', data,
            {
                Authorisation: `Bearer ${token}`
            })


        if (!response.data.success) {
            toast.error(response.data.message)
            toast.dismiss(toastId)
            return;
        }
        toast.success("createSubSection fetch succesfully")
        result = response.data.data;
        toast.dismiss(toastId)
        return result;

    }

    catch (e) {
        toast.error(e.message)

    }
    toast.dismiss(toastId)
}

export const updateSubSection = async (data, token) => {
    const toastId = toast.loading("loading.,")
    let result = []
    try {
        const response = await apiConnector("PUT", '/updateSubSection', data,
            {
                Authorisation: `Bearer ${token}`
            })

        console.log("reaspobse", response)
        if (!response.data.success) {
            toast.error(response.data.message)
            toast.dismiss(toastId)
        }
        toast.success("update SubSection  succesfully")
        result = response.data.data;
        console.log("frst resullt", result)
        toast.dismiss(toastId)
        return result;

    }

    catch (e) {
        toast.error(e.message)

    }
    toast.dismiss(toastId)
}
export const deleteSubSection = async (data, token) => {
    const toastId = toast.loading("loading.,")
    let result = []
    try {
        const response = await apiConnector("DELETE", '/deleteSubSection', data,
            {
                Authorisation: `Bearer ${token}`
            })


        if (!response.data.success) {
            toast.error(response.data.message)
            toast.dismiss(toastId)
        }
        console.log("response", response)
        toast.success("delete SubSection succesfully")
        result = response.data.data;
        toast.dismiss(toastId)
        console.log("first result", result)
        return result;


    }

    catch (e) {
        toast.error(e.message)

    }
    toast.dismiss(toastId)
}

