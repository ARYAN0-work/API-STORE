import { User } from "../models/user-model"

export const registerService =async (data:{
    name:string;
    email:string;
    password:string;
})=>{
    const user = await User.create(data);

    return {
        success: true,
        message: "User registration successfully",
        user,
    }
}