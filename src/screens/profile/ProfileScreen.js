import React, { useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from "react-native";

import CustomAlert from "../../components/CustomAlert";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStatCard from "../../components/profile/ProfileStatCard";
import SettingItem from "../../components/profile/SettingItem";

import { useHabits } from "../../context/HabitContext";
import { useAuth } from "../../context/AuthContext";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";
import SPACING from "../../styles/spacing";

export default function ProfileScreen({ navigation }) {

    const {
        xp,
        level,
        completedHabits,
        bestStreak,
        habits,
    } = useHabits();

    const {
        user,
        logout,
    } = useAuth();

    const [logoutAlertVisible, setLogoutAlertVisible] = useState(false);

    const userName = user?.name || "Usuario";
    const userEmail = user?.email || "correo@demo.com";
    const userInitial = userName.charAt(0).toUpperCase();

    const handleLogout = () => {
        setLogoutAlertVisible(true);
    };

    const confirmLogout = async () => {
        await logout();

        setLogoutAlertVisible(false);

        navigation.replace("Auth");
    };

    return (
        <>
            <ScrollView
                style={styles.container}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <ProfileHeader
                    userName={userName}
                    userEmail={userEmail}
                    userInitial={userInitial}
                    level={level}
                />

                <View style={styles.contentContainer}>
                    <View style={styles.statsRow}>
                        <ProfileStatCard
                            icon="trophy-outline"
                            iconColor="#3b82f6"
                            backgroundColor="#eff6ff"
                            value={xp}
                            label="XP Total"
                        />

                        <ProfileStatCard
                            icon="checkmark-circle-outline"
                            iconColor="#22c55e"
                            backgroundColor="#f0fdf4"
                            value={completedHabits}
                            label="Completados"
                        />

                        <ProfileStatCard
                            icon="star-outline"
                            iconColor="#a855f7"
                            backgroundColor="#faf5ff"
                            value={level}
                            label="Nivel"
                        />
                    </View>

                    <View style={styles.statsRow}>
                        <ProfileStatCard
                            icon="flame-outline"
                            iconColor="#f97316"
                            backgroundColor="#fff7ed"
                            value={bestStreak}
                            label="Mejor Racha"
                        />

                        <ProfileStatCard
                            icon="list-outline"
                            iconColor="#06b6d4"
                            backgroundColor="#ecfeff"
                            value={habits.length}
                            label="Hábitos"
                        />
                    </View>

                    <Text style={styles.sectionTitle}>
                        Cuenta
                    </Text>

                    <View style={styles.menuGroup}>
                        <SettingItem
                            icon="person-outline"
                            label="Editar perfil"
                            onPress={() =>
                                navigation.navigate("Editar")
                            }
                        />

                        <SettingItem
                            icon="settings-outline"
                            label="Configuración"
                            onPress={() => {
                                navigation.navigate("Configuración");
                            }}
                        />

                        <SettingItem
                            icon="log-out-outline"
                            label="Cerrar sesión"
                            isDestructive
                            last
                            onPress={handleLogout}
                        />
                    </View>

                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>

            <CustomAlert
                visible={logoutAlertVisible}
                title="Cerrar sesión"
                message="¿Deseas cerrar tu sesión actual?"
                type="warning"
                confirmMode
                confirmText="Salir"
                cancelText="Cancelar"
                onClose={() => setLogoutAlertVisible(false)}
                onConfirm={confirmLogout}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secBackground,
    },

    contentContainer: {
        paddingHorizontal: SPACING.lg,
        marginTop: -30,
    },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
        gap: 10,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 5,
    },

    menuGroup: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        paddingHorizontal: 15,
        ...SHADOWS.small,
    },
});