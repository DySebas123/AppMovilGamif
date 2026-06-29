import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import ProfileMenuItem from "./ProfileMenuItem";

const formatLocation = (location) => {
    if (!location) return "No registrada";

    const parts = [
        location.district,
        location.city,
        location.country,
    ].filter(Boolean);

    if (parts.length > 0) {
        return parts.join(", ");
    }

    return `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
};

export default function ProfileMenu({
    theme,
    userLocation,
    onEditProfile,
    onSettings,
    onLogout,
}) {
    return (
        <>
            <Text
                style={[
                    styles.sectionTitle,
                    { color: theme.textPrimary },
                ]}
            >
                Cuenta
            </Text>

            <View
                style={[
                    styles.menuGroup,
                    { backgroundColor: theme.surface },
                ]}
            >
                <ProfileMenuItem
                    icon="person-outline"
                    label="Editar perfil"
                    value="Foto, nombre, correo y ubicación"
                    onPress={onEditProfile}
                    theme={theme}
                />

                <ProfileMenuItem
                    icon="location-outline"
                    label="Ubicación"
                    value={formatLocation(userLocation)}
                    theme={theme}
                />

                <ProfileMenuItem
                    icon="settings-outline"
                    label="Configuración"
                    onPress={onSettings}
                    theme={theme}
                />

                <ProfileMenuItem
                    icon="log-out-outline"
                    label="Cerrar sesión"
                    isDestructive
                    last
                    onPress={onLogout}
                    theme={theme}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 5,
    },

    menuGroup: {
        borderRadius: 20,
        paddingHorizontal: 15,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
    },
});