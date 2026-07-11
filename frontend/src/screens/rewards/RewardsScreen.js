import React, { useMemo } from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from "react-native";

import RewardProgressCard from "../../components/rewards/RewardProgressCard";
import AchievementCard from "../../components/rewards/AchievementCard";
import NextAchievementCard from "../../components/rewards/NextAchievementCard";

import { getAchievemnts } from "../../services/achievemnts"

import { useHabits } from "../../context/HabitContext";
import { useSettings } from "../../context/SettingsContext";
import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../../styles/colors";
import SPACING from "../../styles/spacing";
import SHADOWS from "../../styles/shadows";
import TYPOGRAPHY from "../../styles/typography";

export default function RewardsScreen() {
    // Obtiene las variables de progreso actuales del contexto de habitos
    const { achievements } = useHabits();

    const { theme } = useSettings();

    // Cuenta de forma dinamica cuantos logros cumplen con la condicion de desbloqueado
    const unlockedAchievements = achievements.filter(
        item => item.unlocked
    ).length;

    // Obtiene el porcentaje entero del avance general de las recompensas
    const progressPercentage = Math.round(
        (unlockedAchievements / achievements.length) * 100
    );

    // Encuentra el primer logro pendiente en la lista para mostrarlo como siguiente meta
    const nextAchievement = achievements.find(
        item => !item.unlocked
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <LinearGradient
                colors={["#06402B", "#065f46"]}
                style={[styles.headerContainer]}
            >
                <Text style={[styles.headerTitle, { color: "#ffffff" }]}>
                    Recompensas
                </Text>
                <Text style={[styles.headerSubtitle, { color: "#e4e4e4" }]}>
                    {unlockedAchievements} de {achievements.length} logros desbloqueados
                </Text>
            </LinearGradient>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Grafica general de progreso en formato de tarjeta */}
                <RewardProgressCard
                    progressPercentage={progressPercentage}
                />

                {/* Contenedor adaptativo en cuadricula para desplegar las tarjetas de logros */}
                <View style={styles.achievementsGrid}>
                    {achievements.map((item) => (
                        <AchievementCard
                            key={item.id}
                            item={item}
                            cardColor={theme.secondarySurface}
                            titleColor={theme.textPrimary}
                            descriptionColor={theme.textSecondary}
                        />
                    ))}
                </View>

                {/* Tarjeta inferior que destaca el proximo objetivo a desbloquear */}
                <NextAchievementCard
                    achievement={nextAchievement}
                    cardColor={theme.secondarySurface}
                    titleColor={theme.textPrimary}
                    descriptionColor={theme.textSecondary}
                />

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secBackground,
    },

    headerContainer: {
        paddingHorizontal: SPACING.lg,
        paddingTop: 60,
        paddingBottom: SPACING.lg,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        ...SHADOWS.medium
    },

    headerTitle: {
        ...TYPOGRAPHY.titleXL,
        color: COLORS.textPrimary,
    },

    headerSubtitle: {
        fontSize: 13,
        color: COLORS.textSecondary,
        fontWeight: "500",
        marginTop: 2,
    },

    scrollContent: {
        paddingHorizontal: SPACING.lg,
        paddingTop: 10,
    },

    achievementsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 16,
    },
});