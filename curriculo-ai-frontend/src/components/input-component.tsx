import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from 'react';
import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { GlobalStyles } from "../components/style";

type inputProps= TextInputProps & {
    icone?:any,
    
}

export function Input({ icone, secureTextEntry, ...rest }: inputProps) {

  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={GlobalStyles.inputTS}>
      
      {icone && (
        <View
          style={{
            backgroundColor: "#3498db",
            borderRadius: 50,
            padding: 8,
            marginRight: 10
          }}
        >
          <MaterialCommunityIcons name={icone} size={20} color="white" />
        </View>
      )}

      <TextInput
        style={[GlobalStyles.inputTextDentro, { flex: 1 }]}
        secureTextEntry={isSecure}
        {...rest}
      />

      {secureTextEntry !== undefined && (
        <TouchableOpacity 
          onPress={() => setIsSecure(!isSecure)} 
          style={{ paddingHorizontal: 10, justifyContent: 'center' }}
        >
          <MaterialCommunityIcons 
            name={isSecure ? "eye-off" : "eye"} 
            size={24} 
            color="#777" // Pode mudar a cor se preferir
          />
        </TouchableOpacity>
      )}

    </View>
  );
}

export default Input;