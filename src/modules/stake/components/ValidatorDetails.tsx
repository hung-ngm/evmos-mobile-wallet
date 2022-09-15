import React, { useCallback } from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    Button,
    TouchableOpacity,
    ScrollView 
} from 'react-native';
import AppHeader from './AppHeader';
import { mainTheme } from '../../../themes/mainTheme';
import { useStore } from '../../../stores/store';

const ValidatorDetails = () => {
    const { currentValidator } = useStore().validatorStore;
    const { 
        logo, 
        jailed, 
        activeSet, 
        name,
        operatorAddress,
        commissionPercentage,
        votingPower,
        website,
        description
    } = currentValidator;

    const handleStake = () => {

    }

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
        return <Button title={children} onPress={handlePress} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader backTab="Stake" />
            <ScrollView style={styles.validatorInfoContainer}>
                <View style={styles.validatorNameContainer}>
                    <Image 
                        source={{ uri: logo }} 
                        style={styles.validatorLogo} 
                    />
                    <View style={styles.validatorName}>
                        <Text
                            style={
                                jailed ? styles.validatorNameJailedText : (
                                    activeSet ? styles.validatorNameActiveText : styles.validatorNameInactiveText
                                )
                            }
                        >
                            {name}
                        </Text>
                    </View>
                </View>
                    
                <View style={styles.mintscanButtonContainer}>
                    <OpenExternalURLButton
                        url={`https://mintscan.io/evmos/validators/${operatorAddress}`}
                    >
                        View validator on Mintscan
                    </OpenExternalURLButton>
                </View>

                {website && (
                    <View style={styles.websiteContainer}>
                        <View style={styles.websiteTextContainer}>
                            <Text style={styles.websiteText}>Website</Text>
                        </View>
                        
                        <OpenExternalURLButton
                            url={website}
                        >
                            {website}
                        </OpenExternalURLButton>
                    </View>
                )}

                <View style={styles.validatorAddressContainer}>
                    <Text style={styles.validatorAddressLabel}>Address</Text>
                    <Text style={styles.validatorAddress}>{operatorAddress}</Text>
                </View>

                <View style={styles.commissionVotingPowerContainer}>
                    <View style={styles.commissionContainer}>
                        <Text style={styles.commissionLabel}>Commission</Text>
                        <Text style={styles.commissionText}>{`${commissionPercentage}%`}</Text>
                    </View>

                    <View style={styles.votingPowerContainer}>
                        <Text style={styles.votingPowerLabel}>Voting Power</Text>
                        <Text style={styles.votingPowerText}>{votingPower.toLocaleString()}</Text>
                    </View>
                </View>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionLabel}>Description</Text>
                    <Text style={styles.descriptionText}>{description}</Text>
                </View>

                <View style={styles.stakeButtonContainer}>
                    <TouchableOpacity
                        style={styles.stakeButton} 
                        onPress={() => { handleStake() }}
                    > 
                        <Text style={styles.stakeText}>Stake</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ValidatorDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainTheme.MEDIUM_SPRING_GREEN,
        height: '80%'
    },
    validatorInfoContainer: {
        backgroundColor: mainTheme.WHITE_COLOR,
        width: '99%',
        flex: 1,
        alignSelf: 'center',
        marginTop: 15,
        borderTopRightRadius: 20, 
        borderTopLeftRadius: 20
    },
    validatorNameContainer: {
        paddingTop: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    validatorLogo: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    validatorName: {
        paddingLeft: 20,
    },
    validatorNameActiveText: {
        fontFamily: 'Helvetica Neue', 
        fontWeight: '700',
        color: mainTheme.NORMAL_GREEN,
        fontSize: 24
    },
    validatorNameInactiveText: {
        fontFamily: 'Helvetica Neue', 
        fontWeight: '700',
        color: mainTheme.ORANGE_COLOR,
        fontSize: 24
    },
    validatorNameJailedText: {
        fontFamily: 'Helvetica Neue', 
        fontWeight: '700',
        color: mainTheme.RED_COLOR,
        fontSize: 24
    },
    validatorAddressContainer: {
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    validatorAddressLabel: {
        fontFamily: 'Helvetica Neue', 
        fontWeight: '700',
        fontSize: 18,
    },
    validatorAddress: {
        paddingTop: 15,
        fontFamily: 'Helvetica Neue', 
    },
    mintscanButtonContainer: {
        paddingTop: 15,
    },
    stakeButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60, 
    },
    stakeButton: {
        marginTop: 30,
        backgroundColor: mainTheme.SEA_GREEN,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        borderRadius: 15,
    },
    stakeText: {
        color: mainTheme.BLACK_COLOR,
        fontFamily: 'Helvetica Neue',
        fontSize: 24,
        fontWeight: "600"
    },
    commissionVotingPowerContainer: {
        flexDirection: 'row',
        paddingTop: 15,
    },
    commissionContainer: {
        width: '50%',
        alignItems: 'center',
    },
    votingPowerContainer: {
        width: '50%',
        alignItems: 'center'
    },
    commissionLabel: {
        fontFamily: 'Helvetica Neue', 
        fontWeight: '700',
        fontSize: 18,
    },
    commissionText: {
        paddingTop: 10,
        fontFamily: 'Helvetica Neue', 
    },
    votingPowerLabel: {
        fontFamily: 'Helvetica Neue', 
        fontWeight: '700',
        fontSize: 18,
    },
    votingPowerText: {
        paddingTop: 10,
        fontFamily: 'Helvetica Neue', 
    },
    websiteContainer: {
        paddingTop: 15,
    },
    websiteTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    websiteText: {
        paddingTop: 10,
        fontFamily: 'Helvetica Neue', 
        fontWeight: '700',
        fontSize: 18,
    },
    descriptionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    descriptionLabel: {
        paddingTop: 10,
        fontFamily: 'Helvetica Neue', 
        fontWeight: '700',
        fontSize: 18,
    },
    descriptionText: {
        paddingTop: 10,
        fontFamily: 'Helvetica Neue',
    }
})