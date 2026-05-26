import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect,
} from "react";

import {
    saveData,
    getData,
    removeData,
} from "../services/storage";

const HabitContext = createContext();

const STORAGE_KEY_HABITS = "@habits";
const STORAGE_KEY_XP = "@xp";
const STORAGE_KEY_DEMO_DAY_OFFSET = "@demo_day_offset";

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
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

const defaultHabits = [
    {
        id: 1,
        title: "Estudiar Matemáticas",
        type: "Diario",
        streak: 0,
        completed: false,
        lastCompleted: null,
        icon: "book-open",
        history: {},
        totalCompletions: 0,
    },
    {
        id: 2,
        title: "Hacer ejercicio",
        type: "Diario",
        streak: 0,
        completed: false,
        lastCompleted: null,
        icon: "fitness",
        history: {},
        totalCompletions: 0,
    },
    {
        id: 3,
        title: "Meditar",
        type: "Diario",
        streak: 0,
        completed: false,
        lastCompleted: null,
        icon: "heart",
        history: {},
        totalCompletions: 0,
    },
    {
        id: 4,
        title: "Leer 30 minutos",
        type: "Diario",
        streak: 0,
        completed: false,
        lastCompleted: null,
        icon: "book",
        history: {},
        totalCompletions: 0,
    },
];

const normalizeHabits = (habits) => {
    return habits.map((habit) => {
        const history = habit.history || {};

        if (habit.completed && habit.lastCompleted) {
            history[habit.lastCompleted] = true;
        }

        return {
            ...habit,
            history,
            lastCompleted: habit.lastCompleted || null,
            streak: habit.streak || 0,
            completed: habit.completed || false,
            totalCompletions:
                habit.totalCompletions || Object.keys(history).length || 0,
        };
    });
};

export function HabitProvider({ children }) {
    const [habits, setHabits] = useState(defaultHabits);
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
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const storedHabits = await getData(STORAGE_KEY_HABITS);
            const storedXp = await getData(STORAGE_KEY_XP);
            const storedDemoDayOffset = await getData(STORAGE_KEY_DEMO_DAY_OFFSET);

            if (storedHabits) {
                setHabits(normalizeHabits(storedHabits));
            }

            if (storedXp !== null) {
                setXp(storedXp);
            }

            if (storedDemoDayOffset !== null) {
                setDemoDayOffset(storedDemoDayOffset);
            }
        } catch (error) {
            console.log("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading) return;

        const resetHabits = habits.map((habit) => {
            if (habit.lastCompleted !== currentDate) {
                return {
                    ...habit,
                    completed: false,
                };
            }

            return habit;
        });

        setHabits(resetHabits);
    }, [loading, currentDate]);

    useEffect(() => {
        if (!loading) {
            saveData(STORAGE_KEY_HABITS, habits);
            saveData(STORAGE_KEY_XP, xp);
            saveData(STORAGE_KEY_DEMO_DAY_OFFSET, demoDayOffset);
        }
    }, [habits, xp, demoDayOffset, loading]);

    const level = useMemo(() => {
        return Math.floor(xp / 100) + 1;
    }, [xp]);

    const currentLevelXp = useMemo(() => {
        return xp % 100;
    }, [xp]);

    const progressPercentage = useMemo(() => {
        return currentLevelXp;
    }, [currentLevelXp]);

    const toggleHabit = (id) => {
        const updatedHabits = habits.map((habit) => {
            if (String(habit.id) !== String(id)) {
                return habit;
            }

            const currentHistory = habit.history || {};

            if (habit.completed) {
                const newHistory = { ...currentHistory };
                delete newHistory[currentDate];

                return {
                    ...habit,
                    completed: false,
                    history: newHistory,
                    streak: Math.max((habit.streak || 0) - 1, 0),
                    lastCompleted: null,
                };
            }

            let newStreak = habit.streak || 0;

            if (habit.lastCompleted === previousDate) {
                newStreak += 1;
            } else if (habit.lastCompleted !== currentDate) {
                newStreak = 1;
            }

            const xpReward = habit.type === "Diario" ? 10 : 25;

            setXp(prev => prev + xpReward);

            return {
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
        });

        setHabits(updatedHabits);
    };

    const simulateNextDay = () => {
        setDemoDayOffset(prev => prev + 1);
    };

    const updateHabit = (id, updatedData) => {
        const updatedHabits = habits.map((habit) => {
            if (String(habit.id) === String(id)) {
                return {
                    ...habit,
                    ...updatedData,
                };
            }

            return habit;
        });

        setHabits(updatedHabits);
    };

    const addHabit = (habit) => {
        const newHabit = {
            id: Date.now(),
            ...habit,
            completed: false,
            streak: 0,
            lastCompleted: null,
            history: {},
            totalCompletions: 0,
        };

        setHabits(prev => [...prev, newHabit]);
    };

    const deleteHabit = (id) => {
        const filteredHabits = habits.filter(
            habit => String(habit.id) !== String(id)
        );

        setHabits(filteredHabits);
    };

    const resetData = async () => {
        await removeData(STORAGE_KEY_HABITS);
        await removeData(STORAGE_KEY_XP);
        await removeData(STORAGE_KEY_DEMO_DAY_OFFSET);

        setHabits(defaultHabits);
        setXp(0);
        setDemoDayOffset(0);
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

    return (
        <HabitContext.Provider
            value={{
                habits,
                setHabits,

                xp,
                level,
                bestStreak,

                currentDate,
                demoDayOffset,
                simulateNextDay,

                toggleHabit,
                addHabit,
                updateHabit,
                deleteHabit,
                resetData,

                completedHabits,
                totalHabits,
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