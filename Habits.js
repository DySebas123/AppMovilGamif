import React, {useState} from "react";
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from "react-native";

const HabitItem = ({ title, type, streak, completed, onPress }) => (
    <TouchableOpacity
        style={[styles.habitCard, completed && styles.habitCardCompleted]}
        onPress={onPress}
        activeOpacity={0.7}
    >
        <View style={styles.habitRow}>
            <Ionicons
                name={completed ? "checkmark-circle" : "ellipse-outline"}
                size={28}
                color={completed ? "#4ade80" : "#d1d5db"}
            />
        </View>
        <View style={styles.habitInfo}>
            <Text style={[styles.habitTitle, completed && styles.textStrikethrough]}>{title}</Text>
            <Text style={styles.habitType}>{type}</Text>
        </View>
        <View style={styles.streakBadge}>
            <Text style={styles.streakText}>{streak}</Text>
        </View>
    </TouchableOpacity>
);

export default function Habits() {

    const [listHabt, setListHabt] = useState([
        { id: 1, title: "Estudiar Matemáticas", type: "Diario", streak: "9", completed: true},
        { id: 2, title: "Correr", type: "Diario", streak: "11", completed: false},
        { id: 3, title: "Meditar en Parque", type: "Diario", streak: "3", completed: true},
    ]);

    const toggleHabit = (id) => {
        const newList = listHabt.map(hab => {
            if (hab.id === id) {
                return { ...hab, completed: !hab.completed};
            }
            return hab;
        });
        setListHabt(newList);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerRow}>
                <View>
                    <Text style={styles.header}>Mis Hábitos</Text>
                    <Text style={styles.descr}>Se una mejor versión de ti</Text>
                </View>
                <View style={styles.profileCircle}>
                    <Text style={styles.profileText}>3</Text>
                </View>
            </View>

            <View style={styles.statsRow}>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>Puntos</Text>
                    <Text style={styles.statValue}>150</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>Racha</Text>
                    <Text style={styles.statValue}>3 días</Text>
                </View>
            </View>

            <View style={styles.banner}>
                <Text style={styles.bannerText}>🔥 Un día a la vez, un logro a la vez 🔥</Text>
            </View>

            {listHabt.map((hab) => (
                <HabitItem
                    key={hab.id}
                    title={hab.title}
                    type={hab.type}
                    streak={hab.streak}
                    completed={hab.completed}
                    onPress={() => toggleHabit(hab.id)}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
        paddingHorizontal: 20,
        paddingTop: 50
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    header: {
        fontSize: 26,
        fontWeight: '800',
        color: '#0f172a'
    },
    descr: {
        fontSize: 14,
        color: '#64748b'
    },
    profileCircle: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#00bcd4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileText: { color: '#fff', fontWeight: 'bold',},

    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statCard: {
        backgroundColor: '#fff',
        width: '48%',
        padding: 15,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.05,
        shadowRadius: 10
    },
    statLabel: { color: '#64748b', fontSize: 12},
    statValue: { color: '#1e293b', fontSize: 25, fontWeight: 'bold'},

    banner: {
        backgroundGradient: 'linear-gradient',
        backgroundColor: '#10b981',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 30,
    },

    bannerText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: "#1e293b"
    },

    habitCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    habitCardCompleted: {
        borderColor: '#4ade80',
        backgroundColor: '#f0fdf4',
    },
    habitRow: { flexDirection: 'row', alignItems: 'center'},
    habitInfo: { flex: 1, marginLeft: 12 },
    habitTitle: { fontSize: 16, fontWeight: '600', color: '#334155' },
    habitType: { fontSize: 12, color: '#94a3b8'},
    textStrikethrough: {textDecorationLine: 'line-through', color: '#94e3b8'},

    streakBadge: {
        backgroundColor: "#fff7ed",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    streakText: { color: '#f97316', fontSize: 12, fontWeight: 'bold'},
})
