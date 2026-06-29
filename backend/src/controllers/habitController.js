const habitService = require("../services/habitService");

const getHabits = (req, res) => {
    try {
        const result = habitService.getUserHabitData(
            req.user.id
        );

        return res.status(result.status).json({
            success: result.success,
            habits: result.habits,
            progress: result.progress,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error interno al obtener hábitos.",
        });
    }
};

const createHabit = (req, res) => {
    try {
        const result = habitService.createUserHabit(
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
            habit: result.habit,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error interno al crear hábito.",
        });
    }
};

const updateHabit = (req, res) => {
    try {
        const result = habitService.updateUserHabit(
            req.user.id,
            req.params.id,
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
            habit: result.habit,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error interno al actualizar hábito.",
        });
    }
};

const deleteHabit = (req, res) => {
    try {
        const result = habitService.deleteUserHabit(
            req.user.id,
            req.params.id
        );

        return res.status(result.status).json({
            success: result.success,
            message: result.message,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error interno al eliminar hábito.",
        });
    }
};

const toggleHabit = (req, res) => {
    try {
        const result = habitService.toggleUserHabit(
            req.user.id,
            req.params.id,
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
            habit: result.habit,
            progress: result.progress,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error interno al completar hábito.",
        });
    }
};

const resetHabits = (req, res) => {
    try {
        const result = habitService.resetUserHabitData(
            req.user.id
        );

        return res.status(result.status).json({
            success: result.success,
            message: result.message,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error interno al reiniciar datos.",
        });
    }
};

module.exports = {
    getHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    toggleHabit,
    resetHabits,
};