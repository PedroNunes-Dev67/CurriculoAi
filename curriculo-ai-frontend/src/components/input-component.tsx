import {View, TextInput} from 'react-native';
import { GlobalStyles } from "../components/style";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type inputProps={
    icone:any,
    placeholder:string,
    placeholderTextColor:any,
    keyboardType:any,
    autoCapitalize:any,
    secureTextEntry?: boolean,
    value?:string,
    onChangeText?:(text:string) => void
}

export function Input({icone,placeholder,placeholderTextColor,keyboardType,autoCapitalize,secureTextEntry,value,onChangeText}: inputProps){
    return(
        <View style={GlobalStyles.inputTS}>
            <View
                style={{backgroundColor: "#3498db", borderRadius: 50, padding: 8, marginRight: 10,}}>
            <MaterialCommunityIcons name = {icone} size={20} color="white" />
            </View>
            <TextInput
            style={GlobalStyles.inputTextDentro}
            placeholder = {placeholder}
            placeholderTextColor = {placeholderTextColor}
            keyboardType = {keyboardType}
            secureTextEntry = {secureTextEntry}
            autoCapitalize = {autoCapitalize}
            value = {value}
            onChangeText = {onChangeText}
            ></TextInput>
      </View>
    );
}

export default Input;