import React from 'react';
import AuthNavigator from './components/AuthNavigator';
import AppNavigator from './components/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';

const Navigation = () => {
    const { user } = useStore().userStore;
    console.log(user);

    let Navigator: JSX.Element = <></>;

    if (true) {
        Navigator = <AppNavigator />;
    } else {
        Navigator = <AuthNavigator />;
    }

    return (
        <NavigationContainer>
            {Navigator}
        </NavigationContainer>
    )
}

export default observer(Navigation);