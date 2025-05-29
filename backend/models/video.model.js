import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    typeofvideo: {
        type: ["reels", "longvideo"]
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
    videourl: {
        type: String,
        required: true,
        trim: true
    },
    thumbnailurl: {
        type: String,
        default: 'defaultThumbnail.jpg'
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
);

const Video = mongoose.model('Video', videoSchema);