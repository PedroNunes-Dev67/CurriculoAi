import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
    fundoazullogin: {
        flex: 1,
        backgroundColor: '#000c26',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:100
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
        width: 272,
        height: 54,
        backgroundColor:'#061C46',
        borderColor: '#092862',
        borderWidth: 2,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginTop: 15,
    },
    inputTextDentro: {
        flex: 1,
        height: '100%',
        color: '#FFFFFF',
        fontSize: 16,
        marginLeft: 10,
        justifyContent: 'center',
        textAlignVertical: 'center',
        border:'none'
    },
    botao: {
    width: 181,
    height: 50,
    backgroundColor: '#092862',
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
botaoCadastro: {
    width: 272,
    height: 54,
    backgroundColor:'#061C46',
    borderColor: '#092862',
     borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 80.
},
});