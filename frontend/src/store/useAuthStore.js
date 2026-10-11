import { create } from "zustand";

 export const  useAuthStore =create((set, get)=({
    authUser:null,
    isLoading:false,
    isLoggedIn:false,
    login:()=>{
        set({isLoggedIn:true})
    },
    register:()=>{},
    logout:()=>{},
 }))