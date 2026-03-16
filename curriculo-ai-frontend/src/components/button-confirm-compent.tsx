import { TouchableOpacity, Text } from "react-native";
import { GlobalStyles } from "../components/style";

type ButtonProps ={
    text: string,
    onPress?: () => void 
}

export function ButtonConfirm({text, onPress}:ButtonProps){
    return(
        <TouchableOpacity style={GlobalStyles.botao} onPress={onPress}>
                <Text style={GlobalStyles.textoBotao}>{text}</Text>
        </TouchableOpacity>
    );
}

export default ButtonConfirm;