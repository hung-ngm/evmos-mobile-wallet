import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import Header from './components/Header';
import { mainTheme } from '../../themes/mainTheme';
import Button from '../common/Button';
import useAppNavigation from '../navigation/hooks/useAppNavigation';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';

const SignIn = () => {
    const { signInWithMnemonic } = useStore().userStore;

    // const res = getPubPrivKeyFromMnemonic("goat kind receive brass left mind paper whisper problem stable rebuild pigeon grain soup casual hamster camp reduce venture raccoon stuff inch amount bracket");

    const [recoveryPhrase, setRecoveryPhrase] = useState<String>();

    return (
        <View style={styles.container}>
            <Header backTab="Onboarding" />
            <Image
                source={require('../../../assets/create-username.png')}
                style={{ width: '100%'}}
            />
            <Text style={styles.signInRecoveryText}>Sign in with Recovery Phrase</Text>
            <View style={styles.subTextContainer}>
                <Text style={{color: '#4F5C6C'}}>This is a 24 gword phrase you were given when you created your previous wallet.</Text>
            </View>
            <TextInput 
                style={styles.card}
                multiline={true}
                selectTextOnFocus={true}
                placeholder="Recovery phrase..."
                onChangeText={phrase => setRecoveryPhrase(phrase)}
                numberOfLines={4}
            />
            <View style={{position: 'absolute', width: '100%', bottom: 45}}>
                <Button 
                    buttonName='Next' 
                    onPress={() => {
                        signInWithMnemonic(recoveryPhrase);
                    }} 
                />
            </View>
        </View>
    )
}

export default observer(SignIn);

const styles = StyleSheet.create({
    container: {
        backgroundColor: mainTheme.WHITE_COLOR,
        flex: 1,
    },
    signInRecoveryText: {
        textAlign: 'center', 
        fontSize: 24, 
        color: '#1F2533',
        fontWeight: '700', 
        fontFamily: 'Helvetica Neue', 
        marginTop: 35

    },
    subTextContainer: {
        width: '90%', 
        alignSelf: 'center', 
        marginTop: 10,
        paddingLeft: 10,
    },
    card: {
        backgroundColor: mainTheme.MEDIUM_GREY_COLOR,
        marginTop: 22, 
        width: '90%',
        height: 93,
        borderColor: '#c2c2c2', 
        borderWidth: 1,
        borderRadius: 5, 
        alignSelf: 'center',
        padding: 20,
        paddingTop: 20,
        fontSize: 15, 
        fontWeight: 'bold'
    },
})