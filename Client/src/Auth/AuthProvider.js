import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => "",
    saveUser: (userDatas) => {},
});

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(true); //Quiero cambiar este valor a true
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");

    function getAccessToken() {
        return accessToken;
    }

    function saveUser(userData) {
        setAccessToken(userData.body.accessToken);
        setRefreshToken(userData.body.refreshToken);

        localStorage.setItem("token", JSON.stringify(userData.body.refreshToken));
        setIsAuthenticated(true);
    }

    return (
        React.createElement(AuthContext.Provider, { value: { isAuthenticated, getAccessToken, saveUser } },
            children
        )
    );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
