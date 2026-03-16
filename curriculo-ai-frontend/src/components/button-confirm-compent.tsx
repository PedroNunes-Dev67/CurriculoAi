import { TouchableOpacity, Text } from "react-native";
import { GlobalStyles } from "../components/style";

type ButtonProps ={
    text: string
}

export function ButtonConfirm({text}:ButtonProps){
    return(
        <TouchableOpacity style={GlobalStyles.botao}>
                <Text style={GlobalStyles.textoBotao}>{text}</Text>
        </TouchableOpacity>
    );
}

export default ButtonConfirm;