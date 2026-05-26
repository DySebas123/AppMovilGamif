import React from "react";

import AppNavigator from "./src/navigation/AppNavigator";

import { HabitProvider } from "./src/context/HabitContext";
import { AuthProvider } from "./src/context/AuthContext";
import { SettingsProvider } from "./src/context/SettingsContext";

export default function App() {
    return (
        <AuthProvider>
            <SettingsProvider>
                <HabitProvider>
                    <AppNavigator />
                </HabitProvider>
            </SettingsProvider>
        </AuthProvider>
    );
}