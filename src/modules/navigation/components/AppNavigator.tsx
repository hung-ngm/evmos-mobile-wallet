import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../../types/navigation';
import RootTab from '../../root/RootTab';
import Send from '../../send/Send';
import Stake from '../../stake/Stake';
import Vote from '../../vote/Vote';
import Swap from '../../swap/Swap';
import ValidatorDetails from '../../stake/components/ValidatorDetails';
import StakeDetails from '../../stake/components/StakeDetails';
import TransactionSuccess from '../../transaction/TransactionSuccess';
import TransactionFailed from '../../transaction/TransactionFailed';

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
            <Stack.Screen name="Stake" component={Stake}
                options={{ 
                    headerShown: false
                }}
            />
            <Stack.Screen name="Vote" component={Vote}
                options={{ 
                    headerShown: false
                }}
            />
            <Stack.Screen name="Swap" component={Swap}
                options={{ 
                    headerShown: false
                }}
            />
            <Stack.Screen name="ValidatorDetails" component={ValidatorDetails}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="StakeDetails" component={StakeDetails}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="TransactionSuccess" component={TransactionSuccess}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="TransactionFailed" component={TransactionFailed}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator;