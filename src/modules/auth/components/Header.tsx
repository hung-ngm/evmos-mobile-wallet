import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../../common/BackButton';
import useAuthNavigation from '../../navigation/hooks/useAuthNavigation';
import { AuthScreenTypes } from '../../../types/navigation';

export type HeaderProps = {
    backTab: AuthScreenTypes;
}

const Header = ({ backTab }: HeaderProps) => {
    const navigation = useAuthNavigation();
    return (
        <View style={styles.container}>
            <BackButton 
                extraProps={{
                    paddingLeft: 35,
                    marginLeft: 10,
                }}
                onPress={() => navigation.navigate(backTab) } 
            />
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
    }
});