import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

if (Platform.OS !== "web") {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });
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
            message: "Recordatorio activo.",
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
            message: "Recordatorio desactivado.",
        };
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    return {
        success: true,
        simulated: false,
        message: "Recordatorios cancelados correctamente.",
    };
}