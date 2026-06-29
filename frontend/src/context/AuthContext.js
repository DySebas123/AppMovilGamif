import React, {
    createContext,
    useContext,
    useState,
} from "react";

import * as authService from "../services/authService";
import * as uploadService from "../services/uploadService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(false);

    const validateToken = async (storedToken) => {
        try {
            const response = await authService.getProfile(storedToken);
            return response.data.success === true;
        } catch (error) {
            console.log(
                "Token inválido:",
                error.response?.data?.message || error.message
            );
            return false;
        }
    };

    const register = async ({ name, email, password }) => {
        try {
            const response = await authService.register({
                name,
                email,
                password,
            });

            return {
                success: true,
                message: response.data.message,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Error al registrar usuario.",
            };
        }
    };

    const login = async ({ email, password }) => {
        try {
            const response = await authService.login({
                email,
                password,
            });

            const {
                token,
                user,
                message,
            } = response.data;

            setToken(token);
            setUser(user);
            setIsAuthenticated(true);

            return {
                success: true,
                message,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Error al iniciar sesión.",
            };
        }
    };

    const updateUser = async (updatedData) => {
        try {
            const response = await authService.updateProfile(
                updatedData,
                token
            );

            setUser(response.data.user);

            return {
                success: true,
                message: response.data.message,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Error al actualizar perfil.",
            };
        }
    };

    const updateProfileImage = async (imageUri) => {
        try {
            const uploadResponse = await uploadService.uploadProfileImage(
                imageUri,
                token
            );

            const imageUrl = uploadResponse.data.imageUrl;

            const response = await authService.updateProfile(
                {
                    name: user.name,
                    email: user.email,
                    profileImage: imageUrl,
                    location: user.location || null,
                },
                token
            );

            setUser(response.data.user);

            return {
                success: true,
                message: "Foto de perfil actualizada correctamente.",
                profileImage: imageUrl,
            };

        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Error al actualizar foto de perfil.",
            };
        }
    };

    const updateUserLocation = async (location) => {
        try {
            const response = await authService.updateProfile(
                {
                    name: user.name,
                    email: user.email,
                    profileImage: user.profileImage || null,
                    location,
                },
                token
            );

            setUser(response.data.user);

            return {
                success: true,
                message: "Ubicación actualizada correctamente.",
                location: response.data.user.location,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Error al guardar ubicación.",
            };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                loadingAuth,

                register,
                login,
                logout,
                updateUser,
                updateProfileImage,
                updateUserLocation,
                validateToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}