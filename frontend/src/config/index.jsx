import axios from "axios";

export const BASE_URL =  "https://linkedin-clone-kb5b.onrender.com/" //"http://localhost:9080"


export const clientServer = axios.create({
    baseURL: BASE_URL,
})