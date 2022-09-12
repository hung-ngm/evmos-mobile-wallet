import React, { useState } from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    TextInput,
    SafeAreaView,
    ScrollView,
    TouchableOpacity 
} from 'react-native';
import { mainTheme } from '../../themes/mainTheme';
import Header from './components/Header';

const Send = () => {
    const [recipient, setRecipient] = useState<String>('');
    const [amount, setAmount] = useState<Number>(0);
    const [token, setToken] = useState<String>('');
    const [memo, setMemo] = useState<String>('');

    return (
        <SafeAreaView style={styles.container}>
            <Header backTab="Dashboard" />
            <ScrollView style={styles.scrollView}>
                <View style={styles.detailsContainer}>
                    <View style={styles.recipientContainer}>
                        <Text style={styles.label}>Recipient</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(e) => setRecipient(e)}
                            />
                        </View>
                    </View>

                    <View style={styles.tokenContainer}>
                        <Text style={styles.label}>Token</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder='EVMOS'
                                style={styles.inputStyle}
                                onChangeText={(e) => setRecipient(e)}
                            />
                        </View>
                    </View>

                    <View style={styles.amountContainer}>
                        <Text style={styles.label}>Amount</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(e) => setAmount(Number(e))}
                            />
                        </View>
                    </View>

                    <View style={styles.memoContainer}>
                        <Text style={styles.label}>Memo (Optional)</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(e) => setMemo(e)}
                            />
                        </View>
                    </View>

                    <View style={styles.sendButtonContainer}>
                        <TouchableOpacity
                            style={styles.sendButton} 
                            onPress={() => {}}
                        > 
                            <Text style={styles.sendText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                    

                    
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Send;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainTheme.MEDIUM_SPRING_GREEN,
        height: '80%'
    },
    scrollView: {
        backgroundColor: mainTheme.WHITE_COLOR,
        borderRadius: 20,
        width: '95%',
        alignSelf: 'center',
    },
    detailsContainer: {
        alignSelf: 'center',
        paddingLeft: 10,
        backgroundColor: mainTheme.WHITE_COLOR,
        height: '95%',
        width: '95%',
        flex: 1,
        borderRadius: 20
    },
    label: {
        color: mainTheme.BLACK_COLOR,
        fontFamily: 'Helvetica Neue',
        fontSize: 16,
        fontWeight: "600"
    },
    recipientContainer: {
        paddingTop: 10
    },
    inputContainer: {
        paddingTop: 15,
    },
    inputStyle: {
        width: '95%',
        height: 40,
        backgroundColor: mainTheme.LIGHT_GREY_COLOR,
        borderRadius: 5,
        paddingLeft: 5,
    },
    tokenContainer: {
        paddingTop: 15,
    },
    amountContainer: {
        paddingTop: 15,
    },
    memoContainer: {
        paddingTop: 15,
    },
    sendButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -20,
        paddingTop: 120, 
    },
    sendButton: {
        marginTop: 30,
        backgroundColor: mainTheme.SEA_GREEN,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderRadius: 15,
    }, 
    sendText: {
        color: mainTheme.BLACK_COLOR,
        fontFamily: 'Helvetica Neue',
        fontSize: 24,
        fontWeight: "600"
    }
})