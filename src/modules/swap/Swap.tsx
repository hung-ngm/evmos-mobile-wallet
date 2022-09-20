import React, { useState, useEffect } from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import { mainTheme } from '../../themes/mainTheme';
import Header from './components/Header';
import ModalDropdown from 'react-native-modal-dropdown';
import { AntDesign } from '@expo/vector-icons'; 
import { TokenWithContract } from '../../types/token';
import { WEVMOS, EMO, ATOM } from '../../utils/tokens';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';
import useAppNavigation from '../navigation/hooks/useAppNavigation';

const Swap = () => {
    // Don't do this
    const evmosUri = 'https://pbs.twimg.com/profile_images/1507525321322471425/ag3UJYHJ_400x400.png';
    const [fromToken, setFromToken] = useState<string>('WEVMOS');
    const [fromTokenUri, setFromTokenUri] = useState<string>(evmosUri);
    const [toToken, setToToken] = useState<string>('WEVMOS');
    const [fromAmount, setFromAmount] = useState<string>('0');
    const [toAmount, setToAmount] = useState<string>('0');
    const [toTokenUri, setToTokenUri] = useState<string>(evmosUri);
    const [fromTokenContract, setFromTokenContract] = useState<TokenWithContract>();
    const [toTokenContract, setToTokenContract] = useState<TokenWithContract>();
    const { swap, getTradeAmount } = useStore().swapStore;
    const navigation = useAppNavigation();
    
    const handleSwap = async () => {
        try {
            const res = await swap(fromAmount, fromTokenContract, toTokenContract);
            console.log(res);
            if (res) {
                navigation.navigate('TransactionSuccess');
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleFromAmountChanged = async (e: string) => {
        setFromAmount(e);
        try {
            if (fromTokenContract && toTokenContract) {
                const tradeAmount = await getTradeAmount(fromTokenContract.token, toTokenContract.token, e);
                setToAmount(tradeAmount);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleToAmountChanged = async (e: string) => {
        setToAmount(e);
        try {
            if (fromTokenContract && toTokenContract) {
                const tradeAmount = await getTradeAmount(toTokenContract.token, fromTokenContract.token, e);
                setFromAmount(tradeAmount);
            }
        } catch (err) {
            console.log(err);
        }
        
    }

    const swapCoinsFakeData = [
        {
            id: 1,
            name: 'Wrapped Evmos',
            logo: 'https://pbs.twimg.com/profile_images/1507525321322471425/ag3UJYHJ_400x400.png',
            symbol: 'WEVMOS',
            contract: WEVMOS
        },
        {
            id: 2,
            name: 'EvmoSwap Token',
            logo: 'https://568183231-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fzlu0zRYHFkfFHHoVuf4k%2Fuploads%2FE1jArb2AjARyg20sJsSO%2Flogox512-colorful.png?alt=media&token=fd4b0b63-2ffc-4049-bf1e-537af2072550',
            symbol: 'EMO',
            contract: EMO
        },
        {
            id: 3,
            name: 'Atom',
            logo: 'https://cryptologos.cc/logos/cosmos-atom-logo.png',
            symbol: 'ATOM',
            contract: ATOM
        }
    ];

    
    return (
        <SafeAreaView style={styles.container}>
            <Header backTab="Dashboard" />
            <View style={styles.swapViewContainer}>
                <View style={styles.detailsContainer}>
                    <View style={styles.swapFromContainer}>
                        <Text style={styles.label}>Swap From</Text>
                        <View style={styles.inputContainer}>
                            <View style={styles.dropDownContainer}>
                                <ModalDropdown 
                                    options={swapCoinsFakeData}
                                    dropdownStyle={styles.dropdownStyle}
                                    onSelect={(idx, option) => {
                                        setFromToken(option.symbol);
                                        setFromTokenUri(option.logo);
                                        setFromTokenContract(option.contract);
                                    }}
                                    renderRow={(option, index, isSelected) => {
                                        return (
                                            <View
                                                style={styles.dropdownItem}
                                            >
                                                <Image source={{ uri: option.logo }} style={styles.coinsLogo}/>
                                                <Text style={styles.dropdownItemTokenName}>{option.symbol}</Text>
                                            </View>
                                        )
                                    }}
                                >
                                    <View style={styles.dropdownItem}>
                                        <Image source={{ uri: fromTokenUri }} style={styles.coinsLogo}/>
                                        <Text style={styles.dropdownItemTokenName}>{fromToken}</Text>
                                        <AntDesign
                                            style={{ paddingLeft: 10 }}
                                            name="caretdown" 
                                            size={20} 
                                            color={mainTheme.DARK_GREY_COLOR} 
                                        />
                                    </View>
                                </ModalDropdown>

                            </View>
                            <View style={styles.coinInputContainer}>
                                <TextInput
                                    style={styles.inputStyle}
                                    value={fromAmount}
                                    placeholder="0"
                                    placeholderTextColor="#000"
                                    onChangeText={handleFromAmountChanged}
                                />
                            </View>
                            
                        </View>
                    </View>

                    <View style={styles.swapToContainer}>
                    <Text style={styles.label}>Swap To</Text>
                        <View style={styles.inputContainer}>
                            <View style={styles.dropDownContainer}>
                                <ModalDropdown 
                                    options={swapCoinsFakeData}
                                    onSelect={(idx, option) => {
                                        setToToken(option.symbol);
                                        setToTokenUri(option.logo);
                                        setToTokenContract(option.contract);
                                    }}
                                    dropdownStyle={styles.dropdownStyle}
                                    renderRow={(option, index, isSelected) => {
                                        return (
                                            <View
                                                style={styles.dropdownItem}
                                            >
                                                <Image source={{ uri: option.logo }} style={styles.coinsLogo}/>
                                                <Text style={styles.dropdownItemTokenName}>{option.symbol}</Text>
                                            </View>
                                        )
                                    }}
                                >
                                    <View style={styles.dropdownItem}>
                                        <Image source={{ uri: toTokenUri }} style={styles.coinsLogo}/>
                                        <Text style={styles.dropdownItemTokenName}>{toToken}</Text>
                                        <AntDesign
                                            style={{ paddingLeft: 10 }}
                                            name="caretdown" 
                                            size={20} 
                                            color={mainTheme.DARK_GREY_COLOR} 
                                        />
                                    </View>
                                </ModalDropdown>

                            </View>
                            <View style={styles.coinInputContainer}>
                                <TextInput
                                    style={styles.inputStyle}
                                    value={toAmount}
                                    placeholder="0"
                                    placeholderTextColor="#000"
                                    onChangeText={handleToAmountChanged}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.swapButtonContainer}>
                        <TouchableOpacity
                            style={styles.swapButton} 
                            onPress={async () => {
                                await handleSwap();
                            }}
                        > 
                            <Text style={styles.swapText}>Swap</Text>
                        </TouchableOpacity>
                    </View>                    
                </View>
            </View>
        </SafeAreaView>
    )
}

export default observer(Swap);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainTheme.MEDIUM_SPRING_GREEN,
        height: '80%',
    },
    swapViewContainer: {
        backgroundColor: mainTheme.WHITE_COLOR,
        borderRadius: 20,
        width: '95%',
        alignSelf: 'center',
        flex: 1,
    },
    dropdownStyle: {
        width: 100,
        height: 100,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    dropdownItemTokenName: {
        paddingLeft: 5,
    },
    coinsLogo: {
        height: 20,
        width: 20,
        borderRadius: 10,
    },
    coinsFromDropdown: {
        flexDirection: 'row',
        width: '50%',
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
    swapFromContainer: {
        paddingTop: 15
    },
    inputContainer: {
        paddingTop: 15,
        flexDirection: 'row',
    },
    dropDownContainer: {
        width: '40%',
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    coinInputContainer: {
        width: '60%',
        color: mainTheme.BLACK_COLOR,
    },
    inputStyle: {
        width: '95%',
        height: 60,
        backgroundColor: mainTheme.WHITE_COLOR,
        borderRadius: 5,
        paddingLeft: 5,
        color: mainTheme.BLACK_COLOR,
    },
    swapToContainer: {
        paddingTop: 15,
    },
    label: {
        color: mainTheme.BLACK_COLOR,
        fontFamily: 'Helvetica Neue',
        fontSize: 16,
        fontWeight: "600"
    },
    swapButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -20,
        paddingTop: 120, 
    },
    swapButton: {
        marginTop: 30,
        backgroundColor: mainTheme.SEA_GREEN,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderRadius: 15,
    },
    swapText: {
        color: mainTheme.BLACK_COLOR,
        fontFamily: 'Helvetica Neue',
        fontSize: 24,
        fontWeight: "600"
    }
})