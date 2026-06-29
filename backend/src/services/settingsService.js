const userModel = require("../models/userModel");

const defaultSettings = {
    darkMode: false,
    notifications: true,
};

const getUserSettings = (userId) => {
    const user = userModel.findUserById(userId);

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
        settings: user.settings || defaultSettings,
    };
};

const updateUserSettings = (userId, settings) => {
    const updatedUser = userModel.updateUserSettings(
        userId,
        {
            darkMode: settings.darkMode,
            notifications: settings.notifications,
        }
    );

    if (!updatedUser) {
        return {
            status: 404,
            success: false,
            message: "Usuario no encontrado.",
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