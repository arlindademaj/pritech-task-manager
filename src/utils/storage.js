import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@task_manager:tasks";

export const getTasks = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error("getTasks error:", error);
    return [];
  }
};

export const saveTasks = async (tasks) => {
  try {
    const json = JSON.stringify(tasks);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    console.error("saveTasks error:", error);
  }
};

export const clearTasks = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("clearTasks error:", error);
  }
};
