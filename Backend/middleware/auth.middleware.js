import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/Adminmodel.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandle.js";


export const verifyJWT = asyncHandler(async(req,res,next)=>{
try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if(!token){
        throw new ApiError(401, "unauthorized request");
    }
    
    const decodeToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    
    const admin = await Admin.findById(decodeToken?._id).select("-password -refreshToken")
    if(!admin){
        throw new ApiError(401, "Invalid accessToken")
    }
    req.admin = admin;
    next();
} catch (error) {
    throw new ApiError(401, error?.message || "Invalid accessToken")
}
})