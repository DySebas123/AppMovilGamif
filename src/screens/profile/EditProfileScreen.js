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
import { useSettings } from "../../context/SettingsContext";

import COLORS from "../../styles/colors";
import SHADOWS from "../../styles/shadows";
import SPACING from "../../styles/spacing";
import TYPOGRAPHY from "../../styles/typography";

export default function EditProfileScreen({ navigation }) {

    // Extrae los datos del usuario actual y el metodo para actualizar su informacion del contexto global
    const { user, updateUser } = useAuth();

    // Estados inicializados con la informacion existente del usuario o valores vacios por seguridad
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");

    // Estados individuales para capturar y desplegar errores de validacion en los inputs
    const [errorName, setErrorName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");

    // Estado para controlar la visibilidad de la alerta de confirmacion
    const [alertVisible, setAlertVisible] = useState(false);

    // Evalua la estructura de la cadena para confirmar un formato de correo electronico valido
    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };

    // Valida los campos modificados e invoca la persistencia de cambios en el contexto
    const handleSave = async () => {
        let valid = true;

        // Comprobacion del campo de nombre vacio
        if (!name.trim()) {
            setErrorName("El nombre es obligatorio.");
            valid = false;
        } else {
            setErrorName("");
        }

        // Comprobacion del campo de correo vacio y formato correcto
        if (!email.trim()) {
            setErrorEmail("El correo es obligatorio.");
            valid = false;
        } else if (!validateEmail(email.trim())) {
            setErrorEmail("Ingresa un correo válido.");
            valid = false;
        } else {
            setErrorEmail("");
        }

        // Interrumpe la ejecucion si alguna validacion previa no fue exitosa
        if (!valid) return;

        // Combina el estado actual del usuario con los datos limpios y modificados del formulario
        await updateUser({
            ...user,
            name: name.trim(),
            email: email.trim().toLowerCase(),
        });

        setAlertVisible(true);
    };

    // Obtiene de forma segura la inicial del nombre para el contenedor del avatar
    const userInitial =
        name?.charAt(0)?.toUpperCase() || "U";

    const { theme } = useSettings();

    return (
        <>
            <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
                <ScrollView
                    style={[styles.container, { backgroundColor: theme.background }]}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Encabezado del perfil con retorno implicito a la pestaña de Perfil del Tab */}
                    <EditProfileHeader
                        name={name}
                        email={email}
                        userInitial={userInitial}
                        onBack={() => navigation.navigate("Perfil")}
                    />
                    <View style={[styles.content]}>
                        <Card style={styles.card}>
                            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                                Información personal
                            </Text>

                            {/* Campo de texto para el nombre con borrado de error inmediato al escribir */}
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
                                labelColor={theme.textPrimary}
                                inputColor={theme.surface}
                                valueColor={theme.textSecondary}
                            />

                            {/* Campo de texto para el correo con borrado de error inmediato al escribir */}
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
                                labelColor={theme.textPrimary}
                                inputColor={theme.surface}
                                valueColor={theme.textSecondary}
                            />

                            <View style={styles.buttonContainer}>
                                <MainButton
                                    title="Guardar cambios"
                                    onPress={handleSave}
                                />
                            </View>
                        </Card>

                        {/* Bloque informativo secundario sobre seguridad de la cuenta */}
                        <View style={[styles.infoCard, { backgroundColor: theme.surface }]}>
                            <View style={styles.infoIcon}>
                                <Ionicons
                                    name="shield-checkmark-outline"
                                    size={22}
                                    color="#0f766e"
                                />
                            </View>

                            <View style={[{ flex: 1 }]}>
                                <Text style={[styles.infoTitle, { color: theme.textPrimary }]}>
                                    Perfil seguro
                                </Text>

                                <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                                    Mantén tu información actualizada para una mejor experiencia dentro de la aplicación.
                                </Text>
                            </View>
                        </View>

                        <View style={{ height: 100 }} />
                    </View>
                </ScrollView>
            </SafeAreaView>

            {/* Alerta de confirmacion que cierra el modal y redirige a la pantalla previa */}
            <CustomAlert
                visible={alertVisible}
                title="Perfil actualizado"
                message="Tus datos fueron guardados correctamente."
                type="success"
                onClose={() => {
                    setAlertVisible(false);
                    navigation.goBack();
                }}
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