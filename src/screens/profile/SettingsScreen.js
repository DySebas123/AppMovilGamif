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
    const { settings, theme, toggleNotifications, toggleDarkMode } = useSettings();

    // Extrae los estados y metodos de simulacion temporal del contexto global de habitos

    // Extrae los estados y metodos de simulacion temporal del contexto global de habitos
    const {
        currentDate,
        demoDayOffset,
        simulateNextDay,
        resetData,
    } = useHabits();

    // Estado local para controlar la visibilidad del modal de advertencia para reinicio de datos
    const [resetAlertVisible, setResetAlertVisible] = useState(false);

    // Ejecuta el borrado total de la informacion y cierra la alerta de confirmacion
    const handleReset = () => {
        resetData();
        setResetAlertVisible(false);
    };

    return (
        <>
            <ScrollView
                style={[styles.container, { backgroundColor: theme.background }]}
                showsVerticalScrollIndicator={false}
            >
                {/* Encabezado con retorno explicito hacia la pestaña de Perfil del TabNavigator */}
                <SettingsHeader
                    onBack={() => navigation.navigate("Perfil")}
                />

                <Text style={[styles.sectionTitle, { color: theme.textPrimary }] }>
                    Preferencias
                </Text>

                {/* Seccion de componentes interactivos switch para alternar configuraciones */}
                <Card style={styles.card}>
                    <SettingsSwitchItem
                        icon="notifications-outline"
                        label="Notificaciones"
                        value={settings.notifications}
                        onChange={toggleNotifications}
                        text={theme.textPrimary}
                    />

                    <View style={[styles.divider, { backgroundColor: theme.secondarySurface }]} />

                    <SettingsSwitchItem
                        icon="moon-outline"
                        label="Tema oscuro"
                        value={settings.darkMode}
                        onChange={toggleDarkMode}
                        text={theme.textPrimary}
                    />
                </Card>

                <Text style={[styles.sectionTitle, {color: theme.textPrimary }] }>
                    Privacidad y experiencia
                </Text>

                {/* Bloque estatico de elementos informativos sobre la aplicacion */}
                <Card style={styles.card}>
                    <SettingsInfoItem
                        icon="shield-checkmark-outline"
                        title="Privacidad protegida"
                        description="Tu información y hábitos permanecen seguros dentro de la aplicación."
                        titleColor={theme.textPrimary}
                        descrColor={theme.textSecondary}
                    />

                    <View style={[styles.divider, { backgroundColor: theme.secondarySurface }]} />

                    <SettingsInfoItem
                        icon="color-palette-outline"
                        title="Personalización visual"
                        description="Ajusta la apariencia y preferencias para una experiencia más cómoda."
                        titleColor={theme.textPrimary}
                        descrColor={theme.textSecondary}
                    />

                    <View style={[styles.divider, { backgroundColor: theme.secondarySurface }]} />

                    <SettingsInfoItem
                        icon="sparkles-outline"
                        title="Experiencia optimizada"
                        description="La aplicación está diseñada para ayudarte a mantener tus hábitos diariamente."
                        titleColor={theme.textPrimary}
                        descrColor={theme.textSecondary}
                    />
                </Card>

                <Text style={[styles.sectionTitle, { color: theme.textPrimary }] }>
                    Simulación
                </Text>

                {/* Tarjeta de herramientas de depuracion para el control del tiempo en fase de desarrollo */}
                <Card style={styles.card}>
                    <Text style={[styles.demoDate, { color: theme.textPrimary }] }>
                        Fecha actual: {currentDate}
                    </Text>

                    <Text style={[styles.demoSubtext, { color: theme.textSecondary }] }>
                        Días simulados: {demoDayOffset}
                    </Text>

                    <TouchableOpacity
                        style={[styles.demoButton, { backgroundColor: theme.primary }]}
                        activeOpacity={0.8}
                        onPress={simulateNextDay}
                    >
                        <Ionicons
                            name="play-forward-outline"
                            size={18}
                            color={theme.white}
                        />

                        <Text style={[styles.demoButtonText, { color: theme.white }] }>
                            Simular siguiente día
                        </Text>
                    </TouchableOpacity>
                </Card>

                <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                    Datos
                </Text>

                {/* Seccion destructiva para restaurar por completo la base de datos local */}
                <Card style={styles.card}>
                    <TouchableOpacity
                        style={styles.resetButton}
                        activeOpacity={0.8}
                        onPress={() => setResetAlertVisible(true)}
                    >
                        <Ionicons
                            name="refresh-outline"
                            size={20}
                            color={theme.danger}
                        />

                        <Text style={[styles.resetText, { color: theme.danger }] }>
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
        backgroundColor: COLORS.secBackground,
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