import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity 
} from 'react-native';
import { mainTheme } from '../../../themes/mainTheme';
import AppHeader from './AppHeader';

const StakeDetails = () => {
    const [amount, setAmount] = useState<string>('');
    const [memo, setMemo] = useState<string>('');

    const handleStake = () => {

    }

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader backTab="ValidatorDetails" title="Stake" />
            <ScrollView style={styles.scrollView}>
                <View style={styles.detailsContainer}>
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

                    <View style={styles.stakeButtonContainer}>
                        <TouchableOpacity
                            style={styles.stakeButton} 
                            onPress={() => { handleStake() }}
                        > 
                            <Text style={styles.stakeText}>Send</Text>
                        </TouchableOpacity>
                    </View>   
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default StakeDetails;

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
    tokenContainer: {
        paddingTop: 15,
    },
    label: {
        color: mainTheme.BLACK_COLOR,
        fontFamily: 'Helvetica Neue',
        fontSize: 16,
        fontWeight: "600"
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
    amountContainer: {
        paddingTop: 15,
    },
    memoContainer: {
        paddingTop: 15,
    },
    stakeButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -20,
        paddingTop: 120, 
    },
    stakeButton: {
        marginTop: 30,
        backgroundColor: mainTheme.SEA_GREEN,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderRadius: 15,
    },
    stakeText: {
        color: mainTheme.BLACK_COLOR,
        fontFamily: 'Helvetica Neue',
        fontSize: 24,
        fontWeight: "600"
    }
})