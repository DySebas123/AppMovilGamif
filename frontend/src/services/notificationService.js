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

export async function initializeNotifications() {
    if (Platform.OS === "web" || !Notifications) {
        return;
    }

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowBanner: true,
            shouldShowList: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });

    // Android requiere un canal explícito desde Android 8 (API 26+).
    // Sin esto, las notificaciones pueden no sonar o no mostrarse
    // correctamente aunque el código no arroje ningún error.
    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            sound: "default",
        });

        await Notifications.setNotificationChannelAsync("achievements", {
            name: "Logros",
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            sound: "default",
        });
    }
}

export async function requestNotificationPermission() {
    if (Platform.OS === "web") {
        return true;
    }

    const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

    if (existingStatus === "granted") {
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

    const granted = await requestNotificationPermission();

    if (!granted) {
        return {
            success: false,
            simulated: false,
            message: "No se otorgaron permisos de notificación.",
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
            channelId: Platform.OS === "android" ? "default" : undefined,
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

/**
 * Dispara una notificación inmediata cuando el usuario desbloquea un logro.
 * Debe llamarse justo en el momento en que tu lógica de negocio detecta
 * que un achievement pasó de "no conseguido" a "conseguido".
 *
 * @param {Object} achievement
 * @param {string} achievement.title - Nombre del logro (ej: "Racha de 7 días")
 * @param {string} [achievement.description] - Descripción opcional del logro
 */
export async function sendAchievementNotification(achievement) {
    if (!achievement || !achievement.title) {
        return {
            success: false,
            simulated: false,
            message: "Falta la información del logro.",
        };
    }

    if (Platform.OS === "web") {
        return {
            success: true,
            simulated: true,
            message: "Notificación de logro simulada (web).",
        };
    }

    const granted = await requestNotificationPermission();

    if (!granted) {
        return {
            success: false,
            simulated: false,
            message: "No se otorgaron permisos de notificación.",
        };
    }

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "🏆 ¡Nuevo logro desbloqueado!",
            body: achievement.description
                ? `${achievement.title} — ${achievement.description}`
                : achievement.title,
            sound: true,
        },
        // En Android, un trigger con SOLO channelId no es un tipo
        // reconocido de forma confiable por expo-notifications y puede
        // no dispararse. El patrón correcto para "casi inmediato" +
        // canal personalizado es un trigger de intervalo (seconds) junto
        // con el channelId. En iOS, trigger: null sigue siendo válido.
        trigger: Platform.OS === "android"
            ? { seconds: 1, channelId: "achievements" }
            : null,
    });

    return {
        success: true,
        simulated: false,
        message: "Notificación de logro enviada.",
    };
}