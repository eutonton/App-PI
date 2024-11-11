import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();
    const route = useRoute();
    
    // Garantir que estamos recebendo os dados corretamente
    const userData = route.params?.userData; // Certificando-se de que os dados existem

    // Armazenando dados em variáveis locais com tratamento de fallback
    const userName = userData?.name || 'Usuário Desconhecido';
    const userShift = userData?.studentClass?.shift || 'Turno não definido';
    const userClass = userData?.studentClass?.nameClass || 'Turma não definida';

    // UseEffect para exibir o alerta com os dados do usuário quando a tela carrega
    useEffect(() => {
        if (userData) {
            Alert.alert('Dados do Usuário', JSON.stringify(userData, null, 2));
        } else {
            Alert.alert('Erro', 'Os dados do usuário não foram carregados.');
        }
    }, [userData]);

    const handleNavigate = () => {
        navigation.navigate('Profile');
    };

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
        marginBottom: 50,
        marginLeft: 20,
    },
    line: {
        width: '92%', 
        height: 1,
        backgroundColor: '#FFFFFF',
        opacity: 1, 
        marginTop: 40,
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
        marginTop: 5,
        marginLeft: 41,
        color: '#FFFFFF', 
        fontSize: 17, 
        fontWeight: 'bold', 
    },
    rectangle: {
        width: 120,  
        height: 40,  
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',  
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
        alignItems: 'flex-start', 
        marginTop: 450, 
        paddingHorizontal: 24,
    },
    box: {
        width: 92,
        height: 118,
        backgroundColor: '#FFFFFF',
        marginBottom: 20, 
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
});
