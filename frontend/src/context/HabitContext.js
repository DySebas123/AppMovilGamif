import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect,
} from "react";

import { useAuth } from "./AuthContext";
import * as habitService from "../services/habitService";

const HabitContext = createContext();

const formatDate = (date) => {
    return date.toISOString().split("T")[0];
};

const getDateWithOffset = (offset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return formatDate(date);
};

const getPreviousDateWithOffset = (offset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + offset - 1);
    return formatDate(date);
};

const normalizeHabitsByDate = (habits, currentDate) => {
    return habits.map((habit) => {
        const history = habit.history || {};

        return {
            ...habit,
            history,
            completed:
                habit.lastCompleted === currentDate &&
                history[currentDate] === true,
            streak: habit.streak || 0,
            totalCompletions: habit.totalCompletions || 0,
            lastCompleted: habit.lastCompleted || null,
        };
    });
};

export function HabitProvider({ children }) {
    const {
        token,
        isAuthenticated,
    } = useAuth();

    const [habits, setHabits] = useState([]);
    const [xp, setXp] = useState(0);
    const [demoDayOffset, setDemoDayOffset] = useState(0);
    const [loading, setLoading] = useState(true);

    const currentDate = useMemo(() => {
        return getDateWithOffset(demoDayOffset);
    }, [demoDayOffset]);

    const previousDate = useMemo(() => {
        return getPreviousDateWithOffset(demoDayOffset);
    }, [demoDayOffset]);

    useEffect(() => {
        if (isAuthenticated && token) {
            loadHabitsFromBackend();
        } else {
            setHabits([]);
            setXp(0);
            setDemoDayOffset(0);
            setLoading(false);
        }
    }, [isAuthenticated, token, currentDate]);

    const loadHabitsFromBackend = async () => {
        try {
            setLoading(true);

            const response = await habitService.getHabits(token);

            const backendHabits = response.data.habits || [];
            const progress = response.data.progress || {};

            setHabits(
                normalizeHabitsByDate(
                    backendHabits,
                    currentDate
                )
            );

            setXp(progress.xp || 0);
        } catch (error) {
            console.log(
                "Error loading habits:",
                error.response?.data?.message || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    const level = useMemo(() => {
        return Math.floor(xp / 100) + 1;
    }, [xp]);

    const progressPercentage = useMemo(() => {
        return xp % 100;
    }, [xp]);

    const addHabit = async (habit) => {
        try {
            const response = await habitService.createHabit(
                habit,
                token
            );

            const newHabit = response.data.habit;

            setHabits(prev => [
                ...prev,
                {
                    ...newHabit,
                    completed: false,
                    history: newHabit.history || {},
                    streak: newHabit.streak || 0,
                    totalCompletions: newHabit.totalCompletions || 0,
                },
            ]);

            return {
                success: true,
                message: response.data.message,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Error al crear hábito.",
            };
        }
    };

    const updateHabit = async (id, updatedData) => {
        try {
            const response = await habitService.updateHabit(
                id,
                updatedData,
                token
            );

            const updatedHabit = response.data.habit;

            setHabits(prev =>
                prev.map(habit =>
                    String(habit.id) === String(id)
                        ? {
                            ...updatedHabit,
                            completed:
                                updatedHabit.lastCompleted === currentDate &&
                                updatedHabit.history?.[currentDate] === true,
                        }
                        : habit
                )
            );

            return {
                success: true,
                message: response.data.message,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Error al actualizar hábito.",
            };
        }
    };

    const deleteHabit = async (id) => {
        try {
            const response = await habitService.deleteHabit(
                id,
                token
            );

            setHabits(prev =>
                prev.filter(
                    habit => String(habit.id) !== String(id)
                )
            );

            return {
                success: true,
                message: response.data.message,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Error al eliminar hábito.",
            };
        }
    };

    const toggleHabit = async (id) => {
        try {
            const response = await habitService.toggleHabit(
                id,
                {
                    currentDate,
                    previousDate,
                },
                token
            );

            const updatedHabit = response.data.habit;
            const progress = response.data.progress;

            setHabits(prev =>
                prev.map(habit =>
                    String(habit.id) === String(id)
                        ? {
                            ...updatedHabit,
                            completed:
                                updatedHabit.lastCompleted === currentDate &&
                                updatedHabit.history?.[currentDate] === true,
                        }
                        : habit
                )
            );

            if (progress) {
                setXp(progress.xp || 0);
            }

            return {
                success: true,
                message: response.data.message,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Error al completar hábito.",
            };
        }
    };

    const simulateNextDay = () => {
        setDemoDayOffset(prev => prev + 1);
    };

    const resetData = async () => {
        try {
            await habitService.resetHabits(token);

            setHabits([]);
            setXp(0);
            setDemoDayOffset(0);

            return {
                success: true,
                message: "Progreso reiniciado correctamente.",
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Error al reiniciar progreso.",
            };
        }
    };

    const completedHabits = useMemo(() => {
        return habits.filter(habit => habit.completed).length;
    }, [habits]);

    const totalHabits = useMemo(() => {
        return habits.length;
    }, [habits]);

    const bestStreak = useMemo(() => {
        if (habits.length === 0) return 0;

        return Math.max(
            ...habits.map(habit => habit.streak || 0)
        );
    }, [habits]);

    const totalCompletedHistory = useMemo(() => {
        return habits.reduce((total, habit) => {
            return total + (habit.totalCompletions || 0);
        }, 0);
    }, [habits]);

    return (
        <HabitContext.Provider
            value={{
                habits,
                setHabits,

                xp,
                level,
                bestStreak,

                currentDate,
                previousDate,
                demoDayOffset,
                simulateNextDay,

                toggleHabit,
                addHabit,
                updateHabit,
                deleteHabit,
                resetData,
                loadHabitsFromBackend,

                completedHabits,
                totalHabits,
                totalCompletedHistory,
                progressPercentage,

                loading,
            }}
        >
            {children}
        </HabitContext.Provider>
    );
}

export function useHabits() {
    return useContext(HabitContext);
}