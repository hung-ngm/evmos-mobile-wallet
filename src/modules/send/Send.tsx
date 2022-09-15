import React, { useState, useEffect } from 'react';
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
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';

const Send = () => {
    const [recipient, setRecipient] = useState<string>('');
    const [amount, setAmount] = useState<string>();
    const [token, setToken] = useState<String>('');
    const [memo, setMemo] = useState<string>('');
    const [pubkey, setPubkey] = useState<string>();
    const [sequence, setSequence] = useState<Number>();
    const [accountNumber, setAccountNumber] = useState<Number>();
    const { user, getAccountDetails, sendToRecipient, getMessageSend } = useStore().userStore;

    const getAccountInformation = async () => {
        const data = await getAccountDetails(user);
        const pubkey = data['account']['base_account']['pub_key']['key'];
        const accountNumber = Number(data['account']['base_account']['account_number']);
        const sequence = Number(data['account']['base_account']['sequence']);
        setPubkey(pubkey);
        setAccountNumber(accountNumber);
        setSequence(sequence);
    }

    useEffect(() => {
        getAccountInformation();
    }, []);

    const handleSend = async () => {
        try {
            const chain = {
                chainId: 9000,
                cosmosChainId: 'evmos_9000-1',
            }
            const sender = {
                accountAddress: user.address,
                sequence: sequence,
                accountNumber: accountNumber,
                pubkey: pubkey
            }
            const fee = {
                amount: [{ denom: 'aevmos', amount: '500' }],
                gas: '200000',
            }
    
            const amountParams = [
                {
                    denom: "aevmos",
                    amount: amount
                }
            ]
            await sendToRecipient(user, recipient, amount);
        } catch (err) {
            console.log('err here', err);
        }
        
    }
    

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
                            />
                        </View>
                    </View>

                    <View style={styles.amountContainer}>
                        <Text style={styles.label}>Amount</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(e) => setAmount(e)}
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
                            onPress={() => { handleSend() }}
                        > 
                            <Text style={styles.sendText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                    

                    
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default observer(Send);

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