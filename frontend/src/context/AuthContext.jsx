import {createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = ()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children})=>{
    const storedUser = localStorage.getItem('authUser');
    const [authUser,setAuthUser] = useState(storedUser ? JSON.parse(storedUser) : null);
    return <AuthContext.Provider value={{authUser,setAuthUser}}>{children}</AuthContext.Provider>;
}
