import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Home() {
    const navigation = useNavigation(); // Hook de navegação
    const [studentData, setStudentData] = useState(null); // Estado para armazenar dados do aluno

    // Função para buscar dados do aluno
    const fetchStudentData = async () => {
        try {
            // Recupera os dados do usuário armazenados (token e userId)
            const storedUserData = await AsyncStorage.getItem('userData');
            const userData = JSON.parse(storedUserData);
            
            if (userData && userData.token && userData.userId) {
                // Faz a requisição GET para a API
                const response = await axios.get(`https://suaapi.com/student/${userData.userId}`, {
                    headers: {
                        Authorization: `Bearer ${userData.token}`, // Envia o token no cabeçalho de autorização
                    },
                });

                setStudentData(response.data); // Armazena os dados do aluno
            } else {
                Alert.alert('Erro', 'Não foi possível recuperar os dados do usuário.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Falha ao carregar os dados do aluno.');
            console.error(error);
        }
    };

    // Hook de efeito para buscar os dados do aluno assim que a tela é carregada
    useEffect(() => {
        fetchStudentData();
    }, []);

    const handleNavigate = () => {
        navigation.navigate('Profile'); 
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#D93083', '#9B4696', '#645CA5']}
                style={styles.gradientBox}
            >
                <Text style={styles.title}>
                    {studentData ? studentData.nome : 'Carregando...'}
                </Text>
                <Text style={styles.subtitle}>Seja Bem-Vindo!</Text>
                <View style={styles.line} />

                <View style={styles.rowContainer}>
                    <Text style={styles.ContentBoxG}>Turno</Text>
                    <Text style={styles.ContentBoxG}>Turma</Text>
                </View>

                <View style={styles.rowContainer2}>
                    <Text style={styles.subContentBoxG}>
                        {studentData ? studentData.turno : 'Carregando...'}
                    </Text>
                    <Text style={styles.subContentBoxG}>
                        {studentData ? studentData.turma : 'Carregando...'}
                    </Text>
                </View>

                <TouchableOpacity style={styles.rectangle} onPress={handleNavigate}>
                    <Text style={styles.rectangleText}>Ver Perfil</Text>
                </TouchableOpacity>
            </LinearGradient>

            <View style={styles.boxContainer}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <View key={index} style={styles.box} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEAEA',
        alignItems: 'center',
        
    },
    gradientBox: {
        position: 'absolute',
        top: 20,
        left: 14,
        width: 386,
        height: 378,
        borderRadius: 50,
        justifyContent: 'flex-star', 
        alignItems: 'left',

    },
    title: {
        top: 40,
        left: 20,
        color: '#FFFFFF', 
        fontSize: 25, 
        fontWeight: 'bold', // Negrito
    },
    subtitle: {
        top: 40,
        left: 20,
        color: '#FFFFFF', 
        fontSize: 12, 
        marginBottom: 50,
    },
    
    line: {
        width: '92%', // Largura da linha
        height: 1,
        backgroundColor: '#FFFFFF',
        opacity: 1, // Suavidade da linha
        marginTop: 40,
        marginLeft: 15,
    }, 
    
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Espaçamento entre os textos
        width: '53%', // Ajuste a largura conforme necessário
    },

    rowContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Espaçamento entre os textos
        width: '50%', // Ajuste a largura conforme necessário
    },

    ContentBoxG:{
        marginTop: 14,
        marginLeft: 45,
        color: '#FFFFFF', 
        fontSize: 15, 
        fontWeight: 'bold', 
    },

    subContentBoxG:{
        marginTop: 5,
        marginLeft: 41,
        color: '#FFFFFF', 
        fontSize: 17, 
        fontWeight: 'bold', 

    },
    rectangle: {
        width: 100,
        height: 34,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 250,
        marginTop: -35,
    },
    rectangleText: {
        color: '#4F57EC', 
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    
    boxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Alinha boxes no início
        marginTop: 450, // Ajuste para garantir que fique abaixo da box principal
        paddingHorizontal: 24,
    },
    box: {
        width: 92,
        height: 118,
        backgroundColor: '#FFFFFF',
        marginBottom: 20, // Espaçamento entre as linhas
        borderRadius: 6,
        // Sombra para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        // Sombra para Android
        elevation: 5,
    },
});
;