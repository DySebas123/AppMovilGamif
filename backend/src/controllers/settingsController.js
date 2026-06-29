const settingsService = require("../services/settingsService");

const getSettings = (req, res) => {
    try {
        const result = settingsService.getUserSettings(req.user.id);

        return res.status(result.status).json(result);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error interno al obtener configuración.",
        });
    }
};

const updateSettings = (req, res) => {
    try {
        const result = settingsService.updateUserSettings(
            req.user.id,
            req.body
        );

        return res.status(result.status).json(result);

    } catch (error) {
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