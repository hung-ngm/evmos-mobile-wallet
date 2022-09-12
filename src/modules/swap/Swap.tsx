import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { mainTheme } from '../../themes/mainTheme';
import Header from './components/Header';

const Swap = () => {
    return (
        <View style={styles.container}>
            <Header backTab="Dashboard" />
            <Text>Swap Tab</Text>
        </View>
    )
}

export default Swap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainTheme.MEDIUM_SPRING_GREEN
    }
})