import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, StackNavigationOptions } from '@react-navigation/stack';

import Home from "../../pages/home/Home";
import PreLoader from '../../pages/preLoader/PreLoader';
import LeaderBoard from '../../pages/leaderboard/LeaderBoard';
import TeamDetails from '../../pages/teamdetails/TeamDetails';

export const ROUTERS = {
    "Home": "Home",
    "PreLoader": "PreLoader",
    "LeaderBoard": "LeaderBoard",
    "TeamDetails": "TeamDetails"
}

const options: StackNavigationOptions = {
    headerShown: false,
};
const Stack = createStackNavigator();
function AppStack() {


    return (
        <Stack.Navigator
            initialRouteName={ROUTERS.PreLoader}
            // options={}
            screenOptions={{
                gestureEnabled: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <Stack.Screen
                name={ROUTERS.PreLoader}
                component={PreLoader}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name={ROUTERS.Home}
                component={Home}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name={ROUTERS.LeaderBoard}
                component={LeaderBoard}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTERS.TeamDetails}
                component={TeamDetails}
                options={({ route}: any)  =>({
                     title: route.params.dataTeam.name,
                     headerShown: true,
                     headerStyle: {
                        backgroundColor: '#30302e',
                      },
                    headerTintColor: '#fff',
                    })}

            />
        </Stack.Navigator>
    )
}


export default () => {

    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    )
}


