import loginImg from "../assets/Images/login.webp"
import Templet from '../components/core/LoginPage/Templet'

function Login() {
  return (
    <Templet
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login