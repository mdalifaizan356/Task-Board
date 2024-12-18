import React, { createContext, useState, useEffect } from 'react';

// Create a context for user data
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  // Initialize user state with localStorage data or null
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("User");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to update user data after login
  const login = (userData) => {
    setUser(userData); // Update context
    localStorage.setItem("User", JSON.stringify(userData)); // Update localStorage
  };

  // Optionally, you can sync with localStorage on logout or when user data changes
  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem("User"); // Remove from localStorage
  };

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
