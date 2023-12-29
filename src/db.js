import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/cucervices")
        console.log("DB is connected")
    }catch(error) {
        console.log("ERROR: ", error)
    }
}

export default connectDB