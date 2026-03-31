import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { GlobalStyles } from "../components/style";

type ButtonProps =  TouchableOpacityProps & {
    text: string,
}

export default function ButtonConfirm({text, ...rest}:ButtonProps){
    return(
        <TouchableOpacity style={GlobalStyles.botao} {...rest}>
                <Text style={GlobalStyles.textoBotao}>{text}</Text>
        </TouchableOpacity>
    );
}

