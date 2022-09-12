import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    StatusBar,
    Image,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity, 
    Platform
} from 'react-native';
import Header from './components/Header';
import { mainTheme } from '../../themes/mainTheme';

const KEYBOARD_VERTICAL_OFFSET = 60 + StatusBar.currentHeight;

const CreateUsername = () => {
    const [username, setUsername] = useState<String>('');

    return (
        <View style={styles.container}>
            <Header backTab="Onboarding" />
            <Image
                source={require('../../../assets/create-username.png')}
                style={{ width: '100%'}}
            />
            <View style={styles.headlineContainer}>
                <Text style={styles.pickUsernameText}>Pick your username</Text>
                <Text style={styles.subText}>This is how other users can find you and send you payment</Text>
            </View>

            <KeyboardAvoidingView
                keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={styles.keyboardAvoidingViewStyle}
            >
                <View style={styles.formContainer}>
                    <TouchableOpacity 
                        disabled={username === "" ? true : false} 
                        style={[styles.button, {backgroundColor: username === "" ? mainTheme.DARK_GREY_COLOR : mainTheme.SEA_GREEN}]} 
                        onPress={() => {}}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                    <TextInput 
                        style={styles.inputStyle} 
                        placeholder="@" 
                        onChangeText={(e) => setUsername(e)}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default CreateUsername;

const styles = StyleSheet.create({
    container: {
        backgroundColor: mainTheme.WHITE_COLOR,
        flex: 1,
    },
    headlineContainer: {
        marginLeft: 20, 
        marginTop:30
    },
    pickUsernameText: {
        fontFamily: 'Helvetica Neue', 
        fontWeight: '700', 
        fontSize: 20
    },
    subText: {
        fontSize: 13, 
        color: mainTheme.DARK_GREY_COLOR, 
        marginTop: 15
    },
    formContainer: {
        flexDirection: 'row', 
        width: '90%', 
        alignSelf: 'center'
    },
    button: {
        width: 88, 
        height: 34, 
        borderRadius: 20, 
        justifyContent: 'center', 
        position: 'absolute', 
        zIndex: 9999, 
        right: 10, 
        top: 8
    },
    buttonText: {
        textAlign: 'center', 
        fontFamily: 'Helvetica Neue', 
        fontWeight: '500', 
        fontSize: 12, 
        color: mainTheme.WHITE_COLOR
    },
    inputStyle: {
        width: '100%', 
        height: 50,
        backgroundColor: mainTheme.LIGHT_GREY_COLOR, 
        alignSelf: 'center', 
        borderRadius: 5, 
        paddingLeft: 20
    },
    keyboardAvoidingViewStyle: {
        position: 'absolute',
        bottom: 45,
        width: '100%'
    }
})