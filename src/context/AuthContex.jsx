
import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const authAllContext = useAuth();
    return <AuthContext.Provider value={authAllContext}>{children}</AuthContext.Provider>;
};



export default AuthContext;
