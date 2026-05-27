
import React, { createContext, useContext, useEffect, useState } from "react";

import { saveData, getData, removeData } from "../services/storage";

const AuthContext = createContext();

// Llaves de identificacion para persistir el modelo de datos y el token de sesion
const STORAGE_KEY_USER = "@user";
const STORAGE_KEY_SESSION = "@session";

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(true);

    // Valida de forma automatica la persistencia del estado de sesion al inicializar el proveedor
    useEffect(() => {
        loadSession();
    }, []);

    // Comprueba el almacenamiento persistente para restaurar los datos de la cuenta activa
    const loadSession = async () => {
        try {
            const storedUser = await getData(STORAGE_KEY_USER);
            const storedSession = await getData(STORAGE_KEY_SESSION);

            // Revalida las credenciales para evitar desajustes en el estado global
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

    // Almacena de forma persistente los datos estructurados del nuevo registro local
    const register = async ({ name, email, password }) => {
        const newUser = {
            id: Date.now(), // Genera un identificador numerico unico basado en timestamp
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

    // Evalua las credenciales provistas contrastandolas con el registro almacenado
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

        // Crea la bandera de sesion valida e inicializa los estados reactivos
        await saveData(STORAGE_KEY_SESSION, true);
        setUser(storedUser);
        setIsAuthenticated(true);
        return {
            success: true,
            message: "Inicio de sesión exitoso.",
        };
    };

    // Sobreescribe de manera integra la informacion del perfil en disco y en estado reactivo
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

    // Destruye exclusivamente la bandera de sesion manteniendo intacto el registro del usuario
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

// Hook personalizado para inyectar de forma directa el contexto de autenticacion en pantallas hijas
export function useAuth() {
    return useContext(AuthContext);
}