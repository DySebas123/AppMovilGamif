const authService = require("../services/authService");

const register = async (req, res) => {
    try {
        const result = await authService.registerUser(req.body);

        return res.status(result.status).json({
            success: result.success,
            message: result.message,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error interno al registrar usuario.",
        });
    }
};

const login = async (req, res) => {
    try {
        const result = await authService.loginUser(req.body);

        if (!result.success) {
            return res.status(result.status).json({
                success: result.success,
                message: result.message,
            });
        }

        return res.status(result.status).json({
            success: result.success,
            message: result.message,
            token: result.token,
            user: result.user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error interno al iniciar sesión.",
        });
    }
};

const profile = (req, res) => {
    try {
        const result = authService.getUserProfile(req.user.id);

        if (!result.success) {
            return res.status(result.status).json({
                success: result.success,
                message: result.message,
            });
        }

        return res.status(result.status).json({
            success: result.success,
            user: result.user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error interno al obtener perfil.",
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const result = await authService.updateUserProfile(
            req.user.id,
            req.body
        );

        if (!result.success) {
            return res.status(result.status).json({
                success: result.success,
                message: result.message,
            });
        }

        return res.status(result.status).json({
            success: result.success,
            message: result.message,
            user: result.user,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error interno al actualizar perfil.",
        });
    }
};

module.exports = {
    register,
    login,
    profile,
    updateProfile,
};