import { axiosInstance } from './../axios';

//Login API
export const loginUser = async (formData) => {
    try {
        const response = await axiosInstance.post("/newuser/loginUser", formData);
        if (response.status === 200) {
            return response.data;
        } 
    } catch (error) {
        throw error; 
    }
};

