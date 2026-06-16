import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getData,
    saveData,
} from "../services/storage";

const SettingsContext = createContext();

const STORAGE_KEY_SETTINGS = "@settings";

const defaultSettings = {
    notifications: true,
    darkMode: false,
    language: "Español",
};

const lightTheme = {
    background: '#f8fafc',
    secBackground: '#eefafa',
    surface: '#ffffff',
    secondarySurface: '#f1f5f9',
    textPrimary: '#000000',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    primary: '#2563eb',
    secondary: '#10b981',
    white: '#ffffff',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    gradientPrimary: ['#2563eb', '#10b981'],
    gradientDark: ['#1e3a8a', '#059669'],
    infoBackground: '#eff6ff',
    infoBorder: '#dbeafe',
    buttonBackground: '#6d6f0a',
};

const darkTheme = {
    background: '#0b1120',
    secBackground: '#0F3A3F',
    surface: '#111827',
    secondarySurface: '#1f2937',
    textPrimary: '#f8fafc',
    textSecondary: '#94a3b8',
    border: '#374151',
    primary: '#22c55e',
    secondary: '#10b981',
    white: '#ffffff',
    success: '#22c55e',
    warning: '#fbbf24',
    danger: '#f87171',
    gradientPrimary: ['#065f46', '#10b981'],
    gradientDark: ['#0f172a', '#0f766e'],
    infoBackground: '#1f2937',
    infoBorder: '#374151',
    buttonBackground: '#065f46',
};

export function SettingsProvider({ children }) {

    const [settings, setSettings] = useState(defaultSettings);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const storedSettings = await getData(STORAGE_KEY_SETTINGS);

            if (storedSettings) {
                setSettings(storedSettings);
            }
        } catch (error) {
            console.log("Error loading settings:", error);
        }
    };

    const saveSettings = async (newSettings) => {
        try {
            setSettings(newSettings);

            await saveData(
                STORAGE_KEY_SETTINGS,
                newSettings
            );
        } catch (error) {
            console.log("Error saving settings:", error);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | NOTIFICACIONES
    |--------------------------------------------------------------------------
    */

    const toggleNotifications = () => {
        const updatedSettings = {
            ...settings,
            notifications: !settings.notifications,
        };

        saveSettings(updatedSettings);
    };

    /*
    |--------------------------------------------------------------------------
    | TEMA OSCURO
    |--------------------------------------------------------------------------
    */

    const toggleDarkMode = () => {
        const updatedSettings = {
            ...settings,
            darkMode: !settings.darkMode,
        };

        saveSettings(updatedSettings);
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
                toggleNotifications,
                toggleDarkMode,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}