import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Apierror.js";
import { jwt } from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyjwt = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            new ApiError(400, "Unauthoried access");
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded?._id).select("-refreshtoken")

        if (!user) {
            new ApiError(400, "Invalid access");
        }

        req.user = user
        next()
    } catch (error) {
        console.log("error is occured in auth.middleware", error);
    }

})