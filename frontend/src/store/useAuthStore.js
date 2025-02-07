import  {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import { toast } from 'react-toastify'
import {connect, io} from "socket.io-client"

const BaseUrl = import.meta.env.MODE ==="development"? "http://localhost:1001":"/"
 export const authStore = create((set , get)=>({

authUser :null ,
isSigningUp: false,
isLogingIn :false,
isUpdatingProfile : false,
 onlineUser :[],
isCheckingAuth : true,
socket:null,




checkAuth :async()=>{
  try { 
     const res = await axiosInstance.get("/auth/check")
    
    
set({authUser:res.data})

  

get().connectSocket()
} catch (error) {
    
  console.log("error in checkauth" ,error)
  set({authUser  : null})
  
}
finally{
    set({isCheckingAuth:false})
}},


signUp : async(data)=>{

  set({isSigningUp:true})

try {
  const res = await axiosInstance.post("/auth/signUp", data)
  console.log(res);
  

set({authUser:res.data})


toast.success("Account Created Successfully ")
get().connectSocket()

} catch (error) {
  toast.error(error.res.data.message)
  
}
finally{set({isSigningUp:false})}

  
},

logout : async()=>{


try {
  const res = await axiosInstance.post("/auth/logout")
  set({authUser:null})
 
  toast.success("Logout Successfully")

get().disconnectSocket()
} catch (error) {
toast.error(error.res.data.message)
  
}

},




login:async(data)=>{
  set({isLogingIn:true})
  try {
const res = await axiosInstance.post("/auth/logIn",data)

set({authUser:res.data})


get.connectSocket()
toast.success("User logged In Successfully")

    
  } catch (error) {
    toast.error(error.res.data.message)
    
  }finally{set({isLogingIn:false})}

},


updateProfile: async (data) => {
  set({ isUpdatingProfile: true });
  console.log(  "what data i am recing"  , data);
  try {
    const res = await axiosInstance.put("/auth/updateProfile", data);
    set({ authUser: res.data });
    toast.success("Profile updated successfully");
  } catch (error) {
    console.log("error in update profile:", error);
    toast.error(error.response.data.message);
  } finally {
    set({ isUpdatingProfile: false });
  }
},

connectSocket : ()=>{

const  {authUser} = get();
if (!authUser || get().socket?.connected) return;


const socket = io(BaseUrl , {

query: {
  userId : authUser._id,
}
})
socket.connect()

set({socket:socket})

socket.on("getOnlineUser" , (userIds)=>{
set({onlineUser : userIds})
})



},


 disconnectSocket:()=>{

  if(get().socket?.connected) get().socket.disconnect()

 }







}))