import AsyncStorage from "@react-native-community/async-storage";

export const persistState = async (key: string, value: any) => {
  try {
    const stringifiedValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringifiedValue);    
  } catch (err) {
    console.log('Failed to persist data');
  }

}

export const getPersistedState = async (key: string) => {
  const persistedStateString = await AsyncStorage.getItem(key);
  const state = persistedStateString
  return state ? JSON.parse(state) : null;
};

