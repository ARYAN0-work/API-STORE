import { Schema, model } from "mongoose";

const apiSchema = new Schema(
    {
        name:{
            tyep:String,
            required:true,
            trim:true,
        },
        description: {
          type: String,
          required: true,
          trim: true,
        },
        
        baseUrl: {
          type: String,
          required: true,
          trim: true,
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,
    },
        isActive: {
            type: Boolean,
            default: true,
    },
    },
    {
        timestamps:true,
    },
)

export const Api = model("Api", apiSchema);