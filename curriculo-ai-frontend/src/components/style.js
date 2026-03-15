import { Button } from 'react-native';
import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
    fundoazullogin: {
        flex: 1,
        backgroundColor: '#000c26',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold'
    },
    subtitulo: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 22
    },
    inputTS: {
        width: '90%',
        height: 55,
        backgroundColor:'#0a1631',
        borderColor: '#172b5a',
        borderWidth: 2,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 15,
    },
    inputTextDentro: {
        flex: 1,
        height: '100%',
        color: '#FFFFFF',
        fontSize: 16,
        marginLeft: 10,
        textAlignVertical: 'center',

    },
    botao: {
    width: '90%',
    height: 55,
    backgroundColor: '#3498db',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
},

textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
},
});