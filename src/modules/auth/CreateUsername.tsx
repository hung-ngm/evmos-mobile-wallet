import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from './components/Header';
import { mainTheme } from '../../themes/mainTheme';

const CreateUsername = () => {
    return (
        <View style={styles.container}>
            <Header backTab="Onboarding" />
        </View>
    )
}

export default CreateUsername;

const styles = StyleSheet.create({
    container: {
        backgroundColor: mainTheme.WHITE_COLOR,
        flex: 1,
    }
})