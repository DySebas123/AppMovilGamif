const habitModel = require("../models/habitModel");

const getUserHabitData = async (userId) => {
    const habits = await habitModel.getUserHabits(userId);
    const progress = await habitModel.getUserProgress(userId);

    return {
        status: 200,
        success: true,
        habits,
        progress,
    };
};

const createUserHabit = async (userId, data) => {
    const {
        title,
        type,
        icon,
    } = data;

    if (!title || !title.trim()) {
        return {
            status: 400,
            success: false,
            message: "El nombre del hábito es obligatorio.",
        };
    }

    const habit = await habitModel.createHabit(userId, {
        title: title.trim(),
        type,
        icon,
    });

    if (!habit) {
        return {
            status: 500,
            success: false,
            message: "No se pudo crear el hábito.",
        };
    }

    return {
        status: 201,
        success: true,
        message: "Hábito creado correctamente.",
        habit,
    };
};

const updateUserHabit = async (userId, habitId, data) => {
    const habit = await habitModel.updateHabit(
        userId,
        habitId,
        data
    );

    if (!habit) {
        return {
            status: 404,
            success: false,
            message: "Hábito no encontrado.",
        };
    }

    return {
        status: 200,
        success: true,
        message: "Hábito actualizado correctamente.",
        habit,
    };
};

const deleteUserHabit = async (userId, habitId) => {
    const deleted = await habitModel.deleteHabit(
        userId,
        habitId
    );

    if (!deleted) {
        return {
            status: 404,
            success: false,
            message: "Hábito no encontrado.",
        };
    }

    return {
        status: 200,
        success: true,
        message: "Hábito eliminado correctamente.",
    };
};

const toggleUserHabit = async (userId, habitId, data) => {
    const {
        currentDate,
        previousDate,
    } = data;

    if (!currentDate || !previousDate) {
        return {
            status: 400,
            success: false,
            message: "Fechas requeridas para actualizar el hábito.",
        };
    }

    const result = await habitModel.toggleHabit(
        userId,
        habitId,
        currentDate,
        previousDate
    );

    if (!result) {
        return {
            status: 404,
            success: false,
            message: "Hábito no encontrado.",
        };
    }

    return {
        status: 200,
        success: true,
        message: "Hábito actualizado correctamente.",
        habit: result.habit,
        progress: result.progress,
    };
};

const resetUserHabitData = async (userId) => {
    const reset = await habitModel.resetUserData(userId);

    if (!reset) {
        return {
            status: 500,
            success: false,
            message: "No se pudieron reiniciar los datos.",
        };
    }

    return {
        status: 200,
        success: true,
        message: "Datos del usuario reiniciados correctamente.",
    };
};

module.exports = {
    getUserHabitData,
    createUserHabit,
    updateUserHabit,
    deleteUserHabit,
    toggleUserHabit,
    resetUserHabitData,
};