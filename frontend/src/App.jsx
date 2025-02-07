import React,{useEffect} from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter ,  Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Loginpage from './pages/Loginpage.jsx'
import HOMEPAGE from "./pages/HOMEPAGE.jsx"
import  SignupPage   from  "./pages/SignupPage.jsx"
import SettingPage from "./pages/SettingPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import Navbar from "./components/Navbar.jsx"
import { authStore } from './store/useAuthStore.js'
import {Loader } from "lucide-react"
import Sidebar from './components/Sidebar.jsx'
import { themeStore } from './store/useThemeStore.js'



const App = () => {
const {checkAuth,authUser, isCheckingAuth , onlineUser} = authStore()
const {theme} = themeStore()

useEffect(() => {
  checkAuth();

  console.log("online users", onlineUser);
  
 


}, [checkAuth]);



if(isCheckingAuth && !authUser){
  return(
    <div className='flex justify-center items-center h-screen '> 

      <Loader className= "size-10 animate-spin" />
    </div>
  )
}

  return (
  <div   >
<BrowserRouter    >
<Navbar/>

<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"

/>

<Routes>

<Route    path='/'      element= {  authUser ?  <HOMEPAGE/> : <Navigate   to='/login'  /> }   />
<Route path='/login' element= {   !authUser  ? <Loginpage/> : <Navigate   to='/'/>   } />
<Route path='/signup' element={ !authUser  ?    <SignupPage/> : <Navigate  to="/"  />} />
<Route path='/settings' element={<SettingPage/>} />
<Route path='/profile' element={   authUser ?  <ProfilePage/>  : <Navigate   to='/login'  /> } />




</Routes>



</BrowserRouter>

</div>
  
  )
}

export default App