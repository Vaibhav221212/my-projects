import toast from 'react-hot-toast'
import { apiConnector } from '../apiconnector'



export const updateCompletedLectures = async (data, token) => {
  const taostId = toast.loading("loding.,");
  try {

    const result = await apiConnector("POST", "/updateCourseProgress", data,
      {
        Authorisation: `Bearer ${token}`
      }
    )


    if (!result.data.success) {
      toast.error(result.data.message)
      toast.dismiss(taostId);
      return;
    }

    toast.success("markCompleated Video succesfully.,")
    return true;

  }
  catch (e) {
    toast.error(e.message)
    toast.dismiss(taostId)

  }
  toast.dismiss(taostId)
}



export const createRating = async (data, token) => {
  console.log("creatating rating..,2")
  const taostId = toast.loading("loding.,");
  try {

    const result = await apiConnector("POST", "/createRatingAndReviews", data,
      {
        Authorisation: `Bearer ${token}`
      }
    )


    if (!result.data.success) {
      toast.error(result.data.message)
      toast.dismiss(taostId);
      return;
    }

    toast.success("review Addedd ssuccesfully.,")


  }
  catch (e) {
    toast.error(e.message)
    toast.dismiss(taostId)

  }
  toast.dismiss(taostId)
}


export const getAverageRating = async (data, token) => {
  const toastId = toast.loading("loading.,");

  try {
    const result = await apiConnector("GET", "getAvarageRating", data,
      {
        Authorisation: `Bearer ${token}`
      })

    if (!result.data.success) {
      toast.error(result.data.message)

    }
  }
  catch (e) {
    toast.error(e.message);
    toast.dismiss(toastId);
  }
  toast.dismiss(toastId);
}


export const getAllRating = async () => {
  const toastId = toast.loading("loading.,");
  let result = []

  try {
    const res = await apiConnector("GET", "/getAllRating")

    if (!res.data.success) {
      toast.error(result.data.message)

    }

    toast.dismiss(toastId);
    result = res?.data?.data;
    console.log("api reponse",result)
    return result;
  }
  catch (e) {
    toast.error(e.message);
    toast.dismiss(toastId);
  }
  toast.dismiss(toastId);
}


