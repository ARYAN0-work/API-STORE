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
      const api = await Api.findOne({
        _id: apiId,
        owner: ownerId,
      });
    
      return api;
    },
};