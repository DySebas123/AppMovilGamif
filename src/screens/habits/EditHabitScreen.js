import React, { useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    SafeAreaView,
    ScrollView,
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

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";
import SPACING from "../../styles/spacing";
import TYPOGRAPHY from "../../styles/typography";

export default function EditHabitScreen({ navigation, route }) {

    // Recibe el objeto del habito desde los parametros de la ruta
    const { habit } = route.params;
    // Extrae el metodo de actualizacion del contexto global de habitos
    const { updateHabit } = useHabits();

    // Inicializa los estados con los valores actuales del habito seleccionado
    const [title, setTitle] = useState(habit.title);
    const [frequency, setFrequency] = useState(habit.type);

    // Estados para controlar la configuracion y visibilidad de la alerta
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [goBackAfterAlert, setGoBackAfterAlert] = useState(false);

    // Modifica las propiedades y muestra la alerta en pantalla
    const showAlert = (
        type,
        title,
        message,
        goBack = false
    ) => {
        setAlertType(type);
        setAlertTitle(title);
        setAlertMessage(message);
        setGoBackAfterAlert(goBack);
        setAlertVisible(true);
    };

    // Valida la informacion y procesa los cambios del habito
    const handleUpdateHabit = () => {
        // Valida que el titulo modificado no este vacio
        if (!title.trim()) {
            showAlert("error", "Campo requerido",
                "El nombre del hábito no puede estar vacío.");
            return;
        }

        // Invoca el metodo del contexto para actualizar el registro por ID
        updateHabit(habit.id, {
            title: title.trim(),
            type: frequency,
        });

        showAlert(
            "success",
            "Hábito actualizado",
            "Los cambios fueron guardados correctamente.",
            true
        );
    };

    // Oculta la alerta y gestiona el retorno de pantalla si es necesario
    const handleCloseAlert = () => {
        setAlertVisible(false);

        if (goBackAfterAlert) {
            navigation.goBack();
        }
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <AppHeader
                    title="Editar hábito"
                    icon="arrow-back"
                    onBack={() => navigation.goBack()}
                />
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Tarjeta de previsualizacion con los cambios en tiempo real */}
                    <HabitPreviewCard
                        label="Hábito seleccionado"
                        title={title}
                        frequency={frequency}
                        icon={habit.icon || "checkmark-circle-outline"}
                    />
                    <Card>
                        <Text style={styles.sectionTitle}>
                            Información del hábito
                        </Text>
                        <Text style={styles.label}>
                            Nombre
                        </Text>
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="create-outline"
                                size={20}
                                color={COLORS.textSecondary}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                value={title}
                                onChangeText={setTitle}
                                style={styles.input}
                                placeholder="Ej: Leer 30 minutos"
                                placeholderTextColor="#94a3b8"
                            />
                        </View>
                        <Text style={styles.label}>
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
});