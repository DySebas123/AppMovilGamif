import React, { useMemo } from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from "react-native";

import Card from "../../components/common/Card";
import StatsSummaryCard from "../../components/stats/StatsSummaryCard";
import WeeklyActivityChart from "../../components/stats/WeeklyActivityChart";
import StreakCalendar from "../../components/stats/StreakCalendar";

import { useHabits } from "../../context/HabitContext";

import COLORS from "../../styles/colors";
import SPACING from "../../styles/spacing";
import TYPOGRAPHY from "../../styles/typography";
import SHADOWS from "../../styles/shadows";

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const getLastDaysFromDate = (baseDateString, amount) => {
    const baseDate = new Date(`${baseDateString}T00:00:00`);

    return Array.from({ length: amount }).map((_, index) => {
        const date = new Date(baseDate);
        date.setDate(baseDate.getDate() - (amount - 1 - index));

        return formatDate(date);
    });
};

const getDayLabel = (dateString) => {
    const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const date = new Date(`${dateString}T00:00:00`);

    return days[date.getDay()];
};

export default function StatsScreen() {
    const {
        habits,
        completedHabits,
        totalHabits,
        bestStreak,
        xp,
        level,
        progressPercentage,
        currentDate,
    } = useHabits();

    const pendingHabits = totalHabits - completedHabits;

    const weeklyData = useMemo(() => {
        const last7Days = getLastDaysFromDate(currentDate, 7);

        return last7Days.map((date) => {
            const completed = habits.filter((habit) => {
                return habit.history && habit.history[date];
            }).length;

            return {
                date,
                day: getDayLabel(date),
                completed,
                total: totalHabits || 1,
            };
        });
    }, [habits, totalHabits, currentDate]);

    const calendarData = useMemo(() => {
        const last28Days = getLastDaysFromDate(currentDate, 28);

        return last28Days.map((date) => {
            const completed = habits.some((habit) => {
                return habit.history && habit.history[date];
            });

            return {
                date,
                completed,
            };
        });
    }, [habits, currentDate]);

    const totalCompletedHistory = useMemo(() => {
        return habits.reduce((total, habit) => {
            return total + (habit.totalCompletions || 0);
        }, 0);
    }, [habits]);

    const successRate = useMemo(() => {
        if (totalHabits === 0) return 0;

        return Math.round((completedHabits / totalHabits) * 100);
    }, [completedHabits, totalHabits]);

    const stats = [
        {
            label: "Completados Totales",
            value: `${totalCompletedHistory}`,
            icon: "checkmark-circle-outline",
            colors: ["#22c55e", "#10b981"],
        },
        {
            label: "Puntos Acumulados",
            value: `${xp}`,
            icon: "trending-up-outline",
            colors: ["#2563eb", "#4f46e5"],
        },
        {
            label: "Mejor Racha",
            value: `${bestStreak} días`,
            icon: "flame-outline",
            colors: ["#f97316", "#ef4444"],
        },
        {
            label: "Tasa Actual",
            value: `${successRate}%`,
            icon: "analytics-outline",
            colors: ["#9333ea", "#ec4899"],
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Estadísticas
                </Text>

                <Text style={styles.headerSubtitle}>
                    Tu progreso y rendimiento en HabitQuest
                </Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <WeeklyActivityChart
                    data={weeklyData}
                    level={level}
                />

                <View style={styles.statsGrid}>
                    {stats.map((stat) => (
                        <StatsSummaryCard
                            key={stat.label}
                            label={stat.label}
                            value={stat.value}
                            icon={stat.icon}
                            colors={stat.colors}
                        />
                    ))}
                </View>

                <Card style={styles.summaryCard}>
                    <Text style={styles.cardTitle}>
                        Resumen General
                    </Text>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Hábitos activos
                        </Text>

                        <Text style={styles.summaryValue}>
                            {totalHabits}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Hábitos pendientes hoy
                        </Text>

                        <Text style={styles.summaryValue}>
                            {pendingHabits}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            XP para siguiente nivel
                        </Text>

                        <Text style={styles.summaryValue}>
                            {progressPercentage}/100
                        </Text>
                    </View>
                </Card>

                <StreakCalendar data={calendarData} />

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

    header: {
        backgroundColor: COLORS.white,
        paddingHorizontal: SPACING.lg,
        paddingTop: 60,
        paddingBottom: SPACING.lg,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        ...SHADOWS.small,
    },

    headerTitle: {
        ...TYPOGRAPHY.titleXL,
        color: COLORS.textPrimary,
    },

    headerSubtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 4,
    },

    content: {
        paddingHorizontal: SPACING.lg,
        paddingTop: 22,
    },

    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 14,
        marginBottom: 20,
    },

    summaryCard: {
        marginBottom: 20,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.textPrimary,
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
    },

    summaryLabel: {
        fontSize: 15,
        color: COLORS.textSecondary,
        fontWeight: "600",
    },

    summaryValue: {
        fontSize: 16,
        color: COLORS.textPrimary,
        fontWeight: "800",
    },

    divider: {
        height: 1,
        backgroundColor: "#f1f5f9",
    },
});