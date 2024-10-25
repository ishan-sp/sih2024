import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseName:  {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    articles: {
        type: [String], 
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    img: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Course", courseSchema);
