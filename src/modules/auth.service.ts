import bcrypt from "bcrypt";
import { AppError } from "../utils/appError";
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
     throw new AppError("User already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({...data,password: hashedPassword,});

    return {
        success: true,
        message: "User registration successfully",
        user,
    }
}