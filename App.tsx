/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

import configureStore from './src/infra/redux/configureStore';

import Home from './src/pages/home/Home';
import Router from "./src/config/routes/"

const { store } = configureStore();


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
