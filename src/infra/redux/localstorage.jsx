import AsyncStorage from "@react-native-community/async-storage";

export const loadState = async () => {
    try {
      const serializedState = await AsyncStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  }; 

  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      AsyncStorage.setItem('state', serializedState);
    } catch {
      // ignore write errors
    }
  };