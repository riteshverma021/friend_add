import mongoose from "mongoose"


const Schema = mongoose.Schema


const userData = new Schema({

email :{
    type : String ,
    required :true , 
    unique : true
},
username :{
    type : String ,
    required :true , 
    
},
password :{
    type : String ,
    required :true , 
    minlength : 6 
   
},
profilePic :{
    type:String,
    default:""
}


},
{timestamps:true} //for  created at and updated at
 )

 const User  = mongoose.model("User" , userData)

 export default User