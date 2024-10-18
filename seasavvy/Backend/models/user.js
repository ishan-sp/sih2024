import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:  {
        type: mongoose.Schema.Types.String,
        required : true,
        unique : true,
    },
    email : {
        type : mongoose.Schema.Types.String,
        required : true,
        unique : true,
    },
    displayName:  {
        type: mongoose.Schema.Types.String,
        required : true,
    },
    role:  {
        type : mongoose.Schema.Types.String,
        required : true,
    },
    password: {
        type : mongoose.Schema.Types.String,
        required : true,
    },
    points: {
        type: Number,
        required: true,
        default: 0,
    },
    streak: {
        type: Number,
        required: true,
        default: 0,
    },
    level: {
        type: Number,
        required: true,
        default: 0,
    },
})

export default mongoose.model("User", userSchema);
