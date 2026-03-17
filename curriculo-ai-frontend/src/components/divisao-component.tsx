import { Text, View } from 'react-native';

export function Divisao(){
    return(
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: '#ffffff40', marginLeft: 40 }} />
                <Text style={{ color: '#fff', marginHorizontal: 20 }}>ou</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: '#ffffff40', marginRight: 40  }} />
        </View>
    );
}

export default Divisao;