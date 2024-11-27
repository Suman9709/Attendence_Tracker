import { asyncHandler } from "../utils/asyncHandle.js";
import { ApiError } from '../utils/ApiError.js'
// import {User} from '../models/userModel.js'
import { Admin } from '../models/Adminmodel.js'
// import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'


const generateAccessandRefreshToken = async (userId) => {
    try {
        const admin = Admin.findById(userId);
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();
        admin.refreshToken = refreshToken
        await admin.save({ validateBeforeSave: false })
        return { refreshToken, accessToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh tkon and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
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





    const { name, email, username, password } = req.body

    if (
        [name, email, username, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are require")
    }

    const existUser = await Admin.findOne({
        $or: [{ email }, { username }]
    })

    if (existUser) {
        throw new ApiError(409, "User already exist with this email or username")
    }

    const admin = await Admin.create({
        name,
        username: username.toLowerCase(),
        email,
        password
    })

    console.log("Admin Created:", admin);

    const createAdmin = await Admin.findById(admin._id).select(
        "-password -refreshToken"
    )
    console.log("Created Admin Details:", createAdmin);

    if (!createAdmin) {
        throw new ApiError(500, "Something went wrong while registering admin")
    }

    return res.status(201).json(
        new ApiError(200, createAdmin, "Admin register successfully")
    )

})


const loginUser = asyncHandler(async (req, res) => {
    // req.body->data
    // username /email validate
    // finr the user
    // password check
    //access and refresh token
    //send cookies

    const { username, email, password } = req.body;

    if (!username || !email) {
        throw new ApiError(400, "Username or email is required");
    }

    const admin = await Admin.findOne({
        $or: [{ username }, { email }]
    })
    if (!admin) {
        throw new ApiError(404, "Admin does not exist")
    }

    const ispasswordValid = await username.isPasswordcorrect(password)
    if (!ispasswordValid) {
        throw new ApiError(401, " Invalid credentials");
    }


    const { accessToken, refreshToken } = await generateAccessandRefreshToken(admin._id)
    const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200, {
                admin: loggedInAdmin, accessToken, refreshToken
            },
                "User loggedIn Successfully"
            )
        )

});

const logOutUser = asyncHandler(async(req,res)=>{
    await Admin.findOneAndUpdate(
        req.admin._id,{
            $set:{refreshToken:undefined}
        },
        {
            new:true
        }

    )

    const options = {
        httpOnly:true,
        secure:true,
    }

    return res.status(200)
    .clearCookies("accessToken", options)
    .clearCookies("refreshToken", options)
    .json(new ApiResponse(200,{}, "Admin Loggedout Successfully"))
})

export {
    registerUser,
    loginUser,
    logOutUser,

}