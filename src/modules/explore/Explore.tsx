import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { mainTheme } from '../../themes/mainTheme';

const Explore = () => {
    return (
        <View style={styles.container}>
            <Text>Explore Tab</Text>
        </View>
    )
}

export default Explore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '50%',
        backgroundColor: mainTheme.MEDIUM_SPRING_GREEN,
    }
})