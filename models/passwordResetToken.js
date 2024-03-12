import mongoose from "mongoose";

const tokenLife = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    token: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required:true,
    },
},{
    timestamps: true
})

// Match user entered password to hashed password in database
const ResetToken = mongoose.model('passwordReset', tokenLife)

export default ResetToken