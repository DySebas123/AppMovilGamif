const userModel = require("../models/userModel");

const defaultSettings = {
    darkMode: false,
    notifications: true,
    language: "Español",
};

const getUserSettings = async (userId) => {
    const user = await userModel.findUserById(userId);

    if (!user) {
        return {
            status: 404,
            success: false,
            message: "Usuario no encontrado.",
        };
    }

    return {
        status: 200,
        success: true,
        settings: {
            ...defaultSettings,
            ...(user.settings || {}),
        },
    };
};

const updateUserSettings = async (userId, settings) => {
    const currentUser = await userModel.findUserById(userId);

    if (!currentUser) {
        return {
            status: 404,
            success: false,
            message: "Usuario no encontrado.",
        };
    }

    const newSettings = {
        ...defaultSettings,
        ...(currentUser.settings || {}),
        ...settings,
    };

    const updatedUser = await userModel.updateUserSettings(
        userId,
        newSettings
    );

    if (!updatedUser) {
        return {
            status: 500,
            success: false,
            message: "No se pudo actualizar la configuración.",
        };
    }

    return {
        status: 200,
        success: true,
        message: "Configuración actualizada correctamente.",
        settings: updatedUser.settings,
    };
};

module.exports = {
    getUserSettings,
    updateUserSettings,
};