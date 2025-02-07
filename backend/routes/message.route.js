import express from "express"
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router()

import messageController from "../controller/messageController.js";


router.get("/users" , protectRoute , messageController.getUserSidebar)
router.get("/:id" , protectRoute , messageController.getMessages)
router.post("/send/:id" , protectRoute , messageController.sendMessage)





export default router