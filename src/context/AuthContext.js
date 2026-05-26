import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    saveData,
    getData,
    removeData,
} from "../services/storage";

const AuthContext = createContext();

const STORAGE_KEY_USER = "@user";
const STORAGE_KEY_SESSION = "@session";

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        loadSession();
    }, []);

    const loadSession = async () => {

        try {

            const storedUser = await getData(STORAGE_KEY_USER);

            const storedSession = await getData(STORAGE_KEY_SESSION);

            if (storedUser && storedSession) {

                setUser(storedUser);

                setIsAuthenticated(true);
            }

        } catch (error) {

            console.log("Error loading session:", error);

        } finally {

            setLoadingAuth(false);
        }
    };

    const register = async ({ name, email, password }) => {

        const newUser = {
            id: Date.now(),
            name,
            email: email.toLowerCase(),
            password,
        };

        await saveData(STORAGE_KEY_USER, newUser);

        return {
            success: true,
            message: "Usuario registrado correctamente.",
        };
    };

    const login = async ({ email, password }) => {

        const storedUser = await getData(STORAGE_KEY_USER);

        if (!storedUser) {

            return {
                success: false,
                message: "No existe una cuenta registrada.",
            };
        }

        const emailMatches =
            storedUser.email === email.toLowerCase();

        const passwordMatches =
            storedUser.password === password;

        if (!emailMatches || !passwordMatches) {

            return {
                success: false,
                message: "Correo o contraseña incorrectos.",
            };
        }

        await saveData(STORAGE_KEY_SESSION, true);

        setUser(storedUser);

        setIsAuthenticated(true);

        return {
            success: true,
            message: "Inicio de sesión exitoso.",
        };
    };

    const updateUser = async (updatedData) => {

        const updatedUser = {
            ...user,
            ...updatedData,
        };

        await saveData(STORAGE_KEY_USER, updatedUser);

        setUser(updatedUser);

        return {
            success: true,
            message: "Perfil actualizado correctamente.",
        };
    };

    const logout = async () => {

        await removeData(STORAGE_KEY_SESSION);

        setIsAuthenticated(false);

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loadingAuth,

                register,
                login,
                logout,

                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}