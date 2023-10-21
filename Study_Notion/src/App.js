import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
// import NavBar from './components/common/NavBar'
import Nav from './components/common/Nav'
import LoginForm from './components/core/LoginPage/LoginForm'
import Login from './pages/Login';
import Signup from './pages/Signup'
import ResetPassword from './pages/ResetPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
import Footer from './components/common/Footer'
import About from './pages/About'
import Sidebar from './components/core/Dashboard/Sidebar'
import PrivateRoute from './components/core/Homepage/Auth/PrivateRoute'
import Dashboard from './pages/Dashboard'
import MyProfile from './components/core/Dashboard/Myprofile'
import ContactUs from './pages/ContactUs'
import Setting from './components/core/Dashboard/setting/Setting'
import Course from './components/core/Dashboard/course'
import MyCorses from './components/core/Dashboard/course/instructorCourses/MyCorses'
import ConfirmationModal from './components/core/Dashboard/ConfirmationModal'
import EditCourse from './components/core/Dashboard/course/editCourse'
import Catalog from './pages/Catalog'
import CourseDetails from './components/core/catalog/CourseDetails'
import Cart from './components/core/cart'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import ViewCourse from './pages/ViewCourse'
import VideoSideBar from './components/core/viewCourse/VideoSideBar'
import VideoDetails from './components/core/viewCourse/VideoDetails'
import Instructor from './components/core/Dashboard/instructorDashboard/instructor'


const App = ({ modalData }) => {
  return (
    <div className=' relative wrapper w-screen min-h-screen p-0 m-0  justify-center items-center flex-col font-inter'>
      <Nav></Nav>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/resetPassword' element={<ResetPassword />}></Route>
        <Route path='/update-password/:id' element={<UpdatePassword />}></Route>
        <Route path='/verify-email' element={<VerifyEmail />}></Route>

        <Route path="/about" element={<About />}></Route>
        <Route path="/catalog/:categoryId" element={<Catalog />}></Route>
        <Route path="/courses/:courseId" element={<CourseDetails />}></Route>
        <Route path="/dashboard/cart" element={<Cart />}></Route>
        <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />}></Route>


        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/setting" element={<Setting />}></Route>
          <Route path='/dashboard/my-profile' element={<MyProfile />}></Route>
          <Route path='/dashboard/add-course' element={<Course />}></Route>
          <Route path='/dashboard/instructor' element={<Instructor />}></Route>
          <Route path='/dashboard/my-courses' element={<MyCorses />}></Route>
          <Route path='dashboard/edit-course/:courseId' element={<EditCourse />}></Route>

        </Route>
        <Route path='/contact' element={<ContactUs />}></Route>


        {/* nested route */}
        <Route element={<ViewCourse />}>

          <Route path='view-course/:courseId/section/:sectionId/sub-section/:subSectionId' element={<VideoDetails />} />


        </Route>
      </Routes>


      <Footer />

    </div>
  )
}

export default App