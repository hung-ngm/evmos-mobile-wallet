import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../types/navigation';
import Onboarding from '../../auth/Onboarding';
import CreateUsername from '../../auth/CreateUsername';
import SignIn from '../../auth/SignIn';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Onboarding"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="CreateUsername" component={CreateUsername} />
            <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
    )
}

export default AuthNavigator;