import { TextInputProps, View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { GlobalStyles } from "./style"
import Input from "./input-component"
import { useState } from 'react';

type FormacaoProps = TextInputProps & {
    numero: number,
    mask?: any,
    onRemover: () => void,
    podeRemover: boolean,
}

export default function FormacaoComponent({ numero, onRemover, podeRemover }: FormacaoProps) {

    const [cursando, setCursando] = useState(false);
    const [curso, setCurso] = useState('');
    const [tipoFormacao, setTipoFormacao] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataTermino, setDataTermino] = useState('');

    return (
        <View style={styles.container}>

            {/* Cabeçalho */}
            <View style={styles.cabecalho}>
                <Text style={[GlobalStyles.subtitulo, { marginTop: 10 }]}>
                    Formação {numero}
                </Text>
                {podeRemover && (
                    <TouchableOpacity onPress={onRemover} style={styles.botaoRemover}>
                        <Text style={styles.textoRemover}>✕</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Inputs */}
            <Input
                placeholder="Curso"
                placeholderTextColor={"#777"}
                autoCapitalize="none"
                keyboardType="default"
                value={curso}
                onChangeText={setCurso}
            />

            <Input
                placeholder="Tipo de formação"
                placeholderTextColor={"#777"}
                autoCapitalize="none"
                keyboardType="default"
                value={tipoFormacao}
                onChangeText={setTipoFormacao}
            />

            <Input
                icone={"calendar"}
                placeholder="Data de início"
                placeholderTextColor={"#777"}
                keyboardType="numeric"
                autoCapitalize={"none"}
                value={dataInicio}
                onChangeText={setDataInicio}
                mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
            />

            {/* Data de término só aparece se não estiver cursando */}
            {!cursando && (
                <Input
                    icone={"calendar"}
                    placeholder="Data de término"
                    placeholderTextColor={"#777"}
                    keyboardType="numeric"
                    autoCapitalize={"none"}
                    value={dataTermino}
                    onChangeText={setDataTermino}
                    mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                />
            )}

            {/* Checkbox cursando */}
            <TouchableOpacity
                onPress={() => setCursando(!cursando)}
                style={styles.checkboxContainer}
            >
                <View style={[styles.checkbox, cursando && styles.checkboxMarcado]}>
                    {cursando && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxTexto}>Cursando atualmente</Text>
            </TouchableOpacity>

            {/* Divisor entre formações */}
            <View style={styles.divisor} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
    },
    cabecalho: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 10,
    },
    botaoRemover: {
        padding: 6,
    },
    textoRemover: {
        color: '#ff6b6b',
        fontSize: 20,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 12,
        alignSelf: 'flex-start',
        marginLeft: '5%',
    },
    checkbox: {
        width: 22,
        height: 22,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    checkboxMarcado: {
        backgroundColor: '#fff',
    },
    checkmark: {
        color: '#1a6dcc',
        fontWeight: 'bold',
        fontSize: 14,
    },
    checkboxTexto: {
        color: '#fff',
        fontSize: 16,
    },
    divisor: {
        width: '90%',
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginTop: 20,
    }
})