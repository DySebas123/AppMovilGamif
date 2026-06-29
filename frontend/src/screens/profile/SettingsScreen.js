import React, { useState } from "react";

import {
    StyleSheet,
    ScrollView,
    View,
} from "react-native";

import CustomAlert from "../../components/CustomAlert";

import SettingsHeader from "../../components/profile/settings/SettingsHeader";
import SettingsSectionTitle from "../../components/profile/settings/SettingsSectionTitle";
import SettingsSwitchCard from "../../components/profile/settings/SettingsSwitchCard";
import SettingsInfoCard from "../../components/profile/settings/SettingsInfoCard";
import SettingsSimulationCard from "../../components/profile/settings/SettingsSimulationCard";
import SettingsResetCard from "../../components/profile/settings/SettingsResetCard";

import { useSettings } from "../../context/SettingsContext";
import { useHabits } from "../../context/HabitContext";

import {
    requestNotificationPermission,
    scheduleDailyHabitReminder,
    cancelHabitReminders,
} from "../../services/notificationService";

export default function SettingsScreen({ navigation }) {
    const {
        settings,
        theme,
        toggleNotifications,
        toggleDarkMode,
    } = useSettings();

    const {
        currentDate,
        demoDayOffset,
        simulateNextDay,
        resetData,
    } = useHabits();

    const [resetAlertVisible, setResetAlertVisible] = useState(false);

    const [notificationAlertVisible, setNotificationAlertVisible] = useState(false);
    const [notificationAlertType, setNotificationAlertType] = useState("success");
    const [notificationAlertTitle, setNotificationAlertTitle] = useState("");
    const [notificationAlertMessage, setNotificationAlertMessage] = useState("");

    const showNotificationAlert = (type, title, message) => {
        setNotificationAlertType(type);
        setNotificationAlertTitle(title);
        setNotificationAlertMessage(message);
        setNotificationAlertVisible(true);
    };

    const handleToggleNotifications = async () => {
        if (!settings.notifications) {
            const granted = await requestNotificationPermission();

            if (!granted) {
                showNotificationAlert(
                    "warning",
                    "Permiso requerido",
                    "Las notificaciones no están disponibles en Expo Web. Para probar esta función debes usar Expo Go en celular."
                );
                return;
            }

            const result = await scheduleDailyHabitReminder();

            if (!result.success) {
                showNotificationAlert(
                    "warning",
                    "No disponible en web",
                    result.message
                );
                return;
            }

            await toggleNotifications();

            showNotificationAlert(
                "success",
                "Recordatorio activado",
                result.message
            );
        } else {
            const result = await cancelHabitReminders();

            if (!result.success) {
                showNotificationAlert(
                    "warning",
                    "No disponible en web",
                    result.message
                );
                return;
            }

            await toggleNotifications();

            showNotificationAlert(
                "success",
                "Recordatorio desactivado",
                result.message
            );
        }
    };

    const handleToggleDarkMode = async () => {
        await toggleDarkMode();
    };

    const handleReset = async () => {
        await resetData();
        setResetAlertVisible(false);
    };

    return (
        <>
            <ScrollView
                style={[
                    styles.container,
                    { backgroundColor: theme.background },
                ]}
                showsVerticalScrollIndicator={false}
            >
                <SettingsHeader
                    onBack={() => navigation.navigate("Perfil")}
                />

                <SettingsSectionTitle
                    title="Preferencias"
                    theme={theme}
                />

                <SettingsSwitchCard
                    theme={theme}
                    notifications={settings.notifications}
                    darkMode={settings.darkMode}
                    onToggleNotifications={handleToggleNotifications}
                    onToggleDarkMode={handleToggleDarkMode}
                />

                <SettingsSectionTitle
                    title="Privacidad y experiencia"
                    theme={theme}
                />

                <SettingsInfoCard theme={theme} />

                <SettingsSectionTitle
                    title="Simulación"
                    theme={theme}
                />

                <SettingsSimulationCard
                    theme={theme}
                    currentDate={currentDate}
                    demoDayOffset={demoDayOffset}
                    onSimulateNextDay={simulateNextDay}
                />

                <SettingsSectionTitle
                    title="Datos"
                    theme={theme}
                />

                <SettingsResetCard
                    theme={theme}
                    onReset={() => setResetAlertVisible(true)}
                />

                <View style={{ height: 100 }} />
            </ScrollView>

            <CustomAlert
                visible={resetAlertVisible}
                title="Reiniciar progreso"
                message="¿Deseas eliminar todos los hábitos y estadísticas?"
                type="warning"
                confirmMode
                confirmText="Reiniciar"
                cancelText="Cancelar"
                onClose={() => setResetAlertVisible(false)}
                onConfirm={handleReset}
                containerColor={theme.surface}
                titleColor={theme.textPrimary}
                messageColor={theme.textSecondary}
            />

            <CustomAlert
                visible={notificationAlertVisible}
                title={notificationAlertTitle}
                message={notificationAlertMessage}
                type={notificationAlertType}
                onClose={() => setNotificationAlertVisible(false)}
                containerColor={theme.surface}
                titleColor={theme.textPrimary}
                messageColor={theme.textSecondary}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});