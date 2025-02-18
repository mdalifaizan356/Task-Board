import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../lib/axios";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Jab tak data load ho raha hai

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setUser(null);
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
            setLoading(false); // Data load hone ke baad loading hatao
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        fetchUser(); // Jab component mount ho, tab user data load karo
    }, []);

    return (
        <UserContext.Provider value={{ user, fetchUser, logout, loading }}>
            {!loading && children} {/* Jab tak loading ho, kuch mat dikhana */}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
