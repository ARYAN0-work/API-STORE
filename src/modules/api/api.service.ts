import { Api } from "./api.model";

export const apiService ={
    
    createApi: async (data:any, ownerId:string)=>{
      const api = await Api.create({...data,owner:ownerId});

      return api;
    },
};