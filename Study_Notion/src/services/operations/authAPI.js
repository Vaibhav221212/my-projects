import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/Authslice"
import { resetCart } from '../../slices/cartSlice'
import { setUser } from '../../slices/ProfileSlice'
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"



const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", "/auth/sendotp", {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response.data)

      console.log(response.data.message)

      if (!response.data.success) {

        toast.error(response.data.message)
        toast.dismiss(toastId)
        navigate('/signup');

      }
      else {
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
        toast.dismiss(toastId)
      }

    } catch (error) {
      console.log("SENDOTP API ERROR............", error.message)
      toast.error("OTP is invalid")

    }
    dispatch(setLoading(false))

  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", "/signup", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        toast.error(response.data.message)
        toast.dismiss(toastId)
        navigate("/verify-email")
      }
      else {
        toast.success("Signup Successful")
        navigate("/login")
        toast.dismiss(toastId)
      }
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error(error.response.data.message)

    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", '/login', {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        toast.error(response.data.message)
        toast.dismiss(toastId);
      }
      else {

        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        await dispatch(setUser({ ...response.data.user, image: userImage }))
        await localStorage.setItem("token", JSON.stringify(response.data.token))
        await localStorage.setItem("user", JSON.stringify(response.data.user))
        await localStorage.setItem("image", JSON.stringify(userImage))
        navigate("/dashboard/my-profile")
      }

    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}

export function contactUs(body) {
  return async (dispatch) => {
    try {
      const toastID = toast.loading("loading..,");
      const response = await apiConnector("POST", "/contactUs", { body })

      console.log("response", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("message sent successfull")
      toast.dismiss(toastID);
    }
    catch (e) {
      toast.error(e.message)

    }

  }
}


export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {

      const response = await apiConnector("POST", "/resetPasswordToken", { email, })
      console.log("RESET PASSWORD TOKEN RESPONSE....", response)

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
      dispatch(setLoading(false));
    }
    catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error(error.message);
    }


  }
}


export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    try {
      console.log("call frontend fn")
      dispatch(setLoading(true));

      const res = await apiConnector("POST", "/resetPassword", { password, confirmPassword, token });

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("password update succesfull..,");
      navigate("/");

    }
    catch (e) {
      toast.error(e.message);
    }
  }
}