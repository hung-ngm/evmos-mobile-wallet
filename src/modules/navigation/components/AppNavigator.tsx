import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../../types/navigation';
import Dashboard from '../../dashboard/Dashboard';
import RootTab from '../../root/RootTab';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Root" component={RootTab}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator;