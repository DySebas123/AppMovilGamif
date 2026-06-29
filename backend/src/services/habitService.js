const habitModel = require("../models/habitModel");

const getUserHabitData = (userId) => {
    const habits = habitModel.getUserHabits(userId);
    const progress = habitModel.getUserProgress(userId);

    return {
        status: 200,
        success: true,
        habits,
        progress,
    };
};

const createUserHabit = (userId, data) => {
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

    const habit = habitModel.createHabit(userId, {
        title: title.trim(),
        type,
        icon,
    });

    return {
        status: 201,
        success: true,
        message: "Hábito creado correctamente.",
        habit,
    };
};

const updateUserHabit = (userId, habitId, data) => {
    const habit = habitModel.updateHabit(
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

const deleteUserHabit = (userId, habitId) => {
    const deleted = habitModel.deleteHabit(
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

const toggleUserHabit = (userId, habitId, data) => {
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

    const result = habitModel.toggleHabit(
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

const resetUserHabitData = (userId) => {
    habitModel.resetUserData(userId);

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