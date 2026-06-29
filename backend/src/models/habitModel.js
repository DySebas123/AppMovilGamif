const {
    getDataPath,
    readJsonFile,
    writeJsonFile,
} = require("../utils/fileStorage");

const habitsPath = getDataPath("habits.json");
const progressPath = getDataPath("progress.json");

const getAllHabits = () => {
    return readJsonFile(habitsPath);
};

const saveAllHabits = (habits) => {
    writeJsonFile(habitsPath, habits);
};

const getAllProgress = () => {
    return readJsonFile(progressPath);
};

const saveAllProgress = (progress) => {
    writeJsonFile(progressPath, progress);
};

const getUserHabits = (userId) => {
    const habits = getAllHabits();

    return habits.filter(
        habit => habit.userId === userId
    );
};

const getUserProgress = (userId) => {
    const progressList = getAllProgress();

    let progress = progressList.find(
        item => item.userId === userId
    );

    if (!progress) {
        progress = {
            userId,
            xp: 0,
            createdAt: new Date().toISOString(),
        };

        progressList.push(progress);
        saveAllProgress(progressList);
    }

    return progress;
};

const saveUserProgress = (userId, xp) => {
    const progressList = getAllProgress();

    const index = progressList.findIndex(
        item => item.userId === userId
    );

    if (index === -1) {
        progressList.push({
            userId,
            xp,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    } else {
        progressList[index] = {
            ...progressList[index],
            xp,
            updatedAt: new Date().toISOString(),
        };
    }

    saveAllProgress(progressList);

    return getUserProgress(userId);
};

const createHabit = (userId, data) => {
    const habits = getAllHabits();

    const newHabit = {
        id: Date.now(),
        userId,
        title: data.title,
        type: data.type || "Diario",
        icon: data.icon || "checkmark-circle",
        completed: false,
        streak: 0,
        lastCompleted: null,
        history: {},
        totalCompletions: 0,
        createdAt: new Date().toISOString(),
    };

    habits.push(newHabit);

    saveAllHabits(habits);

    return newHabit;
};

const updateHabit = (userId, habitId, data) => {
    const habits = getAllHabits();

    const index = habits.findIndex(
        habit =>
            habit.id === Number(habitId) &&
            habit.userId === userId
    );

    if (index === -1) {
        return null;
    }

    habits[index] = {
        ...habits[index],
        ...data,
        updatedAt: new Date().toISOString(),
    };

    saveAllHabits(habits);

    return habits[index];
};

const deleteHabit = (userId, habitId) => {
    const habits = getAllHabits();

    const exists = habits.some(
        habit =>
            habit.id === Number(habitId) &&
            habit.userId === userId
    );

    if (!exists) {
        return false;
    }

    const filteredHabits = habits.filter(
        habit =>
            !(
                habit.id === Number(habitId) &&
                habit.userId === userId
            )
    );

    saveAllHabits(filteredHabits);

    return true;
};

const toggleHabit = (userId, habitId, currentDate, previousDate) => {
    const habits = getAllHabits();

    const index = habits.findIndex(
        habit =>
            habit.id === Number(habitId) &&
            habit.userId === userId
    );

    if (index === -1) {
        return null;
    }

    const habit = habits[index];
    const currentHistory = habit.history || {};
    const isCompletedToday = currentHistory[currentDate] === true;

    let progress = getUserProgress(userId);

    if (isCompletedToday) {
        const newHistory = {
            ...currentHistory,
        };

        delete newHistory[currentDate];

        habits[index] = {
            ...habit,
            completed: false,
            history: newHistory,
            streak: Math.max((habit.streak || 0) - 1, 0),
            lastCompleted:
                habit.lastCompleted === currentDate
                    ? null
                    : habit.lastCompleted,
        };
    } else {
        let newStreak = habit.streak || 0;

        if (habit.lastCompleted === previousDate) {
            newStreak += 1;
        } else if (habit.lastCompleted !== currentDate) {
            newStreak = 1;
        }

        const xpReward = habit.type === "Diario" ? 10 : 25;

        progress = saveUserProgress(
            userId,
            progress.xp + xpReward
        );

        habits[index] = {
            ...habit,
            completed: true,
            streak: newStreak,
            lastCompleted: currentDate,
            totalCompletions: (habit.totalCompletions || 0) + 1,
            history: {
                ...currentHistory,
                [currentDate]: true,
            },
        };
    }

    saveAllHabits(habits);

    return {
        habit: habits[index],
        progress,
    };
};

const resetUserData = (userId) => {
    const habits = getAllHabits();
    const progressList = getAllProgress();

    const filteredHabits = habits.filter(
        habit => habit.userId !== userId
    );

    const filteredProgress = progressList.filter(
        item => item.userId !== userId
    );

    saveAllHabits(filteredHabits);
    saveAllProgress(filteredProgress);

    return true;
};

module.exports = {
    getUserHabits,
    getUserProgress,
    saveUserProgress,
    createHabit,
    updateHabit,
    deleteHabit,
    toggleHabit,
    resetUserData,
};