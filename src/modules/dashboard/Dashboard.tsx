import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image,
    SafeAreaView,
    FlatList,
    Button 
} from 'react-native';
import { mainTheme } from '../../themes/mainTheme';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import { FontAwesome5, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import useAppNavigation from '../navigation/hooks/useAppNavigation'; 

const Dashboard = () => {
    const { getLatestPrice } = useStore().priceStore;
    const { user, getUserEvmosBalance } = useStore().userStore;
    const [coinSelected, setCoinSelected] = useState<boolean>(true);
    const [usdBalance, setUsdBalance] = useState<Number>(0);
    const navigation = useAppNavigation();
    
    const getBalance = async () => {
        try {
            await getUserEvmosBalance(user);
            const price = await getLatestPrice({ id: 'evmos' });
            const usd = Number((user.balance * price).toFixed(2));
            console.log(usd);
            setUsdBalance(usd);
        } catch(err) {
            console.log(err);
        } 
    }

    useEffect(() => {
        getBalance();
    }, [])

    const coinsFakeData = [
        {   
            id: 1,
            name: 'Evmos',
            logo: 'https://pbs.twimg.com/profile_images/1507525321322471425/ag3UJYHJ_400x400.png',
            symbol: 'EVMOS',
            balance: Number(user.balance.toFixed(6))
        }
    ];

    const NFTs = [
        {
            id: 1,
            nft: 'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png',
            name: 'Moralis Maharaja'
        },
        {
            id: 2,
            nft: 'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png',
            name: 'Moralis Malevolent'
        },     
    ]

    const renderCoin = ({ item }) => {
        return (
            <TouchableOpacity style={styles.coinsContainer} key={item.name}>
                <Image source={{ uri: item.logo }} style={styles.coinsLogo}/>
                <View style={styles.coinsDetailContainer}>
                    <View style={styles.coinsDetailRow}>
                        <Text style={styles.coinsNameText}>{item.name}</Text>
                        <Text style={styles.coinsToUsdText}>{`$ ${usdBalance}`}</Text>
                    </View>
                    <View style={styles.coinsDetailRow}>
                        <Text style={styles.coinsSymbol}>{item.symbol}</Text>
                        <Text style={styles.coinsAmountText}>{item.balance}</Text>
                    </View> 
                </View>
            </TouchableOpacity>
        )
    } 

    const renderNFT = ({ item }) => (
        <TouchableOpacity key={item.id} style={styles.nftContainer}>
          <Image source={
            { uri: item.nft }
          } style={styles.nftImage}/>
          <Text style={styles.nftName}>{item.name}</Text>
          <Text style={styles.nftCreator}>NFT</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
          <SafeAreaView style={{marginTop: 20}}>
            <Text style={styles.userName}>@Hung</Text>
            <Text style={styles.usdBalance}>{`$${usdBalance}`}</Text>
    
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.sendButton}
                onPress={() => navigation.navigate('Send')}
            >
                <View style={styles.sendButtonIcon}>
                    <MaterialCommunityIcons name="call-made" size={24} color={mainTheme.MEDIUM_SPRING_GREEN} />
                </View>
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.stakeButton}
                onPress={() => navigation.navigate('Stake')}
            >
                <View style={styles.stakeButtonIcon}>
                    <FontAwesome5 name="user-shield" size={24} color={mainTheme.MEDIUM_SPRING_GREEN} />
                </View>
                <Text style={styles.buttonText}>Stake</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.voteButton}
                onPress={() => navigation.navigate('Vote')}
              >
                <View style={styles.voteButtonIcon}>
                    <FontAwesome5 name="vote-yea" size={24} color={mainTheme.MEDIUM_SPRING_GREEN} />
                </View>
                <Text style={styles.buttonText}>Vote</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.swapButton}
                onPress={() => navigation.navigate('Swap')}
            >
                <View style={styles.swapButtonIcon}>
                    <MaterialCommunityIcons name="swap-horizontal" size={24} color={mainTheme.MEDIUM_SPRING_GREEN} />
                </View>
                <Text style={styles.buttonText}>Swap</Text>
              </TouchableOpacity>
              
            </View>
          </SafeAreaView>
    
          <View style={styles.portFolioContainer}>
            <View style={styles.portfolioButtons}>
              <TouchableOpacity 
                style={[
                  styles.coinsButton, 
                  {
                    borderBottomColor: coinSelected ? mainTheme.SEA_GREEN : 'gray',
                    borderBottomWidth: coinSelected ? 3: 0.2 
                  }
                ]} 
                onPress={() => setCoinSelected(true)}>
                <Text style={styles.portfolioButtonsText}>Coins</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.nftButton, 
                  {
                    borderBottomColor: !coinSelected ? mainTheme.SEA_GREEN : 'gray',
                    borderBottomWidth: !coinSelected ? 3: 0.2 
                  } 
                ]} 
                onPress={() => setCoinSelected(false)}>
                <Text style={styles.portfolioButtonsText}>NFTs</Text>
              </TouchableOpacity>
            </View>
            
            <View style={{padding: 10, margin: 10}}>
              {coinSelected ?
                <View>
                  <Text style={styles.tokenLabelText}>Tokens</Text>
                  <FlatList
                    key={'coins'}
                    data={coinsFakeData}
                    renderItem={renderCoin}
                    keyExtractor={item => item.id}
                    style={{marginTop: 10}}
                    contentContainerStyle={{ paddingBottom: 50}}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
                :
                <View>
                    <FlatList
                        key={'tokens'}
                        data={NFTs}
                        renderItem={renderNFT}
                        contentContainerStyle={{alignSelf: 'flex-start', paddingBottom: 50}}
                        numColumns={Math.ceil(NFTs.length / 4)}
                        keyExtractor={nft => nft.id}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
              }
            </View>
            <Button
              title="Transaction Success"
              onPress={() => navigation.navigate('TransactionSuccess')}
            />
          </View>
        </View>
      );
}

export default observer(Dashboard);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '50%',
      backgroundColor: mainTheme.MEDIUM_SPRING_GREEN
    },
    userName: {
      fontSize: 14, 
      color: mainTheme.BLACK_COLOR, 
      textAlign: 'center'
    },
    usdBalance: {
      color: '#fff', 
      textAlign: 'center', 
      fontSize: 36, 
      fontWeight: '700', 
      fontFamily: 'Helvetica Neue', 
      marginTop: 10
    },
    buttonContainer: {
      backgroundColor: mainTheme.SEA_GREEN, 
      width: '75%', 
      height: 47, 
      borderRadius: 15, 
      alignSelf: 'center', 
      marginTop: 20, 
      flexDirection: 'row'
    },
    sendButtonIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
    },
    sendButton: {
      width: '25%', 
      justifyContent: 'center', 
      borderRightColor: '#fff', 
      borderRightWidth: 1
    },
    stakeButtonIcon: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    stakeButton: {
      width: '25%', 
      justifyContent: 'center',
      borderRightColor: '#fff', 
      borderRightWidth: 1
    },
    voteButton: {
      width: '25%', 
      justifyContent: 'center',
      borderRightColor: '#fff', 
      borderRightWidth: 1
    },
    voteButtonIcon: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    swapButton: {
        width: '25%', 
        justifyContent: 'center'
    },
    swapButtonIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
      fontSize: 14, 
      fontWeight: '700', 
      fontFamily: 'Helvetica Neue', 
      color: '#fff', 
      textAlign: 'center'
    },
    tradeButton: {
      width: '33.3%', 
      justifyContent: 'center'
    },
    portFolioContainer: {
      backgroundColor: '#fff', 
      width: '95%', 
      flex: 1, 
      alignSelf: 'center', 
      marginTop: 40, 
      borderTopRightRadius: 20, 
      borderTopLeftRadius: 20
    },
    portfolioButtons: {
      flexDirection: 'row'
    },
    coinsButton: {
      width: '50%',
      justifyContent: 'center', 
      height: 51, 
      borderBottomWidth: 2
    },
    portfolioButtonsText: {
      fontSize: 14, 
      fontWeight: '700', 
      color: '#757575', 
      textAlign: 'center'
    },
    nftButton: {
      width: '50%',
      justifyContent: 'center', 
      height: 51, 
    },
    tokenLabelText: {
      color: 'black',
      fontSize: 10, 
      fontWeight: '700', 
      fontFamily: 'Helvetica Neue'
    },
    coinsContainer: {
      flexDirection: 'row', 
      margin: 10
    },
    coinsLogo: {
      height: 50,
      width: 50
    },
    coinsDetailContainer: {
      justifyContent: 'center', 
      marginLeft: 13
    },
    coinsDetailRow: {
        flexDirection: 'row',
    },
    coinsToUsdText: {
        marginLeft: 160,
        fontFamily: 'Helvetica Neue', 
        fontWeight: '700'
    },
    coinsAmountText: {
        fontFamily: 'Helvetica Neue', 
        fontWeight: '700', 
        fontSize: 10, 
        color: '#AAAAAA',
    },

    coinsNameText: {
      fontFamily: 'Helvetica Neue', 
      fontWeight: '700',
    },
    coinsSymbol: {
      fontFamily: 'Helvetica Neue', 
      fontWeight: '700', 
      fontSize: 10, 
      color: '#AAAAAA',
      width: '76%'
    },
    nftContainer: {
      width: 150, 
      height: 156, 
      marginTop: 25,
      marginBottom: 25, 
      marginLeft: 10, 
      marginRight: 10
    },
    nftImage: {
      width: 150, 
      height: 156
    },
    nftName: { 
      fontWeight: '700', 
      fontSize: 12, 
      fontFamily: 'Helvetica Neue', 
      marginTop: 8
    },
    nftCreator: {
      color: '#AAAAAA',
      fontWeight: '400', 
      fontSize: 12, 
      fontFamily: 'Helvetica Neue', 
      marginTop: 3
    }
});
