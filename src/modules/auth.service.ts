import bcrypt from "bcrypt";
import { AppError } from "../utils/appError";
import { User } from "../models/user-model"
import { genrateToken } from "../utils/jwt";

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

    const user = await User.create(data);

    const token = genrateToken(user.id);

     const userObject = user.toObject() as any;
     delete userObject.password;
     
     return {
         success: true,
         message: "Login successful",
         token,
         user: userObject,
     };
}

export const loginService = async (data: {
    email: string;
    password: string;
}) => {
      
    const user = await User.findOne({
        email:data.email,
    }).select("+password")

    if (!user) {
        throw new AppError("Invalid email or password",401)
    }
  
    const isPasswordValid = await bcrypt.compare(data.password,user.password)

    if (!isPasswordValid) {throw new AppError("Invalid email or password", 401)}

    user.password = undefined as any;

    return {success: true,message: "Login successful",user,};


}
