import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { useAuth } from "./AuthContext";
import * as settingsService from "../services/settingsService";

const SettingsContext = createContext();

const defaultSettings = {
    notifications: true,
    darkMode: false,
    language: "Español",
};

const lightTheme = {
    background: "#f8fafc",
    secBackground: "#eefafa",
    surface: "#ffffff",
    secondarySurface: "#f1f5f9",
    textPrimary: "#000000",
    textSecondary: "#64748b",
    border: "#e2e8f0",
    primary: "#2563eb",
    secondary: "#10b981",
    white: "#ffffff",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
    gradientPrimary: ["#2563eb", "#10b981"],
    gradientDark: ["#1e3a8a", "#059669"],
    infoBackground: "#eff6ff",
    infoBorder: "#dbeafe",
    buttonBackground: "#6d6f0a",
};

const darkTheme = {
    background: "#0b1120",
    secBackground: "#0F3A3F",
    surface: "#111827",
    secondarySurface: "#1f2937",
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    border: "#374151",
    primary: "#22c55e",
    secondary: "#10b981",
    white: "#ffffff",
    success: "#22c55e",
    warning: "#fbbf24",
    danger: "#f87171",
    gradientPrimary: ["#065f46", "#10b981"],
    gradientDark: ["#0f172a", "#0f766e"],
    infoBackground: "#1f2937",
    infoBorder: "#374151",
    buttonBackground: "#065f46",
};

export function SettingsProvider({ children }) {
    const {
        token,
        isAuthenticated,
    } = useAuth();

    const [settings, setSettings] = useState(defaultSettings);
    const [loadingSettings, setLoadingSettings] = useState(false);

    useEffect(() => {
        if (isAuthenticated && token) {
            loadSettings();
        } else {
            setSettings(defaultSettings);
        }
    }, [isAuthenticated, token]);

    const loadSettings = async () => {
        try {
            setLoadingSettings(true);

            const response = await settingsService.getSettings(token);

            setSettings({
                ...defaultSettings,
                ...response.data.settings,
            });

        } catch (error) {
            console.log(
                "Error loading settings:",
                error.response?.data?.message || error.message
            );
        } finally {
            setLoadingSettings(false);
        }
    };

    const updateSettingsBackend = async (newSettings) => {
        try {
            await settingsService.updateSettings(
                newSettings,
                token
            );

            setSettings(newSettings);

            return {
                success: true,
                message: "Configuración actualizada correctamente.",
            };

        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Error al actualizar configuración.",
            };
        }
    };

    const toggleNotifications = async () => {
        const newSettings = {
            ...settings,
            notifications: !settings.notifications,
        };

        return await updateSettingsBackend(newSettings);
    };

    const toggleDarkMode = async () => {
        const newSettings = {
            ...settings,
            darkMode: !settings.darkMode,
        };

        return await updateSettingsBackend(newSettings);
    };

    const theme = {
        ...(settings.darkMode ? darkTheme : lightTheme),
        darkMode: settings.darkMode,
    };

    return (
        <SettingsContext.Provider
            value={{
                settings,
                theme,
                loadingSettings,
                toggleNotifications,
                toggleDarkMode,
                loadSettings,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}