const settingsService = require("../services/settingsService");

const getSettings = async (req, res) => {
    try {
        const result = await settingsService.getUserSettings(
            req.user.id
        );

        return res.status(result.status).json(result);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error interno al obtener configuración.",
        });
    }
};

const updateSettings = async (req, res) => {
    try {
        const result = await settingsService.updateUserSettings(
            req.user.id,
            req.body
        );

        return res.status(result.status).json(result);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error interno al actualizar configuración.",
        });
    }
};

module.exports = {
    getSettings,
    updateSettings,
};