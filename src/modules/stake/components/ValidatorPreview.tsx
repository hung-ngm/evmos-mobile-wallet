import React from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    TouchableOpacity,
    Image 
} from 'react-native';
import { mainTheme } from '../../../themes/mainTheme';
import { Validator } from '../../../types/validator';

interface ValidatorPreviewProps {
    validator: Validator;
    onPress: () => void;
}

const ValidatorPreview = ({ validator, onPress }: ValidatorPreviewProps) => {
    const { id, name, logo, commissionPercentage, votingPower, APRPercentage } = validator;

    return (
        <TouchableOpacity
            style={styles.container} 
            key={id}
            onPress={onPress}
        >   
            <View style={styles.validatorIdContainer}>
                <Text style={styles.validatorId}>{validator.id}</Text>
            </View>
            <Image 
                source={{ uri: logo }} 
                style={styles.validatorLogo} />

            <View style={styles.validatorInfoContainer}>
                <View style={styles.validatorNameContainer}>
                    <Text style={styles.validatorNameText}>{name}</Text>
                </View>
                <View style={styles.validatorVotingPowerContainer}>
                    <Text style={styles.validatorVotingPowerText}>{votingPower.toLocaleString()}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ValidatorPreview;

const styles = StyleSheet.create({
    container: {
        backgroundColor: mainTheme.WHITE_COLOR,
        flexDirection: 'row',
        margin: 10,
        borderRadius: 12,
        borderBottomWidth: 1,
        paddingVertical: 10,
        width: '95%',
    },
    validatorIdContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    validatorId: {
        fontFamily: 'Helvetica Neue', 
        fontWeight: '700',
        fontSize: 16,
    },
    validatorLogo: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    validatorInfoContainer: {
        paddingLeft: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    validatorNameContainer: {
        width: '65%',
        textAlign: 'left',
    },
    validatorNameText: {
        fontFamily: 'Helvetica Neue', 
        fontWeight: '700'
    },
    validatorVotingPowerContainer: {

    },
    validatorVotingPowerText: {
        fontFamily: 'Helvetica Neue', 
        fontWeight: '700'
    }
})