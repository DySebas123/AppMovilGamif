import AsyncStorage from "@react-native-async-storage/async-storage";

// Serializa y persiste informacion en el almacenamiento local del dispositivo por llave
export async function saveData(key, value) {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        console.log("Error saving data:", error);
    }
}

// Recupera y deserializa informacion desde el almacenamiento local mediante su llave
export async function getData(key) {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        // Retorna el objeto parseado o null si la llave no registra datos
        return jsonValue != null
            ? JSON.parse(jsonValue)
            : null;
    } catch (error) {
        console.log("Error getting data:", error);
        return null;
    }
}

// Remueve permanentemente el registro vinculado a la llave provista
export async function removeData(key) {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log("Error removing data:", error);
    }
}