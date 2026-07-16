import { Api } from "./api.model";

export const apiService ={
    
    createApi: async (data:any)=>{
      const api = await Api.create(data);

      return api;
    },
};