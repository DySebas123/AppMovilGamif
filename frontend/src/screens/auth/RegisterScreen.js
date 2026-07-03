import React, { useState } from "react";

import CustomAlert from "../../components/CustomAlert";
import MainButton from "../../components/MainButton";

import AuthContainer from "../../components/auth/AuthContainer";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthInput from "../../components/auth/AuthInput";
import AuthFooterLink from "../../components/auth/AuthFooterLink";

import InfoBox from "../../components/common/InfoBox";

import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../context/SettingsContext";

export default function RegisterScreen({ navigation }) {
    const { theme } = useSettings();
    const { register } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errorName, setErrorName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [goLoginAfterAlert, setGoLoginAfterAlert] = useState(false);

    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };

    const showAlert = (type, title, message, goLogin = false) => {
        setAlertType(type);
        setAlertTitle(title);
        setAlertMessage(message);
        setGoLoginAfterAlert(goLogin);
        setAlertVisible(true);
    };

    const handleRegisterAction = async () => {
        let isValid = true;

        if (!name.trim()) {
            setErrorName("El nombre es obligatorio.");
            isValid = false;
        } else if (name.trim().length < 3) {
            setErrorName("El nombre debe tener mínimo 3 caracteres.");
            isValid = false;
        } else {
            setErrorName("");
        }

        if (!email.trim()) {
            setErrorEmail("El correo electrónico es obligatorio.");
            isValid = false;
        } else if (!validateEmail(email.trim())) {
            setErrorEmail("Ingresa un correo válido.");
            isValid = false;
        } else {
            setErrorEmail("");
        }

        if (!password.trim()) {
            setErrorPassword("La contraseña es obligatoria.");
            isValid = false;
        } else if (password.length < 8) {
            setErrorPassword("La contraseña debe tener mínimo 8 caracteres.");
            isValid = false;
        } else {
            setErrorPassword("");
        }

        if (!confirmPassword.trim()) {
            setErrorConfirmPassword("Debes confirmar la contraseña.");
            isValid = false;
        } else if (password !== confirmPassword) {
            setErrorConfirmPassword("Las contraseñas no coinciden.");
            isValid = false;
        } else {
            setErrorConfirmPassword("");
        }

        if (!isValid) return;

        setLoading(true);

        const result = await register({
            name: name.trim(),
            email: email.trim(),
            password,
        });

        setLoading(false);

        if (result.success) {
            showAlert(
                "success",
                "Cuenta creada",
                result.message,
                true
            );
        } else {
            showAlert(
                "error",
                "Error de registro",
                result.message
            );
        }
    };

    const handleCloseAlert = () => {
        setAlertVisible(false);

        if (goLoginAfterAlert) {
            navigation.navigate("Login");
        }
    };

    return (
        <>
            <AuthContainer>
                <AuthHeader
                    icon="person-add-outline"
                    title="Crear cuenta"
                    subtitle="Únete a HabitQuest y empieza a construir mejores hábitos"
                />

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
                    onPress={() => navigation.navigate("Login")}
                />
            </AuthContainer>

            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                type={alertType}
                onClose={handleCloseAlert}
                containerColor={theme.surface}
                titleColor={theme.textPrimary}
                messageColor={theme.textSecondary}
            />
        </>
    );
}