import mongoose from "mongoose"
const user_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: false
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        requiered: true,
        trim: true
    },
    email: {
        type: String,
        requiered: true,
        trim: true,
        unique: true
    },
    verified: {
        type: Boolean,
        requiered: true,
        trim: true
    }
},
{
    timestamps: true
})

export default mongoose.model('user', user_schema)