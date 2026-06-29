import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const formatLocation = (location) => {
    if (!location) return "";

    const parts = [
        location.street && location.number
            ? `${location.street} ${location.number}`
            : location.street,
        location.district,
        location.city,
        location.region,
        location.country,
    ].filter(Boolean);

    if (parts.length > 0) {
        return parts.join(", ");
    }

    return `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
};

export default function ProfileLocationButton({
    location,
    onGetLocation,
}) {
    return (
        <>
            <TouchableOpacity
                style={styles.locationButton}
                onPress={onGetLocation}
                activeOpacity={0.8}
            >
                <Ionicons
                    name="location-outline"
                    size={18}
                    color="#ffffff"
                />

                <Text style={styles.locationButtonText}>
                    Guardar ubicación actual
                </Text>
            </TouchableOpacity>

            {location ? (
                <View style={styles.locationInfo}>
                    <Ionicons
                        name="navigate-outline"
                        size={18}
                        color="#0f766e"
                    />

                    <Text style={styles.locationInfoText}>
                        {formatLocation(location)}
                    </Text>
                </View>
            ) : null}
        </>
    );
}

const styles = StyleSheet.create({
    locationButton: {
        backgroundColor: "#0f766e",
        borderRadius: 18,
        paddingVertical: 14,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        marginBottom: 14,
    },

    locationButtonText: {
        fontSize: 14,
        fontWeight: "800",
        color: "#ffffff",
    },

    locationInfo: {
        backgroundColor: "#ecfdf5",
        borderRadius: 16,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 16,
    },

    locationInfoText: {
        flex: 1,
        color: "#0f766e",
        fontSize: 13,
        fontWeight: "700",
        lineHeight: 18,
    },
});