import React, { useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import MainButton from "../../components/MainButton";
import CustomAlert from "../../components/CustomAlert";

import Card from "../../components/common/Card";
import EditProfileHeader from "../../components/profile/EditProfileHeader";
import ProfileInput from "../../components/profile/ProfileInput";

import { useAuth } from "../../context/AuthContext";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";
import SPACING from "../../styles/spacing";
import TYPOGRAPHY from "../../styles/typography";

export default function EditProfileScreen({ navigation }) {

    const { user, updateUser } = useAuth();

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");

    const [errorName, setErrorName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");

    const [alertVisible, setAlertVisible] = useState(false);

    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };

    const handleSave = async () => {
        let valid = true;

        if (!name.trim()) {
            setErrorName("El nombre es obligatorio.");
            valid = false;
        } else {
            setErrorName("");
        }

        if (!email.trim()) {
            setErrorEmail("El correo es obligatorio.");
            valid = false;
        } else if (!validateEmail(email.trim())) {
            setErrorEmail("Ingresa un correo válido.");
            valid = false;
        } else {
            setErrorEmail("");
        }

        if (!valid) return;

        await updateUser({
            ...user,
            name: name.trim(),
            email: email.trim().toLowerCase(),
        });

        setAlertVisible(true);
    };

    const userInitial =
        name?.charAt(0)?.toUpperCase() || "U";

    return (
        <>
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <EditProfileHeader
                        name={name}
                        email={email}
                        userInitial={userInitial}
                        onBack={() => navigation.navigate("Perfil")}
                    />

                    <View style={styles.content}>
                        <Card style={styles.card}>
                            <Text style={styles.sectionTitle}>
                                Información personal
                            </Text>

                            <ProfileInput
                                label="Nombre completo"
                                icon="person-outline"
                                value={name}
                                placeholder="Tu nombre"
                                error={errorName}
                                onChangeText={(text) => {
                                    setName(text);
                                    setErrorName("");
                                }}
                            />

                            <ProfileInput
                                label="Correo electrónico"
                                icon="mail-outline"
                                value={email}
                                placeholder="correo@gmail.com"
                                error={errorEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setErrorEmail("");
                                }}
                            />

                            <View style={styles.buttonContainer}>
                                <MainButton
                                    title="Guardar cambios"
                                    onPress={handleSave}
                                />
                            </View>
                        </Card>

                        <View style={styles.infoCard}>
                            <View style={styles.infoIcon}>
                                <Ionicons
                                    name="shield-checkmark-outline"
                                    size={22}
                                    color="#0f766e"
                                />
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.infoTitle}>
                                    Perfil seguro
                                </Text>

                                <Text style={styles.infoText}>
                                    Mantén tu información actualizada para una mejor experiencia dentro de la aplicación.
                                </Text>
                            </View>
                        </View>

                        <View style={{ height: 100 }} />
                    </View>
                </ScrollView>
            </SafeAreaView>

            <CustomAlert
                visible={alertVisible}
                title="Perfil actualizado"
                message="Tus datos fueron guardados correctamente."
                type="success"
                onClose={() => {
                    setAlertVisible(false);
                    navigation.goBack();
                }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f5f9",
    },

    content: {
        paddingHorizontal: SPACING.lg,
        marginTop: -25,
    },

    card: {
        padding: 22,
    },

    sectionTitle: {
        ...TYPOGRAPHY.titleMD,
        color: COLORS.textPrimary,
        marginBottom: 20,
    },

    buttonContainer: {
        marginTop: 28,
    },

    infoCard: {
        marginTop: 20,
        backgroundColor: COLORS.white,
        borderRadius: 22,
        padding: 18,
        flexDirection: "row",
        alignItems: "flex-start",
        ...SHADOWS.small,
    },

    infoIcon: {
        width: 45,
        height: 45,
        borderRadius: 22,
        backgroundColor: "#ecfdf5",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },

    infoTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.textPrimary,
        marginBottom: 4,
    },

    infoText: {
        fontSize: 13,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },
});