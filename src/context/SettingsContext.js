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

    return (
        <SettingsContext.Provider
            value={{
                settings,

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