import React  from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { mainTheme } from '../../themes/mainTheme';

export type ButtonProps = {
    buttonName: string;
    onPress: () => void;
}

const Button = ({ buttonName, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}> 
      <Text style={styles.buttonText}>{buttonName}</Text>
    </TouchableOpacity>
  );
};
export default Button;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: mainTheme.BLUE_COLOR, 
    width: '90%', 
    height: 58, 
    borderRadius: 15, 
    justifyContent: 'center'
  },
  buttonText: {
    color: mainTheme.WHITE_COLOR, 
    fontSize: 18, 
    textAlign: 'center'
  },
});
