import React from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { mainTheme } from '../../themes/mainTheme';

export type BackButtonProps = {
  name?: string;
  onPress: () => void;
  extraProps? : object;
}

const BackButton = ({ name, onPress, extraProps } : BackButtonProps) => {
    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            style={{
              ...extraProps,
            }}
        >
            <View style={{
                flexDirection: 'row',
            }}>
                <Text style={{
                    color: mainTheme.SEA_GREEN,
                    fontSize: 18,
                }}>{name}</Text>
                <Icon name="left" size={25} color={mainTheme.SEA_GREEN} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default BackButton;