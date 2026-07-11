import React, { useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import MainButton from "../../components/MainButton";
import CustomAlert from "../../components/CustomAlert";

import AppHeader from "../../components/common/AppHeader";
import Card from "../../components/common/Card";
import InfoBox from "../../components/common/InfoBox";

import HabitPreviewCard from "../../components/habits/HabitPreviewCard";
import FrequencySelector from "../../components/habits/FrequencySelector";

import { useHabits } from "../../context/HabitContext";
import { useSettings } from "../../context/SettingsContext";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";
import SPACING from "../../styles/spacing";
import TYPOGRAPHY from "../../styles/typography";

const icons = [
    "checkmark-circle-outline",
    "book-outline",
    "heart-outline",
    "cafe-outline",
    "fitness-outline",
    "musical-notes-outline",
    "code-slash-outline",
    "briefcase-outline",
];

export default function EditHabitScreen({ navigation, route }) {
    const { habit } = route.params;

    const { updateHabit } = useHabits();
    const { theme } = useSettings();

    const [title, setTitle] = useState(habit.title);
    const [frequency, setFrequency] = useState(habit.type);
    const [selectedIcon, setSelectedIcon] = useState(
        habit.icon || "checkmark-circle-outline"
    );

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [goBackAfterAlert, setGoBackAfterAlert] = useState(false);

    const showAlert = (type, title, message, goBack = false) => {
        setAlertType(type);
        setAlertTitle(title);
        setAlertMessage(message);
        setGoBackAfterAlert(goBack);
        setAlertVisible(true);
    };

    const handleUpdateHabit = async () => {
        if (!title.trim()) {
            showAlert(
                "error",
                "Campo requerido",
                "El nombre del hábito no puede estar vacío."
            );
            return;
        }

        const result = await updateHabit(habit.id, {
            title: title.trim(),
            type: frequency,
            icon: selectedIcon,
        });

        if (result?.success === false) {
            showAlert(
                "error",
                "Error",
                result.message || "No se pudo actualizar el hábito."
            );
            return;
        }

        showAlert(
            "success",
            "Hábito actualizado",
            "Los cambios fueron guardados correctamente.",
            true
        );
    };

    const handleCloseAlert = () => {
        setAlertVisible(false);

        if (goBackAfterAlert) {
            navigation.goBack();
        }
    };

    return (
        <>
            <SafeAreaView
                style={[
                    styles.container,
                    { backgroundColor: theme.background },
                ]}
            >
                <AppHeader
                    title="Editar hábito"
                    icon="arrow-back"
                    onBack={() => navigation.goBack()}
                />

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <HabitPreviewCard
                        label="Hábito seleccionado"
                        title={title}
                        frequency={frequency}
                        icon={selectedIcon}
                    />

                    <Card>
                        <Text
                            style={[
                                styles.sectionTitle,
                                { color: theme.textPrimary },
                            ]}
                        >
                            Información del hábito
                        </Text>

                        <Text
                            style={[
                                styles.label,
                                { color: theme.textSecondary },
                            ]}
                        >
                            Nombre
                        </Text>

                        <View
                            style={[
                                styles.inputContainer,
                                {
                                    backgroundColor: theme.secondarySurface,
                                    borderColor: theme.border,
                                },
                            ]}
                        >
                            <Ionicons
                                name="create-outline"
                                size={20}
                                color={theme.textSecondary}
                                style={styles.inputIcon}
                            />

                            <TextInput
                                value={title}
                                onChangeText={setTitle}
                                style={[
                                    styles.input,
                                    { color: theme.textPrimary },
                                ]}
                                placeholder="Ej: Leer 30 minutos"
                                placeholderTextColor={theme.textSecondary}
                            />
                        </View>

                        <Text
                            style={[
                                styles.label,
                                { color: theme.textSecondary },
                            ]}
                        >
                            Ícono
                        </Text>

                        <View style={styles.iconGrid}>
                            {icons.map((icon) => {
                                const selected = selectedIcon === icon;

                                return (
                                    <TouchableOpacity
                                        key={icon}
                                        style={[
                                            styles.iconButton,
                                            {
                                                backgroundColor: selected
                                                    ? theme.primary
                                                    : theme.secondarySurface,
                                                borderColor: selected
                                                    ? theme.primary
                                                    : theme.border,
                                            },
                                        ]}
                                        activeOpacity={0.8}
                                        onPress={() => setSelectedIcon(icon)}
                                    >
                                        <Ionicons
                                            name={icon}
                                            size={24}
                                            color={
                                                selected
                                                    ? "#ffffff"
                                                    : theme.textSecondary
                                            }
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        <Text
                            style={[
                                styles.label,
                                { color: theme.textSecondary },
                            ]}
                        >
                            Frecuencia
                        </Text>

                        <FrequencySelector
                            frequency={frequency}
                            onChangeFrequency={setFrequency}
                        />

                        <InfoBox
                            text="Mantén el hábito actualizado para que tus estadísticas, rachas y recompensas reflejen mejor tu progreso."
                        />

                        <MainButton
                            title="Guardar cambios"
                            onPress={handleUpdateHabit}
                        />
                    </Card>

                    <View style={{ height: 120 }} />
                </ScrollView>
            </SafeAreaView>

            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                type={alertType}
                onClose={handleCloseAlert}
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
        backgroundColor: COLORS.background,
    },

    content: {
        flex: 1,
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.lg,
    },

    sectionTitle: {
        ...TYPOGRAPHY.titleMD,
        color: COLORS.textPrimary,
        marginBottom: 20,
    },

    label: {
        ...TYPOGRAPHY.bodyMD,
        fontWeight: "700",
        color: "#334155",
        marginBottom: 10,
    },

    inputContainer: {
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        marginBottom: 20,
        ...SHADOWS.small,
    },

    inputIcon: {
        marginRight: 8,
    },

    input: {
        flex: 1,
        paddingVertical: 15,
        fontSize: 16,
        color: COLORS.textPrimary,
    },

    iconGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 12,
        marginBottom: 21,
    },

    iconButton: {
        width: "16%",
        aspectRatio: 1,
        borderRadius: 16,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.small,
    },
});