import React, { createContext, useState, useContext } from "react";
import jwtDecode from "jwt-decode";

export const UserContext = createContext();
export const useAuth = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [token, setToken] = useState("");

  const login = (token) => setToken(token);
  const logout = () => setToken("");
  const decodeToken = () => {
    if (token === "" || token === undefined) return;
    return jwtDecode(token);
  };

  const value = { token, login, logout, decodeToken };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
