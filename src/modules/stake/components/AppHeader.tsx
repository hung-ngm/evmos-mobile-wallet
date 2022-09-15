import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../../common/BackButton';
import useAppNavigation from '../../navigation/hooks/useAppNavigation';
import { AppScreenTypes } from '../../../types/navigation';
import { mainTheme } from '../../../themes/mainTheme';

export type AppHeaderProps = {
    backTab: AppScreenTypes;
    title: string;
}

const AppHeader = ({ backTab, title }: AppHeaderProps) => {
    const navigation = useAppNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.backButtonContainer}>
                <BackButton 
                    extraProps={{
                        paddingLeft: 35,
                        marginLeft: 10,
                    }}
                    onPress={() => navigation.navigate(backTab) } 
                    color={mainTheme.WHITE_COLOR}
                />
            </View>
            
            <View style={styles.stakeTextContainer}>
                <Text style={styles.stakeText}>{title}</Text>
            </View>
        </View>
    )

}

export default AppHeader;

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 40,
      paddingHorizontal: 20,
      borderRadius: 12,
    },
    backButtonContainer: {
        flexDirection: "row",
        flex: 0.3,
    },
    stakeTextContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 5.7,
    },
    stakeText: {
        color: mainTheme.BLACK_COLOR,
        textAlign: 'center', 
        fontSize: 24, 
        fontWeight: '700', 
        fontFamily: 'Helvetica Neue',
        marginLeft: -20,
    }
});