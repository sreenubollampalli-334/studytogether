import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    course: "",
    bio: "",
    profileImage: ""
  });

  // Load from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("profileData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};