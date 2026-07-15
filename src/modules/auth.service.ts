import { User } from "../models/user-model"

export const registerService =async (data:{
    name:string;
    email:string;
    password:string;
})=>{
   
    const duplicateUser= await User.findOne({
        email:data.email
    });

    if (duplicateUser) {
        throw new Error("User already exists")
    }

    const user = await User.create(data);

    return {
        success: true,
        message: "User registration successfully",
        user,
    }
}