import React, { useState } from "react";

import {
    View,
    StyleSheet,
    ScrollView,
} from "react-native";

import CustomAlert from "../../components/CustomAlert";

import ProfileHeader from "../../components/profile/main/ProfileHeader";
import ProfileStatsGrid from "../../components/profile/main/ProfileStatsGrid";
import ProfileMenu from "../../components/profile/main/ProfileMenu";

import { useHabits } from "../../context/HabitContext";
import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../context/SettingsContext";

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

    const { theme } = useSettings();

    const [logoutAlertVisible, setLogoutAlertVisible] = useState(false);

    const userName = user?.name || "Usuario";
    const userEmail = user?.email || "correo@demo.com";
    const userInitial = userName.charAt(0).toUpperCase();
    const profileImage = user?.profileImage || null;
    const userLocation = user?.location || null;

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
                style={[
                    styles.container,
                    { backgroundColor: theme.background },
                ]}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <ProfileHeader
                    userName={userName}
                    userEmail={userEmail}
                    userInitial={userInitial}
                    profileImage={profileImage}
                    level={level}
                />

                <View style={styles.contentContainer}>
                    <ProfileStatsGrid
                        xp={xp}
                        completedHabits={completedHabits}
                        level={level}
                        bestStreak={bestStreak}
                        totalHabits={habits.length}
                        theme={theme}
                    />

                    <ProfileMenu
                        theme={theme}
                        userLocation={userLocation}
                        onEditProfile={() => navigation.navigate("Editar")}
                        onSettings={() => navigation.navigate("Configuración")}
                        onLogout={handleLogout}
                    />

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

    contentContainer: {
        paddingHorizontal: 20,
        marginTop: -30,
    },
});