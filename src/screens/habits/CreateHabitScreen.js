import React, { useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    SafeAreaView,
    ScrollView,
    Platform
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import MainButton from "../../components/MainButton";
import CustomAlert from "../../components/CustomAlert";

import AppHeader from "../../components/common/AppHeader";
import Card from "../../components/common/Card";
import InfoBox from "../../components/common/InfoBox";

import HabitPreviewCard from "../../components/habits/HabitPreviewCard";
import IconSelector from "../../components/habits/IconSelector";
import FrequencySelector from "../../components/habits/FrequencySelector";
import PopularIdeas from "../../components/habits/PopularIdeas";

import { useHabits } from "../../context/HabitContext";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";
import SPACING from "../../styles/spacing";
import TYPOGRAPHY from "../../styles/typography";

// Diccionario para vincular los nombres de identificadores con iconos de Ionicons
const ICON_MAP = {
    fitness: "fitness-outline",
    book: "book-outline",
    heart: "heart-outline",
    cafe: "cafe-outline",
    brush: "brush-outline",
    musical: "musical-notes-outline",
    code: "code-slash-outline",
    briefcase: "briefcase-outline",
};

// Convierte las llaves del mapa de iconos en un array mapeado para los selectores
const AVAILABLE_ICONS = Object.keys(ICON_MAP).map(id => ({ id, name: ICON_MAP[id] }));

// Listado de sugerencias predefinidas para la creacion rapida de habitos
const POPULAR_IDEAS = [
    { id: "1", title: "Ejercicio", icon: "fitness-outline" },
    { id: "2", title: "Leer", icon: "book-outline" },
    { id: "3", title: "Meditar", icon: "leaf-outline" },
    { id: "4", title: "Beber agua", icon: "water-outline" },
    { id: "5", title: "Arte", icon: "color-palette-outline" },
    { id: "6", title: "Gratitud", icon: "heart-outline" },
];

export default function CreateHabitScreen({ navigation }) {
    // Extrae el metodo de creacion del contexto global de habitos
    const { addHabit } = useHabits();

    // Estados para controlar los atributos del nuevo habito
    const [habitName, setHabitName] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("fitness");
    const [frequency, setFrequency] = useState("Diario");
    const [loading, setLoading] = useState(false);

    // Estados para gestionar la configuracion y visibilidad de la alerta
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [goBackAfterAlert, setGoBackAfterAlert] = useState(false);

    // Obtiene de forma directa el nombre del icono actual o usa uno por defecto
    const selectedIconName = ICON_MAP[selectedIcon] || "star-outline";

    // Modifica las propiedades y muestra la alerta en pantalla
    const showAlert = (type, title, message, goBack = false) => {
        setAlertType(type);
        setAlertTitle(title);
        setAlertMessage(message);
        setGoBackAfterAlert(goBack);
        setAlertVisible(true);
    };

    // Valida la informacion y almacena el nuevo habito
    const handleSaveHabit = async () => {
        // Verifica que el campo de texto no este vacio
        if (!habitName.trim()) {
            showAlert(
                "error",
                "Campo requerido",
                "Debes ingresar un nombre para el hábito."
            );
            return;
        }

        setLoading(true);

        // Invoca el metodo del contexto para guardar el registro
        addHabit({
            title: habitName.trim(),
            type: frequency,
            icon: selectedIconName,
        });

        setLoading(false);

        showAlert(
            "success",
            "Hábito creado",
            "Tu hábito fue agregado correctamente.",
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
        <SafeAreaView style={styles.container}>
            <AppHeader
                title="Crear Hábito"
                icon="close-outline"
                onBack={() => navigation.goBack()}
            />
            {/* Contenedor con scroll forzado por estilos para evitar bloqueos en web */}
            <ScrollView
                style={styles.scrollArea}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Visualizacion en tiempo real de la tarjeta del habito */}
                <HabitPreviewCard
                    title={habitName}
                    frequency={frequency}
                    icon={selectedIconName}
                />
                <Card style={styles.formCard}>
                    <Text style={styles.sectionTitle}>
                        Información del hábito
                    </Text>
                    <Text style={styles.label}>
                        Nombre del hábito
                    </Text>
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="create-outline"
                            size={20}
                            color={COLORS.textSecondary}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Ej: Estudiar inglés, correr, leer..."
                            placeholderTextColor="#94a3b8"
                            value={habitName}
                            onChangeText={setHabitName}
                        />
                    </View>
                    <Text style={styles.label}>
                        Elige un icono
                    </Text>
                    <IconSelector
                        icons={AVAILABLE_ICONS}
                        selectedIcon={selectedIcon}
                        onSelectIcon={setSelectedIcon}
                    />
                    <Text style={styles.label}>
                        Frecuencia
                    </Text>
                    <FrequencySelector
                        frequency={frequency}
                        onChangeFrequency={setFrequency}
                    />
                    <InfoBox
                        text="Comienza con hábitos pequeños y alcanzables. La constancia es más importante que la perfección."
                    />
                    <MainButton
                        colors={["#007fff", "#5ac15d"]}
                        title="Guardar Hábito"
                        onPress={handleSaveHabit}
                        loading={loading}
                    />
                </Card>
                <Text style={styles.ideasSectionTitle}>
                    Ideas de hábitos populares
                </Text>
                <PopularIdeas
                    ideas={POPULAR_IDEAS}
                    onSelectIdea={setHabitName}
                />
                <View style={{ height: 120 }} />
            </ScrollView>
            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                type={alertType}
                onClose={handleCloseAlert}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        flex: 1,
        ...Platform.select({
        web: {
            overflowY: 'auto',
        }
    })
    },

    scrollContent: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.lg,
        paddingBottom: 120,
    },

    scrollArea: {
        flex: 1,
        backgroundColor: COLORS.background,
        // Habilita el desplazamiento del mouse de forma explicita en entornos web
        ...Platform.select({
            web: {
                overflow: 'auto',
            }
        })
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

    ideasSectionTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#334155",
        marginBottom: 15,
        marginTop: 15,
    },
});