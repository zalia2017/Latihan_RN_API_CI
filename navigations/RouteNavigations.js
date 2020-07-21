import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from './../screens/Dashboard';
import DetailsScreen from './../screens/DetailsScreen';
import UpdateScreen from './../screens/UpdateScreen';

const Stack = createStackNavigator();

export default function RouteNavigations() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Dashboard">
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen name="Update" component={UpdateScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
