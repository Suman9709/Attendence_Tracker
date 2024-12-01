import { asyncHandler } from "../utils/asyncHandle.js";
import { ApiError } from '../utils/ApiError.js'
import { Admin } from '../models/Adminmodel.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const generateAccessandRefreshToken = async (userId) => {
    try {
        const admin = await Admin.findById(userId);
        if (!admin) {
            throw new ApiError(404, "Admin not found"); // ✅ Added null check for `admin`.
        }

        const accessToken = admin.generateAccessToken(); // ✅ Now safe because `admin` is guaranteed to exist.
        const refreshToken = admin.generateRefreshToken(); // ✅ Safe after null check.

        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false });

        return { refreshToken, accessToken };
    } catch (error) {
        console.error("Error in token generation:", error); // ✅ Added logging for debugging.
        throw new ApiError(500, "Something went wrong while generating refresh token and access token");
    }
};

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

    const { name, email, username, password } = req.body
    console.log("email", email);
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

    if (!(username || email)) {
        throw new ApiError(400, "Username or email is required");
    }

    const admin = await Admin.findOne({
        $or: [{ username }, { email }]
    })
    if (!admin) {
        throw new ApiError(404, "Admin does not exist")
    }

    const ispasswordValid = await admin.isPasswordcorrect(password)
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
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200,{}, "Admin Loggedout Successfully"))
})

export {
    registerUser,
    loginUser,
    logOutUser,

}