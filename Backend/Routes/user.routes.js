import { Router } from "express";
import { loginUser, logOutUser, registerUser } from "../controllers.js/user.controller.js"
import { upload } from '../middleware/multer.middleware.js'
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/register").post(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]), registerUser)

router.route("/login").post(loginUser)


router.route("/logout").post(verifyJWT, logOutUser)


export default router