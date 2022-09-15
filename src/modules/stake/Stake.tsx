import React, { useEffect } from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    SafeAreaView,
    FlatList 
} from 'react-native';
import { mainTheme } from '../../themes/mainTheme';
import RootHeader from './components/RootHeader';
import ValidatorPreview from './components/ValidatorPreview';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import useAppNavigation from '../navigation/hooks/useAppNavigation';

const Stake = () => {
    const { fetchValidators, validators, selectValidator } = useStore().validatorStore;
    const navigation = useAppNavigation();
    useEffect(() => {
        fetchValidators();
    }, []);

    const renderValidator = ({ item }) => {
        return (
            <ValidatorPreview
                validator={item}
                onPress={() => {
                    const res = selectValidator(item.operatorAddress);
                    if (res) {
                        navigation.navigate('ValidatorDetails');
                    }
                }}
            />
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <RootHeader backTab="Dashboard" />

            <View style={styles.validatorsLabel}>
                <Text style={styles.validatorActiveText}>GREEN = Active Set</Text>
                <Text style={styles.validatorInactiveText}>ORANGE = Not Active Set</Text>
                <Text style={styles.validatorJailedText}>RED = Jailed</Text>
            </View>
            
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
    validatorsLabel: {
        backgroundColor: mainTheme.WHITE_COLOR,
        width: '95%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    validatorActiveText: {
        fontFamily: 'Helvetica Neue', 
        fontWeight: '700',
        fontSize: 24,
        color: mainTheme.NORMAL_GREEN
    },
    validatorInactiveText: {
        fontFamily: 'Helvetica Neue', 
        fontWeight: '700',
        fontSize: 24,
        color: mainTheme.ORANGE_COLOR,
    },
    validatorJailedText: {
        fontFamily: 'Helvetica Neue', 
        fontWeight: '700',
        fontSize: 24,
        color: mainTheme.RED_COLOR,
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