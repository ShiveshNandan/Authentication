import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : [true, "It is required sir"],
        unique : true
    },
    email: {
        type : String,
        required : [true, "It is required sir"],
        unique : true
    },
    password: {
        type : String,
        required : [true, "It is required sir"],
        unique : true
    },
    isVarified: {
        type : Boolean,
        default : false
    },
    isAdmin: {
        type : Boolean,
        default : false
    },

    forgetPasswordToken: String,

    forgetPasswordTokenExpiry: Date,

    verifyToken: String,

    verifyTokenExpiry: Date,

})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;