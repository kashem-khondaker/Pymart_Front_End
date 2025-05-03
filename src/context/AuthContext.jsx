import React, { createContext } from 'react';
import useAuth from '../hooks/useAuth';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const allContext = useAuth()

    return (
        <div>
            <AuthContext.Provider value={allContext}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthContext;