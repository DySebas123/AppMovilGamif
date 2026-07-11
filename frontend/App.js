import React, { useEffect } from "react";

import AppNavigator from "./src/navigation/AppNavigator";

import { HabitProvider, useHabits } from "./src/context/HabitContext";
import { AuthProvider } from "./src/context/AuthContext";
import { SettingsProvider } from "./src/context/SettingsContext";

import { initializeNotifications } from "./src/services/notificationService";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AchievementUnlockedModal from "./src/components/rewards/AchievementUnlockedModal";

function AchievementCelebrationLayer() {
    const { celebratingAchievement, dismissCelebration } = useHabits();

    return (
        <AchievementUnlockedModal
            achievement={celebratingAchievement}
            visible={!!celebratingAchievement}
            onClose={dismissCelebration}
        />
    );
}

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
                        <AchievementCelebrationLayer/>
                    </HabitProvider>
                </SettingsProvider>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}