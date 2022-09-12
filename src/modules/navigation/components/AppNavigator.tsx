import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../../types/navigation';
import RootTab from '../../root/RootTab';
import Send from '../../send/Send';
import Receive from '../../receive/Receive';
import Swap from '../../swap/Swap';


const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Root" component={RootTab}
                options={{ 
                    headerShown: false
                }}
            />
            <Stack.Screen name="Send" component={Send}
                options={{ 
                    headerShown: false
                }}
            />
            <Stack.Screen name="Receive" component={Receive}
                options={{ 
                    headerShown: false
                }}
            />
            <Stack.Screen name="Swap" component={Swap}
                options={{ 
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator;