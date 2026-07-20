import mongoose from "mongoose";
import {AppError} from "../../utils/appError";
import { Api } from "./api.model";

export const apiService ={
    
    createApi: async (data:any, ownerId:string)=>{
      const api = await Api.create({...data,owner:ownerId});

      return api;
    },

    getApi: async (ownerId: string) => {
      const api = await Api.find({ owner: ownerId });
    
      return api;
    },

    getSingleApi: async (apiId: string, ownerId: string) => {
      if (!mongoose.Types.ObjectId.isValid(apiId)) {
        throw new AppError("Invalid API ID",400)
      }
      const api = await Api.findOne({
        _id: apiId,
        owner: ownerId,
      });
    
      return api;
    },

    updateApi: async (apiId: string,ownerId: string,data: any) => {
    const api = await Api.findOneAndUpdate(
      {
        _id: apiId,
        owner: ownerId,
      },
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    return api;
  },
   deleteApi: async (
     apiId: string,
     ownerId: string
   ) => {
     const api = await Api.findOneAndDelete({
       _id: apiId,
       owner: ownerId,
     });
   
     return api;
   },
};