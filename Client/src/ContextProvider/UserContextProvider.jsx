import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../lib/axios";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }
            
            const res = await axiosInstance.get("/newuser/fetchUser", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data);
        } catch (error) {
            console.error("Error fetching user:", error);
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, fetchUser, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
