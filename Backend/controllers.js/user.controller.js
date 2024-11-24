import { asyncHandler } from "../utils/asyncHandle.js";
import {ApiError} from '../utils/ApiError.js'
// import {User} from '../models/userModel.js'
import {Admin} from '../models/Adminmodel.js'
// import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'


const registerUser = asyncHandler(async (req,res)=>{
    // res.status(200).json({
    //     message:"OK"
    // })

    // get userdetails from the frontend
    // validate not empty
    // check if user already exist using username, email
    // check for image, check for avatar
    // upload them to cloudinary,  avtar
    // create user object- create entry in db
    // remove password and remove token field from response
    // check for user creation
    // return response


// const {name,email,username,password,role} = req.body
// console.log("email", email);

    
// if(
//     [name, email, username, password, role].some((field)=>
//     field?.trim() === "")
// ){
//     throw new ApiError(400, "all fields are required")

// }
//     const existedUser = await User.findOne({
//         $or: [{email}, {username}]
//     })
//     if(existedUser){
//         throw new ApiError(409, "User with tbis email or username already exist")
//     }
// const avatarLocalPath = req.files?.avatar[0]?.path;
// const coverImageLocalPath = req.files?.coverImage[0]?.path;


// if(!avatarLocalPath){
//     throw new ApiError(400, "Avatar file is require");
// }

// const avatar = await uploadOnCloudinary(avatarLocalPath)
//  const coverImage = await uploadOnCloudinary(coverImageLocalPath)    

// if(!avatar){
//     throw new ApiError(400, "Avatar file is require ")
// }

// const user = await User.create({
//     name,
//     avatar:avatar.url,
//     coverImage:coverImage?.url || "",
//     email,
//     password,
//     username:username.toLowerCase(), 
// })
// const createdUser = await User.findById(user._id).select(
//     "-password -refreshToken"
// )

// if(!createdUser){
//     throw new ApiError(500, "Some thing went wrong while registering user");
// }

// return res.status(201).json(
//     new ApiResponse(200, createdUser, "User registered successfully")
// )

// })





const{name,email,username,password} = req.body

if(
    [name,email,username,password].some((field)=>
    field?.trim() === "")
){
    throw new ApiError(400, "All fields are require")
}

const existUser = await Admin.findOne({
    $or:[{email},{username}]
})

if(existUser){
    throw new ApiError(409,"User already exist with this email or username")
}

const admin = await Admin.create({
    name,
    username:username.toLowerCase(),
    email,
    password
})

console.log("Admin Created:", admin); 

const createAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
)
console.log("Created Admin Details:", createAdmin);

if(!createAdmin){
    throw new ApiError(500, "Something went wrong while registering admin")
}

return res.status(201).json(
    new ApiError(200, createAdmin,"Admin register successfully")
)

})

export {registerUser}