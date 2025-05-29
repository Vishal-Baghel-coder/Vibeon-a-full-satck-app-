import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
const userSchema = new Schema({
    id: {
        type: String,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    profilePicture: {
        type: String,
        default: 'defaultProfilePic.jpg'
    },
    bio: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    settings: {
        theme: {
            type: ['light', 'dark', 'system'],
            default: 'light'
        },
        notifications: {
            email: {
                type: Boolean,
                default: true
            },
            push: {
                type: Boolean,
                default: true
            }
        }
    },
    watch_history: [{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }],
    refreshToken: {
        type: String,
    },

}, { timestamps: true });



userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema);