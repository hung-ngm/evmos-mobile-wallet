import React, { useCallback, useEffect, useState } from 'react';
import { 
    View, 
    StyleSheet, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    Linking,
    Alert 
} from 'react-native';
import { mainTheme } from '../../themes/mainTheme';
import { observer } from 'mobx-react-lite';
import useRootNavigation from '../navigation/hooks/useRootNavigation';
import useAppNavigation from '../navigation/hooks/useAppNavigation';
import Header from './components/Header';
import { FontAwesome5 } from '@expo/vector-icons';
import { useStore } from '../../stores/store';
import { TxType } from '../../types/params';

const TransactionSuccess = () => {
    const RootNav = useRootNavigation();
    const AppNav = useAppNavigation();
    const { lastTx, sendMintscan, stakeMintscan } = useStore().userStore;
    const { swapEvmoscan } = useStore().swapStore;
    const [explorerText, setExplorerText] = useState<string>('View on Mintscan');
    const [explorerUrl, setExplorerUrl] = useState<string>('');

    useEffect(() => {
        if (lastTx && lastTx === TxType.SEND) {
            setExplorerText('View on Mintscan');
            setExplorerUrl(sendMintscan);
        } else if (lastTx && lastTx === TxType.STAKE) {
            setExplorerText('View on Mintscan');
            setExplorerUrl(stakeMintscan);
        } else if (lastTx && lastTx === TxType.SWAP) {
            setExplorerText('View on Evmoscan');
            setExplorerUrl(swapEvmoscan);
        }
    }, [explorerText, explorerUrl]);
    

    const OpenExternalURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
            const supported = await Linking.canOpenURL(url);

            if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url]);
        return (
            <TouchableOpacity
                style={styles.explorerButton}
                onPress={handlePress}
            > 
                <Text style={styles.explorerText}>{children}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.transactionViewContainer}>
                <View style={styles.successMsgContainer}>
                    <View style={styles.successIconContainer}>
                        <FontAwesome5 name="check-circle" size={150} color={mainTheme.DARK_GREEN} />
                    </View>
                    <View style={styles.txSuccessContainer}>
                        <Text style={styles.txSuccessText}>Transaction Successful</Text>
                    </View>
                    <View style={styles.congratsMsgContainer}>
                        <Text style={styles.successMsg}>Congratulations</Text>
                    </View>
                    
                    <View style={styles.successMsgDetail}>
                        <Text style={styles.successMsg}>Your transaction has been completed</Text>
                        <Text style={styles.successMsg}>and confirmed by the blockchain</Text>
                    </View>
                    
                </View>
                <View style={styles.confirmButtonContainer}>
                    <TouchableOpacity
                        style={styles.confirmButton} 
                        onPress={() => { RootNav.navigate('Dashboard') }}
                    > 
                        <Text style={styles.confirmText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.explorerButtonContainer}>
                    <OpenExternalURLButton
                        url={explorerUrl}
                    >
                        {explorerText}
                    </OpenExternalURLButton>
                </View>   
            </View>
        </SafeAreaView>
    )
}

export default observer(TransactionSuccess);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainTheme.MEDIUM_SPRING_GREEN,
        height: '80%'
    },
    transactionViewContainer: {
        backgroundColor: mainTheme.WHITE_COLOR,
        borderRadius: 20,
        width: '95%',
        alignSelf: 'center',
        flex: 1,
    },
    confirmButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 120, 
    },
    confirmButton: {
        marginTop: 15,
        backgroundColor: mainTheme.SEA_GREEN,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderRadius: 15,
    },
    confirmText: {
        color: mainTheme.BLACK_COLOR,
        fontFamily: 'Helvetica Neue',
        fontSize: 24,
        fontWeight: "600"
    },
    successMsgContainer: {
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    successMsg: {
        
    },
    successMsgDetail: {
        textAlign: 'center',
        paddingTop: 20,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    congratsMsgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    txSuccessContainer: {
        paddingTop: 50,
    },
    txSuccessText: {
        fontWeight: 'bold',
        fontSize: 25
    },
    successIconContainer: {
        paddingTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    explorerButtonContainer: {
        paddingTop: 10,
        width: '90%',
        alignSelf: 'center',
        
    },
    explorerButton: {
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    explorerText: {
        fontSize: 18, 
        fontFamily: 'Helvetica Neue', 
        textAlign: 'center', 
        color: mainTheme.SEA_GREEN
    }

})