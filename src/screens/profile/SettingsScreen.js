import React, { useState } from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import CustomAlert from "../../components/CustomAlert";

import Card from "../../components/common/Card";
import SettingsHeader from "../../components/profile/SettingsHeader";
import SettingsSwitchItem from "../../components/profile/SettingsSwitchItem";
import SettingsInfoItem from "../../components/profile/SettingsInfoItem";

import { useSettings } from "../../context/SettingsContext";
import { useHabits } from "../../context/HabitContext";

import COLORS from "../../styles/colors";
import SPACING from "../../styles/spacing";
import SHADOWS from "../../styles/shadows";

export default function SettingsScreen({ navigation }) {

    const {
        settings,
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

    const handleReset = () => {
        resetData();
        setResetAlertVisible(false);
    };

    return (
        <>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <SettingsHeader
                    onBack={() => navigation.navigate("Perfil")}
                />

                <Text style={styles.sectionTitle}>
                    Preferencias
                </Text>

                <Card style={styles.card}>
                    <SettingsSwitchItem
                        icon="notifications-outline"
                        label="Notificaciones"
                        value={settings.notifications}
                        onChange={toggleNotifications}
                    />

                    <View style={styles.divider} />

                    <SettingsSwitchItem
                        icon="moon-outline"
                        label="Tema oscuro"
                        value={settings.darkMode}
                        onChange={toggleDarkMode}
                    />
                </Card>

                <Text style={styles.sectionTitle}>
                    Privacidad y experiencia
                </Text>

                <Card style={styles.card}>
                    <SettingsInfoItem
                        icon="shield-checkmark-outline"
                        title="Privacidad protegida"
                        description="Tu información y hábitos permanecen seguros dentro de la aplicación."
                    />

                    <View style={styles.divider} />

                    <SettingsInfoItem
                        icon="color-palette-outline"
                        title="Personalización visual"
                        description="Ajusta la apariencia y preferencias para una experiencia más cómoda."
                    />

                    <View style={styles.divider} />

                    <SettingsInfoItem
                        icon="sparkles-outline"
                        title="Experiencia optimizada"
                        description="La aplicación está diseñada para ayudarte a mantener tus hábitos diariamente."
                    />
                </Card>

                <Text style={styles.sectionTitle}>
                    Simulación
                </Text>

                <Card style={styles.card}>
                    <Text style={styles.demoDate}>
                        Fecha actual: {currentDate}
                    </Text>

                    <Text style={styles.demoSubtext}>
                        Días simulados: {demoDayOffset}
                    </Text>

                    <TouchableOpacity
                        style={styles.demoButton}
                        activeOpacity={0.8}
                        onPress={simulateNextDay}
                    >
                        <Ionicons
                            name="play-forward-outline"
                            size={18}
                            color={COLORS.white}
                        />

                        <Text style={styles.demoButtonText}>
                            Simular siguiente día
                        </Text>
                    </TouchableOpacity>
                </Card>

                <Text style={styles.sectionTitle}>
                    Datos
                </Text>

                <Card style={styles.card}>
                    <TouchableOpacity
                        style={styles.resetButton}
                        activeOpacity={0.8}
                        onPress={() => setResetAlertVisible(true)}
                    >
                        <Ionicons
                            name="refresh-outline"
                            size={20}
                            color={COLORS.danger}
                        />

                        <Text style={styles.resetText}>
                            Reiniciar progreso
                        </Text>
                    </TouchableOpacity>
                </Card>

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
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f5f9",
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.textPrimary,
        marginHorizontal: SPACING.lg,
        marginBottom: 10,
        marginTop: 24,
    },

    card: {
        marginHorizontal: SPACING.lg,
        padding: 18,
        ...SHADOWS.small,
    },

    divider: {
        height: 1,
        backgroundColor: "#f1f5f9",
        marginVertical: 15,
    },

    demoDate: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.textPrimary,
    },

    demoSubtext: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 4,
        marginBottom: 16,
    },

    demoButton: {
        backgroundColor: "#0f766e",
        paddingVertical: 14,
        borderRadius: 14,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },

    demoButtonText: {
        color: COLORS.white,
        fontWeight: "700",
        fontSize: 14,
    },

    resetButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },

    resetText: {
        color: COLORS.danger,
        fontWeight: "700",
        fontSize: 15,
    },
});