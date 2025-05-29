import mongoose, { Schema } from "mongoose";

const createpost = new Schema({
    typeofpost: {
        type: ["text", "image"]
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    posturl: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Like'
    }],
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    tags: [{
        type: String,
        trim: true
    }],
    duration: {
        type: Number,
        required: true
    },
    visiblity: {
        type: ['public', 'private', 'unlisted'],
        default: 'public'
    },
},
    {
        timestamps: true,
    }
)