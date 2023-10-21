
import Templet from '../components/core/LoginPage/Templet'
import signupimg from '../assets/Images/signup.webp';

function Signup() {
  return (
    <Templet
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupimg}
      formType="signup"
    />
  )
}

export default Signup