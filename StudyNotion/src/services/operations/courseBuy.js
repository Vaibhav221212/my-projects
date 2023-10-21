import toast from "react-hot-toast";
import { apiConnector } from '../apiconnector'
import rzpLogo from '../../assets/Logo/rzp_logo.png'



const loadScript = (src) => {


    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
        console.log("3")
    })


}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    console.log("2")
    const toastId = toast.loading("Loading..,")
    try {
        // load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if (!res) {
            console.log("2-10")
            toast.error("could not load script");
            toast.dismiss(toastId)
            return;
        }


        // initiate the order 
        const orderResponse = await apiConnector("POST", "/capturePayment",
            { courses },
            {
                Authorisation: `Bearer ${token}`
            })
        console.log(orderResponse)
        if (!orderResponse.data.success) {
            toast.error(orderResponse.data.message);
            toast.dismiss(toastId)
            return;
        }
        console.log("printing the orderResponse..,", orderResponse);

        const options =
        {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: orderResponse.data.data.amount,
            order_id: orderResponse.data.data.id,
            name: "StudyNotion",
            description: "Thank You for Purchasing the Course",
            image: rzpLogo,
            prefill:
            {
                name: `${userDetails.firstName}`,
                email: userDetails.email
            }
            ,
            handler: function (response) {
                // send successFull wala email
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token, dispatch)

                // verifyPayment
                VerifyPayment({ ...response, courses }, token, navigate)
            }

        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
        paymentObject.on("payment.failed", function (response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
    }

    catch (e) {
        console.log("PAYMENT API ERROR.....", e.message);
        toast.error(e.message);
    }
    toast.dismiss(toastId);
}


async function sendPaymentSuccessEmail(response, amount, token, dispatch) {
    try {
        await apiConnector("POST", "/sendPaymentSuccEmail", {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount
        }, {
            Authorisation: `Bearer ${token}`
        })
    }
    catch (e) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", e.message);
    }
}

async function VerifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying payment");
    //  dispatch(setPaymentLoading)
    try {
        const response = await apiConnector("POST", "/verifyPayment", bodyData, {
            Authorisation: `Bearer ${token}`
        })

        if (!response.data.success) {
            toast.error(response.data.message);
            toast.dismiss(toastId);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
        // dispatch(resetCart());
        toast.dismiss(toastId)
    }
    catch (e) {
        toast.error(e.message)
        toast.dismiss(toastId)
        return;
    }
}