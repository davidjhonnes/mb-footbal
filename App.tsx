/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

import configureStore from './src/infra/redux/configureStore';

import Home from './src/pages/home/Home';
import Router from "./src/config/routes/"

const { store } = configureStore();


LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  "Expected style"
]);
const App: () => any = () => {

    return (
        <Provider store={store}>
            <PaperProvider>
                <SafeAreaProvider>
                    <Router />
                </SafeAreaProvider>
            </PaperProvider>
        </Provider>
    );
};



export default App;
