import React, { useState } from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import CustomAlert from "../../components/CustomAlert";
import MainButton from "../../components/MainButton";

import AuthContainer from "../../components/auth/AuthContainer";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthInput from "../../components/auth/AuthInput";
import AuthFooterLink from "../../components/auth/AuthFooterLink";

import InfoBox from "../../components/common/InfoBox";

import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../context/SettingsContext";

import COLORS from "../../styles/colors";
import SPACING from "../../styles/spacing";
import TYPOGRAPHY from "../../styles/typography";

export default function RegisterScreen({ navigation }) {

    const { theme } = useSettings();

    // Extrae la funcion de registro del contexto global de autenticacion
    const { register } = useAuth();

    // Estados para almacenar los valores de los campos del formulario
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Estados para gestionar de forma independiente los errores de cada input
    const [errorName, setErrorName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

    // Estado para controlar la animacion de carga en el boton de envio
    const [loading, setLoading] = useState(false);

    // Estado para controlar la visibilidad de la alerta de exito
    const [alertVisible, setAlertVisible] = useState(false);

    // Evalua que la cadena cumpla con el formato de correo estandar
    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };

    // Evalua el requisito de longitud minima para la contraseña
    const validatePassword = (value) => {
        return value.length >= 8;
    };

    // Valida exhaustivamente cada campo antes de procesar el registro
    const handleRegisterAction = async () => {
        let isValid = true;

        // Validacion del campo nombre
        if (!name.trim()) {
            setErrorName("El nombre es obligatorio.");
            isValid = false;
        } else if (name.trim().length < 3) {
            setErrorName("El nombre debe tener mínimo 3 caracteres.");
            isValid = false;
        } else {
            setErrorName("");
        }

        // Validacion del campo correo
        if (!email.trim()) {
            setErrorEmail("El correo electrónico es obligatorio.");
            isValid = false;
        } else if (!validateEmail(email.trim())) {
            setErrorEmail("Ingresa un correo válido.");
            isValid = false;
        } else {
            setErrorEmail("");
        }

        // Validacion del campo contraseña
        if (!password.trim()) {
            setErrorPassword(
                "La contraseña es obligatoria."
            );
            isValid = false;
        } else if (!validatePassword(password)) {
            setErrorPassword(
                "La contraseña debe tener mínimo 8 caracteres."
            );
            isValid = false;
        } else {
            setErrorPassword("");
        }

        // Validacion de la confirmación de contraseña
        if (!confirmPassword.trim()) {
            setErrorConfirmPassword(
                "Debes confirmar la contraseña."
            );
            isValid = false;
        } else if (password !== confirmPassword) {
            setErrorConfirmPassword(
                "Las contraseñas no coinciden."
            );
            isValid = false;
        } else {
            setErrorConfirmPassword("");
        }

        // Detiene el proceso si al menos una regla de validacion fallo
        if (!isValid) return;

        setLoading(true);

        // Envia los datos limpios al servicio de registro
        const result = await register({
            name: name.trim(),
            email: email.trim(),
            password,
        });

        setLoading(false);

        // Muestra la alerta de exito si el servidor aprobo el registro
        if (result.success) {
            setAlertVisible(true);
        }
    };

    // Oculta la alerta y redirige al usuario a la pantalla de login
    const handleCloseAlert = () => {
        setAlertVisible(false);
        navigation.navigate("Login");
    };

    return (
        <>
            <AuthContainer>

                <AuthHeader
                    icon="person-add-outline"
                    title="Crear cuenta"
                    subtitle="Únete a HabitQuest y empieza a construir mejores hábitos"
                />

                {/* Inputs con limpieza de mensajes de error reactiva al escribir */}
                <AuthInput
                    label="Nombre completo"
                    icon="person-outline"
                    placeholder="Juan Pablo"
                    value={name}
                    onChangeText={(text) => {
                        setName(text);
                        setErrorName("");
                    }}
                    error={errorName}
                />

                <AuthInput
                    label="Correo electrónico"
                    icon="mail-outline"
                    placeholder="ejemplo@gmail.com"
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(text) => {
                        setEmail(text);
                        setErrorEmail("");
                    }}
                    error={errorEmail}
                />

                <AuthInput
                    label="Contraseña"
                    icon="lock-closed-outline"
                    placeholder="Mínimo 8 caracteres"
                    value={password}
                    secureTextEntry={!showPassword}
                    onChangeText={(text) => {
                        setPassword(text);
                        setErrorPassword("");
                    }}
                    error={errorPassword}
                    rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
                    onRightIconPress={() => setShowPassword(!showPassword)}
                />

                <AuthInput
                    label="Confirmar contraseña"
                    icon="shield-checkmark-outline"
                    placeholder="Repite tu contraseña"
                    value={confirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    onChangeText={(text) => {
                        setConfirmPassword(text);
                        setErrorConfirmPassword("");
                    }}
                    error={errorConfirmPassword}
                    rightIcon={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                    onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />

                <InfoBox
                    text="Crea tu cuenta para comenzar a organizar hábitos, completar desafíos y seguir tu progreso diario."
                />

                <MainButton
                    title="Registrarse"
                    onPress={handleRegisterAction}
                    loading={loading}
                />

                <AuthFooterLink
                    text="¿Ya tienes cuenta?"
                    linkText="Inicia sesión"
                    onPress={() =>
                        navigation.navigate("Login")
                    }
                />

            </AuthContainer>

            <CustomAlert
                visible={alertVisible}
                title="Cuenta creada"
                message="Tu cuenta fue registrada correctamente. Ahora puedes iniciar sesión."
                type="success"
                onClose={handleCloseAlert}
                containerColor={theme.surface}
                titleColor={theme.textPrimary}
                messageColor={theme.textSecondary}
            />
        </>
    );
}

const styles = StyleSheet.create({
    footerText: {
        color: COLORS.textSecondary,
        fontSize: TYPOGRAPHY.bodyMD.fontSize,
        marginRight: 5,
    },

    footerLink: {
        color: COLORS.primary,
        fontSize: TYPOGRAPHY.bodyMD.fontSize,
        fontWeight: "800",
    },
});