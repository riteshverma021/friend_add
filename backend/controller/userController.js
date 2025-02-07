import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

const signUp =async(req,res)=>{

const {username , password , email} = req.body
console.log( "usersigup" , username,email);


try {
if(password<6){
    res.status(400).json({message : "password must be of atleast 6 characters"})
}
const user = await User.findOne({email})

if(user){
    res.status(400).json({message : "user already exist"})
}

const salt = await bcrypt.genSalt(10) //to get salt to add to password
const hashedPassword = await bcrypt.hash(password,salt)

const newUser = new User({
    username :username,
    email : email,
    password :hashedPassword
})
console.log(newUser);


if(newUser){
    generateToken(newUser._id , res)
    await newUser.save()
        res.status(200).json({
            _id:newUser._id,
            username:newUser.username,
            email:newUser.email,
            profilePic:newUser.profilePic
        })
}
else{
    res.json(400).json({message:"Invalid User Data"})
}


} catch (error) {
    console.error("error in signup controller:",error.message)
    res.status(400).json({message:"Internal server error"})
    
}



}


const login=async(req,res)=>{
const {email ,password} = req.body

try {

const user = await User.findOne({email})
if(!user){
    res.status(400).
    json({message:"user doesnot exist"})
}

const isPasswordCorrected = await bcrypt.compare(password , user.password)
if(!isPasswordCorrected){
    res.status(400).json({message:"incorrect password"})

}

generateToken(user._id,res)

res.status(200).json({
    id:user._id,
    username:user.username,
    email:user.email,
    profilePic:user.profilePic,

})




    
} catch (error) {
    console.log("error in controller" , error.message);
    console.log("internal server error");
    
    
}



}




const logout = (req,res)=>{

 try {
    res.cookie("jwt" , "" , {maxAge:0})

    res.status(200).json({message:"log out succecfully"})
 } catch (error) {
    console.error("error in controller", error.message)
    res.status(400).json({message:"internal error"})
 }




}




const updateProfile =async(req,res)=>{
   
    
   
    
   try {
  
    const {profilePic} = req.body

    
    const user  = req.user._id

    if(!profilePic){
        res.status(400).json({message:"profile phto required"})
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(user , {profilePic:uploadResponse.secure_url}, {new:true})
    res.status(200).json(updatedUser)
   } catch (error) {
    console.error("error in profile photo uploader",error)
    res.status(400).json({message:"internal server error"})
   }
}












const checkAUth =(req,res)=>{

try {
    res.status(200).json(req.user)

} catch (error) {
    console.log("errror in check auth control", error.message)
    res.status(400).json({message:"internal erro"})
    
}


}

export default {signUp , login,logout , checkAUth , updateProfile}