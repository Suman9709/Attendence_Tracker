import { asyncHandler } from "../utils/asyncHandle.js";


const registerUser = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"OK"
    })
})

export {registerUser}