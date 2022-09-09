import React from 'react';
import AuthNavigator from './components/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';

const Navigation = () => {
    return (
        <NavigationContainer>
            <AuthNavigator />
        </NavigationContainer>
    )
}

export default Navigation;