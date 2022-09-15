import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { mainTheme } from '../../../themes/mainTheme';

const ValidatorDetails = () => {
    return (
        <View style={styles.container}>
            <Text>Validator Details</Text>
        </View>
    )
}

export default ValidatorDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainTheme.MEDIUM_SPRING_GREEN
    }
})