import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput, TextInputProps, View } from 'react-native';
import { GlobalStyles } from "../components/style";

type inputProps= TextInputProps & {
    icone:any,
    
}

export function Input({icone, ...rest}: inputProps){
    return(
        <View style={GlobalStyles.inputTS}>
            <View
                style={{backgroundColor: "#3498db", borderRadius: 50, padding: 8, marginRight: 10}}>
            <MaterialCommunityIcons name = {icone} size={20} color="white" />
            </View>
            <TextInput
                style={GlobalStyles.inputTextDentro}
                {...rest}>
            </TextInput>
      </View>
    );
}

export default Input;