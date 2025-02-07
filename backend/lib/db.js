import mongoose from "mongoose"

 export const connectDB =async ()=>
{

    try {

  const conn=   await   mongoose.connect(process.env.MONGO_URL)
     console.log(`MONGO CONNECTED : ${conn.connection.host}`);
     
        
    } catch (error) {
        console.log("mongo connection error  :" , error);
        
        
    }

}