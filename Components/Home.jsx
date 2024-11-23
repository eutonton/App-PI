import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();
    const route = useRoute();

    const userData = route.params?.userData;

    const userName = userData?.name || 'Usuário Desconhecido';
    const userShift = userData?.shift || 'Turno não definido';
    const userClass = userData?.className || 'Turma não definida';

    const [avisos, setAvisos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userData) {
            // Simula uma validação ou uso dos dados
        } else {
            Alert.alert('Erro', 'Os dados do usuário não foram carregados.');
        }

        // Busca os avisos do endpoint
        const fetchAvisos = async () => {
            try {
                const response = await fetch('http://192.168.1.107:8080/api/statement/getAllStatements');
                const data = await response.json();
                setAvisos(data.slice(-3).reverse()); // Obtém os 4 últimos avisos em ordem reversa
            } catch (error) {
                console.error('Erro ao buscar avisos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAvisos();
    }, [userData]);

    if (!userData) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D93083', '#9B4696', '#645CA5']} style={styles.gradientBox}>
                <Text style={styles.title}>{userName}</Text>
                <Text style={styles.subtitle}>Seja Bem-Vindo!</Text>
                <View style={styles.line} />
                <View style={styles.rowContainer}>
                    <Text style={styles.ContentBoxG}>Turno</Text>
                    <Text style={styles.ContentBoxG}>Turma</Text>
                </View>
                <View style={styles.rowContainer2}>
                    <Text style={styles.subContentBoxG}>{userShift}</Text>
                    <Text style={styles.subContentBoxG}>{userClass}</Text>
                </View>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.boxContainer}>
                {loading ? (
                    <Text style={styles.loadingText}>Carregando avisos...</Text>
                ) : avisos.length > 0 ? (
                    avisos.map((aviso, index) => (
                        <View key={index} style={styles.box}>
                            <Text style={styles.avisoTitulo}>{aviso.titulo}</Text>
                            <Text style={styles.avisoDescricao}>{aviso.descricao}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noAvisosText}>Nenhum aviso disponível</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEAEA',
        alignItems: 'center',
        paddingTop: 30,
    },
    gradientBox: {
        position: 'absolute',
        top: 20,
        left: 14,
        width: 386,
        height: 378,
        borderRadius: 50,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 20,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 20,
    },
    subtitle: {
        color: '#FFFFFF',
        fontSize: 12,
        marginBottom: 30,
        marginLeft: 20,
    },
    line: {
        width: '92%',
        height: 1,
        backgroundColor: '#FFFFFF',
        opacity: 1,
        marginTop: 10,
        marginLeft: 15,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '53%',
        marginTop: 20,
    },
    rowContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginTop: 20,
    },
    ContentBoxG: {
        marginTop: 14,
        marginLeft: 45,
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
    subContentBoxG: {
        marginTop: 0,
        marginLeft: 35,
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
    },
    boxContainer: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        alignItems: 'center',
        width: 400,
        marginTop: 360,
    },
    box: {
        width: '90%',
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    avisoTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    avisoDescricao: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
        textAlign: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#7f8c8d',
    },
    noAvisosText: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
    },
});
