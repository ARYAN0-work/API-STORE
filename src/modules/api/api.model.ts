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
    },
    {
        timestamps:true,
    }
)