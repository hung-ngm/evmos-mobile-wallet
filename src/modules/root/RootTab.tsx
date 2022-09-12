import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../types/navigation';
import Dashboard from '../dashboard/Dashboard';
import Explore from '../explore/Explore';
import Settings from '../settings/Settings';
import { mainTheme } from '../../themes/mainTheme';
import { FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator<RootTabParamList>();

const RootTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: mainTheme.MEDIUM_SPRING_GREEN,
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="wallet" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Explore"
                component={Explore}
                options={{
                    tabBarLabel: 'Explore',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="globe" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-settings-sharp" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default RootTab;