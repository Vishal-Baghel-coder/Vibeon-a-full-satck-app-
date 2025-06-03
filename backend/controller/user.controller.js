import { ApiError } from "../utils/Apierror.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Twilio from "twilio";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
// Make sure to use express.json() middleware in your main app file before your routes, like so:
// import express from "express";
// const app = express();
// app.use(express.json());
const generateAccesstoken = async (phoneNumber) => {
    return jwt.sign(
        {
            phoneNumber: phoneNumber,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
const generateRefreshToken = async (phoneNumber) => {
    return jwt.sign(
        {
            phoneNumber: phoneNumber,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
const sendverificationcode = asyncHandler(async (req, res) => {
    console.log("hello")
    const { phonenumber } = req.body;
    if (phonenumber == undefined || phonenumber.trim() === '') {
        return res.status(400).json(
            new ApiError(400, false, "phonenumber is empty, try again")
        );
    }
    try {
        const client = Twilio(process.env.Twilio_Account_SID, process.env.Twilio_Auth_token);
        const verification = await client.verify.v2.services(process.env.Twilio_Service_SID)
            .verifications
            .create({ to: phonenumber, channel: "sms" });
        return res.status(201).json(
            new ApiResponse(200, "sms is sent Successfully")
        );
    } catch (error) {
        return res.status(500).json(
            new ApiError(500, false, error.message)
        );
    }
});

const verifycode = asyncHandler(async (req, res) => {
    const { phonenumber, code } = req.body;
    if (!code || code.length !== 6) {
        return res.status(400).json(
            new ApiError(400, false, "Please provide valid code")
        );
    }
    try {
        const client = Twilio(process.env.Twilio_Account_SID, process.env.Twilio_Auth_token);
        const verification_check = await client.verify.v2.services(process.env.Twilio_Service_SID)
            .verificationChecks
            .create({ to: phonenumber, code: code });
        if (verification_check.status === 'approved') {
            const accessToken = await generateAccesstoken(phonenumber);
            const refreshToken = await generateRefreshToken(phonenumber);
            const option = {
                httpOnly: true,
                secure: true
            }
            return res.status(201).cookie("accessToken", accessToken, option).cookie("refreshToken", refreshToken, option).json(
                new ApiResponse(200, { accessToken, refreshToken }, "code is matched Successfully")
            );
        } else {
            return res.status(200).json(
                new ApiResponse(200, false, "code is incorrect")
            );
        }
    } catch (error) {
        return res.status(500).json(
            new ApiError(500, false, "Failed to verify code", error.message)
        );
    }
});

const test = asyncHandler(async (req, res) => {
    const { phoneNumber } = req.body
    const accessToken = await generateAccesstoken(phoneNumber);
    const refreshToken = await generateRefreshToken(phoneNumber);
    console.log("generte access token", accessToken, refreshToken)
    return res.status(200).json(
        new ApiResponse(200, { accessToken, refreshToken }, "code is incorrect")
    );
})
const register = asyncHandler(async (req, res) => {
    const { username, fullName, bio, email, phonenumber, refreshToken } = req.body;
    console.log(username, fullName, phonenumber)
    if (
        [username, fullName, phonenumber, refreshToken].some((field) => {
            field?.trim() === "";
        })
    ) {
        throw ApiError(400, "usrename or fullName or phonenumber is required, try again");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { phonenumber }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with phoneNumber or username already exists")
    }
    const profilePicture = req.files?.profilePicture[0].path;
    const profilePictureurl = ""
    if (profilePicture) {
        profilePictureurl = await uploadOnCloudinary(profilePicture)
        if (profilePictureurl === "") {
            new ApiError(400, "file is not uploading in cloudinary")
        }
    }

    const createuser = await User.create({
        id: 3,
        username: username,
        fullName: fullName,
        profilePicture: profilePictureurl?.url,
        email: email,
        bio: bio,
        phoneNumber: phonenumber,
        refreshToken: refreshToken,
    })
    const createdUser = await User.findById(createuser._id).select(
        "-refreshToken"
    )

    if (!createuser) {
        new ApiError(500, "error while creating user models")
    }
    return res.status(200).json(
        new ApiResponse(200, createdUser, "user register suceessfully")
    );
})

const refreshaccessToken = asyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

        if (!incomingRefreshToken) {
            throw new Api(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findOne(decodedToken?.phoneNumber)

        if (!user) {
            throw new ApiError(402, "Invalid refresh Token")
        }

        if (incomingRefreshToken != user?.refreshToken) {
            throw new ApiError(403, "Refreah Token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }
        const accessToken = await generateAccesstoken(user.phoneNumber);
        const newrefreshToken = await generateRefreshToken(user.phoneNumber);

        return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", newrefreshToken, options).json(new ApiError(
            200,
            { accessToken, newrefreshToken },
            "Access token refreshed"
        )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh Token")
    }
})

const uploadpost = asyncHandler(async (req, res) => {
    const post = req.files?.profilePicture[0].path;
    if (!post || post === undefined) {
        new ApiError(400, "path is empty or file is required");
    }

})

export {
    sendverificationcode,
    verifycode,
    test,
    register,
    refreshaccessToken
}