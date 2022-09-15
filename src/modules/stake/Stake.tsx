import React, { useEffect } from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    SafeAreaView,
    FlatList 
} from 'react-native';
import { mainTheme } from '../../themes/mainTheme';
import Header from './components/Header';
import ValidatorPreview from './components/ValidatorPreview';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';

const Stake = () => {
    const { fetchValidators, validators } = useStore().validatorStore;
    useEffect(() => {
        fetchValidators();
    }, []);


    const validatorsFakeData = [
        {
            id: '1',
            name: 'Disperze',
            operatorAddress: '',
            logo: 'https://github.com/cosmostation/cosmostation_token_resource/blob/master/moniker/evmos/evmosvaloper1sp9frqwep52chwavv3xd776myy8gyyvkv5uysl.png?raw=true',
            votingPower: 5750526,
            commissionPercentage: 5,
            APRPercentage: 188.26
        },
        {
            id: '2',
            name: 'OrbitalApes.com',
            operatorAddress: '',
            logo: 'https://github.com/cosmostation/cosmostation_token_resource/blob/master/moniker/evmos/evmosvaloper1mx9nqk5agvlsvt2yc8259nwztmxq7zjqep5khu.png?raw=true',
            votingPower: 5538823,
            commissionPercentage: 5,
            APRPercentage: 188.26
        },
        {
            id: '3',
            name: 'Cosmostation',
            operatorAddress: '',
            logo: 'https://github.com/cosmostation/cosmostation_token_resource/blob/master/moniker/evmos/evmosvaloper1f35jtt5m68zlxkpxn75403vv82cchahqvfsrup.png?raw=true',
            votingPower: 5150332,
            commissionPercentage: 5,
            APRPercentage: 188.26
        }
    ]

    const renderValidator = ({ item }) => {
        return (
            <ValidatorPreview
                validator={item}
                onPress={() => {}}
            />
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <Header backTab="Dashboard" />
            
            <View style={styles.validatorsContainer}>
                <FlatList
                    key={'validators'}
                    data={validators}
                    renderItem={renderValidator}
                    keyExtractor={item => item.id}
                    style={{ marginTop: 10 }}
                    contentContainerStyle={{ paddingBottom: 50}}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            
        </SafeAreaView>
    )
}

export default observer(Stake);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '80%',
        backgroundColor: mainTheme.MEDIUM_SPRING_GREEN
    },
    validatorsContainer: {
        backgroundColor: mainTheme.WHITE_COLOR,
        width: '95%',
        flex: 1,
        alignSelf: 'center',
        marginTop: 15,
        borderTopRightRadius: 20, 
        borderTopLeftRadius: 20
    }
})