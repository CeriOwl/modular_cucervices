import mongoose from "mongoose"
const user_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: false
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
    }
},
{
    timestamps: true
})

export default mongoose.model('user', user_schema)