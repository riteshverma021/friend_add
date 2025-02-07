import { create } from "zustand";
import {axiosInstance} from "../lib/axios.js"
import {toast} from "react-toastify"
import {authStore} from "../store/useAuthStore.js"
import { io } from "socket.io-client";

export const chatStore = create((set,get)=>({

    users:[],
    messages:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,


    getUser :async()=>{
      set({isUsersLoading:true})
      try {
       const res = await axiosInstance.get("/message/users")
       set({users:res.data})  
    } catch (error) {
        toast.error(error.res.data.message) }
         finally{
            set({isUsersLoading:false})
         } },

getMessages :async(userId)=>{

set({isMessagesLoading:true})

try {
  const res = await axiosInstance.get(`/message/${userId}`)
    set({messages:res.data})
} catch (error) {
    toast.error(error.res.data.message) }
    finally{
        set({isMessagesLoading:false})
    }

},


sendMessage : async(messageData)=>{
console.log(messageData);

const {selectedUser , messages} = get()
try {
    
    const res  = await axiosInstance.post(`/message/send/${selectedUser._id}` , messageData)
    set({messages:[...messages , res.data]})
    

} catch (error) {
    toast.error(error.res.data.message)
}

},



subscribeToMessage :()=>{
const {selectedUser} = get()
if(!selectedUser)return

const socket  = authStore.getState().socket

socket.on("newMessage" , (newmessage)=>{
 
if(newmessage.senderId !== selectedUser._id) return

    set({messages : [...get().messages , newmessage]})
} )

},



unSubscribeFromMessage :()=>{

    const socket  = authStore.getState().socket
    socket.off("newMessage")


},

setSelectedUser:(selectedUser)=>set({selectedUser 
  })


}))
