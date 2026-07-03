const supabase = require("../config/supabaseClient");

const mapHabitFromDB = (habit) => {
    if (!habit) return null;

    return {
        id: habit.id,
        userId: habit.user_id,
        title: habit.title,
        type: habit.type,
        icon: habit.icon,
        completed: habit.completed || false,
        streak: habit.streak || 0,
        bestStreak: habit.best_streak || 0,
        totalCompletions: habit.total_completions || 0,
        lastCompleted: habit.last_completed || null,
        history: habit.history || {},
        createdAt: habit.created_at,
        updatedAt: habit.updated_at,
    };
};

const mapProgressFromDB = (progress) => {
    if (!progress) return null;

    return {
        userId: progress.user_id,
        xp: progress.xp || 0,
        level: progress.level || 1,
        updatedAt: progress.updated_at,
    };
};

const getUserHabits = async (userId) => {
    const { data, error } = await supabase
        .from("habits")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });

    if (error) {
        console.log("Error getUserHabits:", error.message);
        return [];
    }

    return data.map(mapHabitFromDB);
};

const getUserProgress = async (userId) => {
    const { data, error } = await supabase
        .from("progress")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

    if (error) {
        console.log("Error getUserProgress:", error.message);
        return {
            userId,
            xp: 0,
            level: 1,
        };
    }

    if (!data) {
        const newProgress = {
            user_id: userId,
            xp: 0,
            level: 1,
            updated_at: new Date().toISOString(),
        };

        const { data: insertedProgress, error: insertError } = await supabase
            .from("progress")
            .insert(newProgress)
            .select()
            .single();

        if (insertError) {
            console.log("Error create progress:", insertError.message);
            return {
                userId,
                xp: 0,
                level: 1,
            };
        }

        return mapProgressFromDB(insertedProgress);
    }

    return mapProgressFromDB(data);
};

const saveUserProgress = async (userId, xp) => {
    const level = Math.floor(xp / 100) + 1;

    const progressData = {
        user_id: userId,
        xp,
        level,
        updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
        .from("progress")
        .upsert(progressData, { onConflict: "user_id" })
        .select()
        .single();

    if (error) {
        console.log("Error saveUserProgress:", error.message);
        return {
            userId,
            xp,
            level,
        };
    }

    return mapProgressFromDB(data);
};

const createHabit = async (userId, data) => {
    const newHabit = {
        id: Date.now(),
        user_id: userId,
        title: data.title,
        type: data.type || "Diario",
        icon: data.icon || "checkmark-circle",
        completed: false,
        streak: 0,
        best_streak: 0,
        total_completions: 0,
        last_completed: null,
        history: {},
        created_at: new Date().toISOString(),
        updated_at: null,
    };

    const { data: habit, error } = await supabase
        .from("habits")
        .insert(newHabit)
        .select()
        .single();

    if (error) {
        console.log("Error createHabit:", error.message);
        return null;
    }

    return mapHabitFromDB(habit);
};

const updateHabit = async (userId, habitId, data) => {
    const updateData = {
        title: data.title,
        type: data.type,
        icon: data.icon,
        updated_at: new Date().toISOString(),
    };

    Object.keys(updateData).forEach((key) => {
        if (updateData[key] === undefined) {
            delete updateData[key];
        }
    });

    const { data: habit, error } = await supabase
        .from("habits")
        .update(updateData)
        .eq("id", Number(habitId))
        .eq("user_id", userId)
        .select()
        .single();

    if (error) {
        console.log("Error updateHabit:", error.message);
        return null;
    }

    return mapHabitFromDB(habit);
};

const deleteHabit = async (userId, habitId) => {
    const { error, count } = await supabase
        .from("habits")
        .delete({ count: "exact" })
        .eq("id", Number(habitId))
        .eq("user_id", userId);

    if (error) {
        console.log("Error deleteHabit:", error.message);
        return false;
    }

    return count > 0;
};

const toggleHabit = async (userId, habitId, currentDate, previousDate) => {
    const { data: habitData, error } = await supabase
        .from("habits")
        .select("*")
        .eq("id", Number(habitId))
        .eq("user_id", userId)
        .maybeSingle();

    if (error || !habitData) {
        console.log("Error toggleHabit:", error?.message);
        return null;
    }

    const habit = mapHabitFromDB(habitData);
    const currentHistory = habit.history || {};
    const isCompletedToday = currentHistory[currentDate] === true;

    let progress = await getUserProgress(userId);

    let updatedHabitData;

    if (isCompletedToday) {
        const newHistory = { ...currentHistory };
        delete newHistory[currentDate];

        updatedHabitData = {
            completed: false,
            history: newHistory,
            streak: Math.max((habit.streak || 0) - 1, 0),
            last_completed:
                habit.lastCompleted === currentDate
                    ? null
                    : habit.lastCompleted,
            updated_at: new Date().toISOString(),
        };
    } else {
        let newStreak = habit.streak || 0;

        if (habit.lastCompleted === previousDate) {
            newStreak += 1;
        } else if (habit.lastCompleted !== currentDate) {
            newStreak = 1;
        }

        const xpReward = habit.type === "Diario" ? 10 : 25;

        progress = await saveUserProgress(
            userId,
            progress.xp + xpReward
        );

        updatedHabitData = {
            completed: true,
            streak: newStreak,
            best_streak: Math.max(habit.bestStreak || 0, newStreak),
            last_completed: currentDate,
            total_completions: (habit.totalCompletions || 0) + 1,
            history: {
                ...currentHistory,
                [currentDate]: true,
            },
            updated_at: new Date().toISOString(),
        };
    }

    const { data: updatedHabit, error: updateError } = await supabase
        .from("habits")
        .update(updatedHabitData)
        .eq("id", Number(habitId))
        .eq("user_id", userId)
        .select()
        .single();

    if (updateError) {
        console.log("Error update toggleHabit:", updateError.message);
        return null;
    }

    return {
        habit: mapHabitFromDB(updatedHabit),
        progress,
    };
};

const resetUserData = async (userId) => {
    const { error: habitsError } = await supabase
        .from("habits")
        .delete()
        .eq("user_id", userId);

    const { error: progressError } = await supabase
        .from("progress")
        .delete()
        .eq("user_id", userId);

    if (habitsError || progressError) {
        console.log(
            "Error resetUserData:",
            habitsError?.message || progressError?.message
        );
        return false;
    }

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