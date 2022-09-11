import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image,
    SafeAreaView,
    FlatList 
} from 'react-native';

const Dashboard = () => {
    const [coinSelected, setCoinSelected] = useState<boolean>(true);

    const coinsFakeData = [
        {   
            id: 1,
            name: 'Evmos',
            logo: 'https://pbs.twimg.com/profile_images/1507525321322471425/ag3UJYHJ_400x400.png',
            symbol: 'EVMOS'
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
                    <Text style={styles.coinsNameText}>{item.name}</Text>
                    <Text style={styles.coinsSymbol}>{item.symbol}</Text>
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
            <Text style={styles.usdBalance}>US$0.00</Text>
    
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.sendButton} >
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.receiveButton}>
                <Text style={styles.buttonText}>Receive</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
    
          <View style={styles.portFolioContainer}>
            <View style={styles.portfolioButtons}>
              <TouchableOpacity 
                style={[
                  styles.coinsButton, 
                  {
                    borderBottomColor: coinSelected ? '#1652F0': 'gray',
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
                    borderBottomColor: !coinSelected ? '#1652F0': 'gray',
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
          </View>
        </View>
      );
}

export default Dashboard;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '50%',
      backgroundColor: '#1652F0'
    },
    userName: {
      fontSize: 14, 
      color: '#B5CBFF', 
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
      backgroundColor: '#0A49EE', 
      width: '75%', 
      height: 47, 
      borderRadius: 15, 
      alignSelf: 'center', 
      marginTop: 20, 
      flexDirection: 'row'
    },
    sendButton: {
      width: '50%', 
      justifyContent: 'center', 
      borderRightColor: '#fff', 
      borderRightWidth: 1
    },
    receiveButton: {
      width: '50%', 
      justifyContent: 'center'
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
      color: 'white',
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
    coinsNameText: {
      fontFamily: 'Helvetica Neue', 
      fontWeight: '700'
    },
    coinsSymbol: {
      fontFamily: 'Helvetica Neue', 
      fontWeight: '700', 
      fontSize: 10, 
      color: '#AAAAAA'
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
