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

import { useHabits } from "../../context/HabitContext";

import COLORS from "../../styles/colors";
import SPACING from "../../styles/spacing";
import SHADOWS from "../../styles/shadows";
import TYPOGRAPHY from "../../styles/typography";

const getAchievements = ({
    totalCompletedHistory,
    bestStreak,
    level,
    xp,
    habits,
}) => [
    {
        id: "1",
        title: "Primer Paso",
        description: "Completar tu primer hábito",
        icon: "star",
        badgeBg: ["#eab308", "#facc15"],
        unlocked: totalCompletedHistory >= 1,
        progress: totalCompletedHistory,
        goal: 1,
    },
    {
        id: "2",
        title: "Racha de Fuego",
        description: "Alcanzar una racha de 7 días",
        icon: "flame",
        badgeBg: ["#ea580c", "#f97316"],
        unlocked: bestStreak >= 7,
        progress: bestStreak,
        goal: 7,
    },
    {
        id: "3",
        title: "Constancia Total",
        description: "Tener 5 hábitos activos",
        icon: "list",
        badgeBg: ["#06b6d4", "#3b82f6"],
        unlocked: habits.length >= 5,
        progress: habits.length,
        goal: 5,
    },
    {
        id: "4",
        title: "Maestro",
        description: "Alcanzar el nivel 5",
        icon: "ribbon",
        badgeBg: ["#a855f7", "#ec4899"],
        unlocked: level >= 5,
        progress: level,
        goal: 5,
    },
    {
        id: "5",
        title: "Campeón",
        description: "Llegar a una racha de 30 días",
        icon: "trophy",
        badgeBg: ["#f59e0b", "#fbbf24"],
        unlocked: bestStreak >= 30,
        progress: bestStreak,
        goal: 30,
    },
    {
        id: "6",
        title: "Objetivo Cumplido",
        description: "Acumular 1000 XP",
        icon: "medal",
        badgeBg: ["#10b981", "#22c55e"],
        unlocked: xp >= 1000,
        progress: xp,
        goal: 1000,
    },
];

export default function RewardsScreen() {
    const {
        bestStreak,
        level,
        xp,
        habits,
    } = useHabits();

    const totalCompletedHistory = useMemo(() => {
        return habits.reduce((total, habit) => {
            return total + (habit.totalCompletions || 0);
        }, 0);
    }, [habits]);

    const achievements = useMemo(() => {
        return getAchievements({
            totalCompletedHistory,
            bestStreak,
            level,
            xp,
            habits,
        });
    }, [
        totalCompletedHistory,
        bestStreak,
        level,
        xp,
        habits,
    ]);

    const unlockedAchievements = achievements.filter(
        item => item.unlocked
    ).length;

    const progressPercentage = Math.round(
        (unlockedAchievements / achievements.length) * 100
    );

    const nextAchievement = achievements.find(
        item => !item.unlocked
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>
                    Recompensas
                </Text>

                <Text style={styles.headerSubtitle}>
                    {unlockedAchievements} de {achievements.length} logros desbloqueados
                </Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <RewardProgressCard
                    progressPercentage={progressPercentage}
                />

                <View style={styles.achievementsGrid}>
                    {achievements.map((item) => (
                        <AchievementCard
                            key={item.id}
                            item={item}
                        />
                    ))}
                </View>

                <NextAchievementCard
                    achievement={nextAchievement}
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
        backgroundColor: COLORS.background,
        ...SHADOWS.medium
    },

    headerTitle: {
        ...TYPOGRAPHY.titleXL,
        color: COLORS.textPrimary,
    },

    headerSubtitle: {
        fontSize: 14,
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