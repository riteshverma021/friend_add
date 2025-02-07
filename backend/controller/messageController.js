import cloudinary from "../lib/cloudinary.js";
import Message from "../models/messageModel.js"
import User from "../models/userModel.js"
import { getRecieverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js";

const getUserSidebar=async(req,res)=>{
try {
const logginedUserId = req.user._id
const filterData = await User.find({_id : {$ne : logginedUserId}}).select("-password");
res.status(200).json(filterData)

    
} catch (error) {
    
console.error("error in getUserSidebar", error.mesage)
res.status(400).json({message:"Internaml server error"})
}
}


const getMessages = async(req,res)=>{

try {
    const {id:userToChatId} = req.params
    const myId = req.user._id
 const messages = await Message.find({
        $or : [   {senderId :myId , recieverId : userToChatId } , {senderId:userToChatId , recieverId:myId}     ]
    })
res.status(200).json(messages)
} catch (error) {
    console.error("error in getmessages  =>" , error.message )
    res.status(500).json({message:"internal server error"})}
}


const sendMessage = async(req,res)=>{
    
try {
    
const {id:recieverId} = req.params
let {text , image} = req.body
const senderId = req.user._id

let imageUrl
if(image){
    const uploadResponse = await cloudinary.uploader.upload(image)
      imageUrl = uploadResponse.secure_url;
}
console.log(imageUrl);



const newMessage = new Message({
senderId ,
recieverId,
text,
image: imageUrl

})

await newMessage.save()


const recieverSocketId = getRecieverSocketId(recieverId)
if(recieverSocketId){
    io.to(recieverSocketId).emit("newMessage" , newMessage)
}





res.status(201).json(newMessage)

} catch (error) {
    console.error("error in send message controller =>  " , error)
    res.status(400).json({message  :"internal server error"  })
    
}



}







export default {getUserSidebar , getMessages , sendMessage}