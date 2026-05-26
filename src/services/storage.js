import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveData(key, value) {

    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        console.log("Error saving data:", error);
    }
}

export async function getData(key) {

    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null
            ? JSON.parse(jsonValue)
            : null;
    } catch (error) {
        console.log("Error getting data:", error);
        return null;
    }
}

export async function removeData(key) {

    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log("Error removing data:", error);
    }
}