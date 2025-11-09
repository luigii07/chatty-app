import axios from "axios";

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3333" : "https://chatty-api-ksyc.onrender.com";

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});