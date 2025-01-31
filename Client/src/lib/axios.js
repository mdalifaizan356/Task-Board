import axios from "axios";

export const axiosInstance = axios.create({
    
    baseURL:`http://${window.location.hostname}:6080/`,
    withCredentials:true,
    
})