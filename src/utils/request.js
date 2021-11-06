import axios from "axios";


export const todos = axios.create({
    baseURL:"http://localhost:3001",
})

todos.interceptors.request.use((config)=>{
    console.log("inside inrterceptors",config);
    return config;
})

export const users=axios.create({
    baseURL:"http://localhost:3001",
    headers:{
        authentication:"token11214512",
    }
})