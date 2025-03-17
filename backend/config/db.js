import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://evolexxDB:1234@cluster0.vj6ra.mongodb.net/EvolexxStore?retryWrites=true&w=majority&appName=Cluster0')
        .then(() => console.log("DB Connected"))
        .catch((err) => console.error("DB Connection Error: ", err));
};
