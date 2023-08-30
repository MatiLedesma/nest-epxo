import "./src/styles/global.css";
import React from "react";
import ThemeProvider from "./src/context/ThemeContext";
import UserProvider from "./src/context/UserContext";

export const wrapRootElement = ({ element }) => (
  <UserProvider>
    <ThemeProvider>{element}</ThemeProvider>
  </UserProvider>
);
