// zustand is light weight redux alternative
// here we setup zustand
// here we will our profile and also fetch other users

import { create } from "zustand";
// persist is used to so it remain even if page reload means here if we reload the page user wont be removed
import {persist} from "zustand/middleware"
import axios from "axios";

import { BASE_URL } from "@/utils";

// =>({}) gives instant reuslt than =>{}
const authStore=(set:any)=>({

    userProfile:null,
    allUsers: [],

    // both of adduser and remover user are being used in navbar
    // when we add user to userprofile
    addUser:(user:any) =>set({userProfile:user}),
    
    // when we logout we removeUSer and resetting userprofile to null
    removeUser:()=>set({
        userProfile:null
    }),


    // for suggested accounts
    // we want to fetch all users
    fetchAllUsers: async () => {
        const response = await axios.get(`${BASE_URL}/api/users`);
        // set id Zustand fuction
        set({ allUsers: response.data });
    },


});

const userAuthStore = create((
    persist(authStore, {
      name: 'auth',
    })
  ));

// code is weird but with exporting userAuthstore with help of zustand , we can use it as hook  in other files
export default userAuthStore