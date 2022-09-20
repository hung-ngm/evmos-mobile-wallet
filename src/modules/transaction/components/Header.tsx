import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { mainTheme } from '../../../themes/mainTheme';

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.swapTextContainer}>
                <Text style={styles.swapText}>Transaction</Text>
            </View>
        </View>
    )

}

export default Header;

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 30,
      paddingHorizontal: 20,
      borderRadius: 12,
    },
    swapTextContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 6,
    },
    swapText: {
        color: mainTheme.BLACK_COLOR,
        textAlign: 'center', 
        fontSize: 24, 
        fontWeight: '700', 
        fontFamily: 'Helvetica Neue',
    }
});