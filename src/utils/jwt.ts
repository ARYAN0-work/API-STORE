import jwt from "jsonwebtoken";

export const genrateToken =(userId: string)=>{
    return jwt.sign({userId},process.env.JWT_SECRET!,{expiresIn:"7d"})
}