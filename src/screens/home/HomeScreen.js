import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar,
    ActivityIndicator } from "react-native";

import HabitCard from "../../components/HabitCard";
import StatsCard from "../../components/StatsCard";
import SectionTitle from "../../components/SectionTitle";
import CustomAlert from "../../components/CustomAlert";

import HomeHeader from "../../components/home/HomeHeader";
import LevelProgressCard from "../../components/home/LevelProgressCard";
import QuoteBanner from "../../components/home/QuoteBanner";
import FloatingAddButton from "../../components/home/FloatingAddButton";

import { useHabits } from "../../context/HabitContext";
import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../context/SettingsContext";

import { LinearGradient } from "expo-linear-gradient";
import { getRandomQuote } from "../../services/quoteService";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";
import SPACING from "../../styles/spacing";

export default function HomeScreen({ navigation }) {
    // Extrae los estados globales y metodos para la gestion de habitos y progreso
    const {
        habits,
        toggleHabit,
        completedHabits,
        progressPercentage,
        loading,
        xp,
        level,
        bestStreak,
        deleteHabit,
    } = useHabits();

    const { theme } = useSettings();

    // Obtiene los datos del usuario actualmente autenticado
    const { user } = useAuth();

    // Estado local para almacenar la frase motivacional del dia
    const [quote, setQuote] = useState(null);

    // Estados para controlar el flujo de eliminacion y la alerta de confirmacion
    const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);
    const [habitToDelete, setHabitToDelete] = useState(null);

    // Define el nombre a mostrar y extrae la inicial para el avatar del perfil
    const userName = user?.name || "Usuario";
    const userInitial = userName.charAt(0).toUpperCase();

    // Carga de forma unica una frase aleatoria al montar el componente
    useEffect(() => {
        const randomQuote = getRandomQuote();
        setQuote(randomQuote);
    }, []);

    // Almacena temporalmente el habito seleccionado y abre la alerta de eliminacion
    const handleDeleteHabit = (habit) => {
        setHabitToDelete(habit);
        setDeleteAlertVisible(true);
    };

    // Confirma la eliminacion permanente e invoca el metodo del contexto
    const confirmDeleteHabit = () => {
        if (habitToDelete) {
            deleteHabit(habitToDelete.id);
        }
        setDeleteAlertVisible(false);
        setHabitToDelete(null);
    };

    // Cancela el proceso de eliminacion limpiando los estados temporales
    const cancelDeleteHabit = () => {
        setDeleteAlertVisible(false);
        setHabitToDelete(null);
    };

    // Redirige a la pantalla de edicion pasando el objeto del habito por ruta
    const handleEditHabit = (habit) => {
        navigation.navigate("EditHabit", { habit });
    };

    // Redirige a la pestaña de perfil del usuario
    const handleGoProfile = () => {
        navigation.navigate("Profile");
    };

    // Renderiza una pantalla de carga mientras se obtienen los datos del contexto
    if (loading) {
        return (
            <View style={[styles.loaderContainer, {backgroundColor: theme.background }]}> 
                <ActivityIndicator size="large" color={theme.primary}/>
            </View>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}> 
            <StatusBar
                barStyle={theme.darkMode ? "light-content" : "dark-content"}
                backgroundColor={theme.background}
            />
            <LinearGradient
                colors={["#06402B", "#065f46"]}
                style={[styles.headerContainer]}
            >
                <HomeHeader
                    userName={userName}
                    userInitial={userInitial}
                    onPressProfile={handleGoProfile}
                />
                <LevelProgressCard
                    level={level}
                    xp={xp}
                    progressPercentage={progressPercentage}
                    theme={theme}
                />
            </LinearGradient>
            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Bloque de tarjetas informativas con las estadisticas del usuario */}
                <View style={styles.statsRow}>
                    <StatsCard
                        icon="trophy-outline"
                        iconColor={"#3b82f6"}
                        iconContColor={theme.surface}
                        cardColor={theme.secondarySurface}
                        title="Puntos"
                        value={`${xp}`}
                        theme={theme}
                        titleColor={theme.textSecondary}
                        valueColor={theme.textPrimary}
                    />
                    <StatsCard
                        icon="flame-outline"
                        iconColor={"#f97316"}
                        iconContColor={theme.surface}
                        cardColor={theme.secondarySurface}
                        title="Mejor Racha"
                        value={`${bestStreak} días`}
                        theme={theme}
                        titleColor={theme.textSecondary}
                        valueColor={theme.textPrimary}
                    />
                </View>
                <View style={styles.statsRow}>
                    <StatsCard
                        icon="checkmark-circle-outline"
                        iconColor={theme.success}
                        iconContColor={theme.surface}
                        cardColor={theme.secondarySurface}
                        title="Completados"
                        value={`${completedHabits}`}
                        theme={theme}
                        titleColor={theme.textSecondary}
                        valueColor={theme.textPrimary}
                    />
                    <StatsCard
                        icon="star-outline"
                        iconColor={"#a855f7"}
                        iconContColor={theme.surface}
                        cardColor={theme.secondarySurface}
                        title="Nivel"
                        value={`${level}`}
                        theme={theme}
                        titleColor={theme.textSecondary}
                        valueColor={theme.textPrimary}
                    />
                </View>
                {/* Banner de texto motivacional obtenido desde el servicio externo */}
                <QuoteBanner quote={quote?.text} />
                <View style={styles.sectionHeader}>
                    <SectionTitle title="Hábitos de Hoy" theme={theme} />
                    <Text style={[styles.completedText, { color: theme.textSecondary }] }>
                        {completedHabits}/{habits.length} completados
                    </Text>
                </View>
                {/* Renderiza iterativamente la lista de habitos actuales mediante un mapeo */}
                {habits.map((habit) => (
                    <HabitCard
                        key={habit.id}
                        title={habit.title}
                        type={habit.type}
                        streak={habit.streak}
                        completed={habit.completed}
                        onPress={() => toggleHabit(habit.id)}
                        onDelete={() => handleDeleteHabit(habit)}
                        onLongPress={() => handleEditHabit(habit)}
                        cardColor={theme.secondarySurface}
                    />
                ))}
                <View style={{ height: 120 }} />
            </ScrollView>
            {/* Boton flotante vinculado a la pantalla de creacion de habitos del Tab */}
            <FloatingAddButton
                onPress={() => {
                    navigation.navigate("CrearHábito");
                }}
            />
            <CustomAlert
                visible={deleteAlertVisible}
                title="Eliminar hábito"
                message={`¿Deseas eliminar "${habitToDelete?.title}"? Esta acción no se puede deshacer.`}
                type="warning"
                confirmMode
                confirmText="Eliminar"
                cancelText="Cancelar"
                onClose={cancelDeleteHabit}
                onConfirm={confirmDeleteHabit}
                containerColor={theme.surface}
                titleColor={theme.textPrimary}
                messageColor={theme.textSecondary}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
    },

    container: {
        flex: 1,
        backgroundColor: COLORS.secBackground,
    },

    headerContainer: {
        paddingTop: 60,
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.lg,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        ...SHADOWS.medium,
    },

    content: {
        flex: 1,
        paddingHorizontal: SPACING.lg,
        paddingTop: 22,
        backgroundColor: 'transparent',
    },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 14,
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    completedText: {
        color: COLORS.textSecondary,
        fontSize: 13,
        fontWeight: "600",
    },
});