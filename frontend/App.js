import React, { useEffect } from "react";

import AppNavigator from "./src/navigation/AppNavigator";

import { HabitProvider } from "./src/context/HabitContext";
import { AuthProvider } from "./src/context/AuthContext";
import { SettingsProvider } from "./src/context/SettingsContext";

import { initializeNotifications } from "./src/services/notificationService";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function App() {
    useEffect(() => {
        initializeNotifications();
    }, []);
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
                <SettingsProvider>
                    <HabitProvider>
                        <AppNavigator />
                    </HabitProvider>
                </SettingsProvider>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}