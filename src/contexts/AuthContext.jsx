/* eslint-disable react-refresh/only-export-components */

// src/contexts/AuthContext.jsx
import { createContext, useState } from "react";

// Context erstellen
export const AuthContext = createContext(null);

// Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = (usernameOrEmail, password) => {
        setIsLoading(true);

        setTimeout(() => {
            if (usernameOrEmail && password) {
                const fakeUser = {
                    id: 1,
                    username: usernameOrEmail.includes("@")
                        ? usernameOrEmail.split("@")[0]
                        : usernameOrEmail,
                    email: usernameOrEmail.includes("@")
                        ? usernameOrEmail
                        : `${usernameOrEmail}@example.com`,
                    role:
                        usernameOrEmail === "admin" || usernameOrEmail === "admin@quiz.com"
                            ? "ADMIN"
                            : "USER",
                };

                const fakeToken = `fake-jwt-token-${Date.now()}`;

                setUser(fakeUser);
                setToken(fakeToken);
            }

            setIsLoading(false);
        }, 1000);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    const isAuthenticated = user !== null;

    return (
        <AuthContext.Provider
            value={{ user, token, isLoading, isAuthenticated, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
