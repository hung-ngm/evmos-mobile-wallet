import React from 'react';
import { 
    View, 
    StyleSheet, 
    Text,
    SafeAreaView,
    TouchableOpacity 
} from 'react-native';
import { mainTheme } from '../../themes/mainTheme';
import Button from '../common/Button';
import useAuthNavigation from '../navigation/hooks/useAuthNavigation';

const Onboarding = () => {
    const navigation = useAuthNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>EVMOS</Text>
                <Text style={styles.logoSubtext}>Wallet</Text>
            </View>
            <View style={styles.subTextContainer}>
                <Text style={styles.subText}>A wallet for EVMOS blockchain</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    onPress={() => { navigation.navigate('CreateUsername') }}
                    buttonName={'Create new wallet'} 
                />
                <TouchableOpacity
                    style={{marginTop: 30}} 
                    onPress={() => navigation.navigate('SignIn')}
                > 
                    <Text style={styles.importWalletText}>Import Existing Wallet</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainTheme.WHITE_COLOR
    },
    logoContainer: {
        flexDirection: 'row', 
        alignSelf: 'center', 
        marginTop: '50%'
    },
    logoText: {
        color: mainTheme.BLUE_COLOR, 
        fontSize: 40, 
        marginRight: 10,  
        fontWeight: 'bold'
    },
    logoSubtext: {
        color: mainTheme.BLACK_COLOR, 
        fontSize: 35, 
        marginTop: 5, 
        fontWeight: 'bold'
    },
    subTextContainer: {
        width: '70%', 
        alignSelf: 'center', 
        marginTop: 17
    },
    subText: {
        fontSize: 18, 
        fontWeight: '400', 
        fontFamily: 'Helvetica Neue',
        color: mainTheme.DARK_GREY_COLOR,
        textAlign: 'center'
    },
    buttonContainer: {
        position: 'absolute', 
        bottom: 100, 
        width: '100%'
    },
    importWalletText: {
        fontSize: 18, 
        fontFamily: 'Helvetica Neue', 
        textAlign: 'center', 
        color: mainTheme.BLUE_COLOR
    }
})

export default Onboarding;