import { Platform } from "react-native";

let Notifications = null;
if (Platform.OS !== "web") {
    const originalConsoleError = console.error;
    console.error = (...args) => {
        if (
            typeof args[0] === "string" &&
            args[0].includes("expo-notifications: Android Push notifications")
        ) {
            return;
        }
        originalConsoleError(...args);
    };

    try {
        Notifications = require("expo-notifications");
    } catch (error) {
        console.warn("Could not load expo-notifications:", error);
    } finally {
        console.error = originalConsoleError;
    }
}

export function initializeNotifications() {
    if (Platform.OS !== "web" && Notifications) {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });
    }
}

export async function requestNotificationPermission() {
    if (Platform.OS === "web") {
        return true;
    }

    const { status } = await Notifications.requestPermissionsAsync();

    return status === "granted";
}

export async function scheduleDailyHabitReminder() {
    if (Platform.OS === "web") {
        return {
            success: true,
            simulated: true,
            message: "Recordatorio activado",
        };
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Recordatorio de HabitQuest",
            body: "No olvides completar tus hábitos de hoy.",
            sound: true,
        },
        trigger: {
            hour: 20,
            minute: 0,
            repeats: true,
        },
    });

    return {
        success: true,
        simulated: false,
        message: "Recordatorio diario activado correctamente.",
    };
}

export async function cancelHabitReminders() {
    if (Platform.OS === "web") {
        return {
            success: true,
            simulated: true,
            message: "Recordatorio desactivado",
        };
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    return {
        success: true,
        simulated: false,
        message: "Recordatorios cancelados correctamente.",
    };
}