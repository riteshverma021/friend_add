import express from "express"
import userController from "../controller/userController.js"
import protectRoute from "../middleware/protectRoute.js"
const router = express.Router()


router.post("/signUp" , userController.signUp)
router.post("/logIn" , userController.login)

router.post("/logout" ,userController.logout)
router.put("/updateProfile" , protectRoute , userController.updateProfile)
router.get("/check",protectRoute , userController.checkAUth)







export default router