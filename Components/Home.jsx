import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function Home() {
    const navigation = useNavigation();
    const route = useRoute();

    const userData = route.params?.userData;
    const userName = userData?.name || 'Usuário Desconhecido';

    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    const getApiUrl = () => {
        return Platform.OS === 'android'
            ? 'http://10.0.2.2:8080/api/statement/getAllStatements'
            : 'http://localhost:8080/api/statement/getAllStatements';
    };

    useEffect(() => {
        if (!userData) {
            Alert.alert('Erro', 'Os dados do usuário não foram carregados.');
            return;
        }

        const fetchNotices = async () => {
            try {
                const response = await axios.get(getApiUrl());
                setNotices(response.data.slice(-2).reverse()); // Últimos 3 avisos
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar os avisos.');
                console.error('Erro ao buscar avisos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, [userData]);

    const renderNotice = (notice, index) => (
        <View key={index} style={styles.box}>
            <Text style={styles.avisoTitulo}>{notice.title}</Text>
            <Text style={styles.avisoDescricao}>{notice.content}</Text>
            {/*<Text style={styles.date}>Data: {new Date(notice.creationDate).toLocaleDateString()}</Text>*/}
        </View>
    );

    return (

        <View style={styles.container}>

<View style={styles.topBar}>
        <Text style={styles.topBarText}>Minha Aplicação</Text>
    </View>

            <LinearGradient colors={['#D93083', '#9B4696', '#645CA5']} style={styles.gradientBox}>
                <Text style={styles.title}>{userName}</Text>
                <Text style={styles.subtitle}>Seja Bem-Vindo!</Text>
                <View style={styles.line} />
            </LinearGradient>

            {/* Caixa de frequência */}
            <View style={styles.infoBox}>
                <Text style={styles.infoBoxTitle}>Frequência</Text>
                <View style={styles.frequencyRow}>
                    <Text style={[styles.frequencyText, styles.present]}>Presenças: 20</Text>
                    <Text style={[styles.frequencyText, styles.absent]}>Ausências: 5</Text>
                    <Text style={[styles.frequencyText, styles.total]}>Total: 25</Text>
                </View>
            </View>

            {/* Caixa de aulas da semana */}
            <View style={styles.infoBox2}>
                <Text style={styles.infoBoxTitle}>Aulas de Hoje</Text>
                <Text style={styles.infoBoxContent}>Segunda: Matemática{'\n'}</Text>
            </View>

            {/* Últimos Avisos */}
            <View style={styles.avisosHeader}>
                <Text style={styles.sectionTitle}>Últimos Avisos</Text>
            </View>
            <ScrollView contentContainerStyle={styles.boxContainer}>
                {loading ? (
                    <Text style={styles.loadingText}>Carregando avisos...</Text>
                ) : notices.length > 0 ? (
                    notices.map((notice, index) => renderNotice(notice, index))
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
        backgroundColor: '#f0f4f8',
        alignItems: 'center',
        paddingTop: 20,
    }, 
    
    gradientBox: {
        position: 'absolute',
        Margintop: 0,
        width: 415,
        height: 350,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 20,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 5,
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
        marginTop: 5,
        marginLeft: 15,
    },
    infoBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        width: '90%',
        padding: 20,
        marginVertical: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
        marginTop: 110,
    },
    infoBox2: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        width: '90%',
        padding: 20,
        marginVertical: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
    },
    infoBoxTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
    frequencyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    frequencyText: {
        fontSize: 16,
        fontWeight: '600',
    },
    present: {
        color: '#27AE60',
    },
    absent: {
        color: '#C0392B',
    },
    total: {
        color: '#2C3E50',
    },
    infoBoxContent: {
        fontSize: 14,
        color: '#555',
        textAlign: 'left',
        lineHeight: 20,
    },
    boxContainer: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        alignItems: 'center',
        width: '100%',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    box: {
        width: 350,
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
        borderLeftWidth: 6,
        borderLeftColor: '#9B4696',
    },
    avisosHeader: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#f0f4f8', // Para destacar, opcional
    },
    avisoTitulo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        textAlign: 'center',
    },
    avisoDescricao: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
        textAlign: 'center',
        lineHeight: 18,
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

