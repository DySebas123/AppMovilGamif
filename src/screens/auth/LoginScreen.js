import React, { useState } from "react";

import CustomAlert from "../../components/CustomAlert";
import MainButton from "../../components/MainButton";

import AuthContainer from "../../components/auth/AuthContainer";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthInput from "../../components/auth/AuthInput";
import AuthFooterLink from "../../components/auth/AuthFooterLink";

import InfoBox from "../../components/common/InfoBox";

import { useAuth } from "../../context/AuthContext";

export default function LoginScreen({ navigation }) {

    // Extrae la funcion de inicio de sesion del contexto global
    const { login } = useAuth();

    // Estados para almacenar los datos ingresados en el formulario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Estados para almacenar los mensajes de error de validacion
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    // Estado para controlar el indicador de carga del boton
    const [loading, setLoading] = useState(false);

    // Estados para configurar y mostrar la alerta personalizada
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [goHomeAfterAlert, setGoHomeAfterAlert] = useState(false);

    // Valida la estructura estandar de un correo electronico
    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };

    // Configura y activa la visibilidad de la alerta
    const showAlert = (
        type,
        title,
        message,
        goHome = false
    ) => {

        setAlertType(type);
        setAlertTitle(title);
        setAlertMessage(message);
        setGoHomeAfterAlert(goHome);
        setAlertVisible(true);
    };

    // Maneja la validacion del formulario y el envio de datos al servidor
    const handleLogin = async () => {

        let isValid = true;

        // Validacion del campo de correo electronico
        if (!email.trim()) {
            setErrorEmail("El correo electrónico es obligatorio.");
            isValid = false;
        } else if (!validateEmail(email.trim())) {
            setErrorEmail("Ingresa un correo válido.");
            isValid = false;
        } else {
            setErrorEmail("");
        }

        // Validacion del campo de contraseña
        if (!password.trim()) {
            setErrorPassword("La contraseña es obligatoria.");
            isValid = false;
        } else if (password.length < 8) {
            setErrorPassword("La contraseña debe tener mínimo 8 caracteres.");
            isValid = false;
        } else {
            setErrorPassword("");
        }

        // Frena la ejecucion si hay errores de validacion
        if (!isValid) return;

        setLoading(true);

        // Intenta iniciar sesion con las credenciales proporcionadas
        const result = await login({
            email: email.trim(),
            password,
        });

        setLoading(false);

        // Muestra alerta de exito o error segun la respuesta del servicio
        if (result.success) {
            showAlert("success", "Bienvenido", result.message, true);
        } else {
            showAlert("error", "Error de inicio", result.message);
        }
    };

    // Cierra la alerta y ejecuta la redireccion si corresponde
    const handleCloseAlert = () => {
        setAlertVisible(false);
        if (goHomeAfterAlert) {
            navigation.navigate("HomeTabs");
        }
    };

    return (
        <>
            <AuthContainer>
                <AuthHeader
                    title="Bienvenido de vuelta"
                    subtitle="Continúa tu progreso en HabitQuest"
                />
                {/* Inputs con limpieza automatica de error al escribir */}
                <AuthInput
                    label="Correo electrónico"
                    icon="mail-outline"
                    placeholder="ejemplo@gmail.com"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        setErrorEmail("");
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errorEmail}
                />
                <AuthInput
                    label="Contraseña"
                    icon="lock-closed-outline"
                    placeholder="********"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        setErrorPassword("");
                    }}
                    secureTextEntry
                    error={errorPassword}
                />
                <InfoBox
                    text="Usa el correo y contraseña que registraste previamente."
                />
                <MainButton
                    title="Iniciar sesión"
                    onPress={handleLogin}
                    loading={loading}
                />
                <AuthFooterLink
                    text="¿No tienes cuenta?"
                    linkText="Regístrate"
                    onPress={() =>
                        navigation.navigate("Register")
                    }
                />
            </AuthContainer>
            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                type={alertType}
                onClose={handleCloseAlert}
            />
        </>
    );
}