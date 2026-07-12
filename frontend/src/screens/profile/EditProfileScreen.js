import React, { useState } from "react";

import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Alert
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import CustomAlert from "../../components/CustomAlert";

import EditProfileHeader from "../../components/profile/edit/EditProfileHeader";
import ProfilePhotoActions from "../../components/profile/edit/ProfilePhotoActions";
import ProfileLocationButton from "../../components/profile/edit/ProfileLocationButton";
import EditProfileForm from "../../components/profile/edit/EditProfileForm";
import ProfileInfoCard from "../../components/profile/edit/ProfileInfoCard";

import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../context/SettingsContext";

export default function EditProfileScreen({ navigation }) {
    const {
        user,
        updateUser,
        updateProfileImage,
        updateUserLocation,
        deleteAccount,
    } = useAuth();

    const { theme } = useSettings();

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [profileImage, setProfileImage] = useState(user?.profileImage || null);
    const [location, setLocation] = useState(user?.location || null);

    const [errorName, setErrorName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("Perfil actualizado");
    const [alertMessage, setAlertMessage] = useState("Tus datos fueron guardados correctamente.");

    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [errorAlertTitle, setErrorAlertTitle] = useState("Error");
    const [errorAlertMessage, setErrorAlertMessage] = useState("");

    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };

    const showSuccessAlert = (title, message) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(true);
    };

    const showErrorAlert = (title, message) => {
        setErrorAlertTitle(title);
        setErrorAlertMessage(message);
        setErrorAlertVisible(true);
    };

    const handlePickImage = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            showErrorAlert(
                "Permiso requerido",
                "Debes permitir el acceso a la galería para seleccionar una foto."
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;

            const updateResult = await updateProfileImage(imageUri);

            if (updateResult.success && updateResult.profileImage) {
                setProfileImage(updateResult.profileImage);
            } else {
                showErrorAlert(
                    "Error al actualizar foto",
                    updateResult.message
                );
            }
        }
    };

    const handleTakePhoto = async () => {
        const permissionResult =
            await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted) {
            showErrorAlert(
                "Permiso requerido",
                "Debes permitir el acceso a la cámara para tomar una foto."
            );
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;

            const updateResult = await updateProfileImage(imageUri);

            if (updateResult.success && updateResult.profileImage) {
                setProfileImage(updateResult.profileImage);
            } else {
                showErrorAlert(
                    "Error al actualizar foto",
                    updateResult.message
                );
            }
        }
    };

    const handleGetLocation = async () => {
        const permissionResult =
            await Location.requestForegroundPermissionsAsync();

        if (!permissionResult.granted) {
            showErrorAlert(
                "Permiso requerido",
                "Debes permitir el acceso a la ubicación para guardar tu localización."
            );
            return;
        }

        const currentLocation =
            await Location.getCurrentPositionAsync({});

        const locationData = {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
        };

        setLocation(locationData);

        const result = await updateUserLocation(locationData);

        if (result.success) {
            showSuccessAlert(
                "Ubicación guardada",
                "Tu dirección fue guardada correctamente."
            );

            if (result.location) {
                setLocation(result.location);
            }
        } else {
            showErrorAlert(
                "Error de ubicación",
                result.message
            );
        }
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

        const result = await updateUser({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            profileImage,
            location,
        });

        if (result.success) {
            showSuccessAlert(
                "Perfil actualizado",
                "Tus datos fueron guardados correctamente."
            );
        } else {
            showErrorAlert(
                "Error al actualizar perfil",
                result.message
            );
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Eliminar cuenta",
            "Esta acción es permanente. Se borrarán todos tus hábitos, progresos y logros. ¿Estás seguro de continuar?",
            [
                { text: "Cancelar", style: "cancel"},
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async() => {
                        const result = await deleteAccount();
                        if(!result.success) {
                            showErrorAlert(
                                "Error al eliminar cuenta",
                                result.message
                            );
                        }
                    },
                },
            ]
        )
    }

    const userInitial =
        name?.charAt(0)?.toUpperCase() || "U";

    return (
        <>
            <SafeAreaView
                style={[
                    styles.container,
                    { backgroundColor: theme.background },
                ]}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <EditProfileHeader
                        name={name}
                        email={email}
                        profileImage={profileImage}
                        userInitial={userInitial}
                        onBack={() => navigation.navigate("Perfil")}
                        onPickImage={handlePickImage}
                    />

                    <View style={styles.content}>
                        <ProfilePhotoActions
                            theme={theme}
                            onPickImage={handlePickImage}
                            onTakePhoto={handleTakePhoto}
                        />

                        <ProfileLocationButton
                            location={location}
                            onGetLocation={handleGetLocation}
                        />

                        <EditProfileForm
                            theme={theme}
                            name={name}
                            email={email}
                            errorName={errorName}
                            errorEmail={errorEmail}
                            onChangeName={(text) => {
                                setName(text);
                                setErrorName("");
                            }}
                            onChangeEmail={(text) => {
                                setEmail(text);
                                setErrorEmail("");
                            }}
                            onSave={handleSave}
                            onDelete={handleDelete}
                        />

                        <ProfileInfoCard theme={theme} />

                        <View style={{ height: 100 }} />
                    </View>
                </ScrollView>
            </SafeAreaView>

            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                type="success"
                onClose={() => {
                    setAlertVisible(false);
                    navigation.navigate("Perfil");
                }}
                containerColor={theme.surface}
                titleColor={theme.textPrimary}
                messageColor={theme.textSecondary}
            />

            <CustomAlert
                visible={errorAlertVisible}
                title={errorAlertTitle}
                message={errorAlertMessage}
                type="warning"
                onClose={() => setErrorAlertVisible(false)}
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

    content: {
        paddingHorizontal: 20,
        marginTop: -25,
    },
});