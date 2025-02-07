 import express from  "express"
 import dotenv  from "dotenv"
import { app ,server } from "../lib/socket.js"
import path from "path"

 import { connectDB } from "../lib/db.js"
 import bodyParser from "body-parser"
 import cors from "cors"
 import cookieParser from "cookie-parser"


 import authRouter from "../routes/auth.route.js"
 import messageRouter from "../routes/message.route.js"





dotenv.config()
 const port  = process.env.PORT;
const __dirname = path.resolve()


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

 app.use(express.json())
 app.use(cookieParser())
 
  app.use("/api/auth", authRouter)
  app.use("/api/message", messageRouter)

 
  if(process.env.NODE_ENV ==="production")
{
    app.use(express.static(path.join(__dirname ,"../frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend" , "dist" , "index.html"))
})

}






 server.listen (port, ()=>{
    console.log(`listening on the port ${port}`),
    //db connections
connectDB()
 
    
 })