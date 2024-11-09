import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Image, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { AuthContext } from '../AuthContext'; // Ajuste o caminho conforme necessário

export default function Login({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Usando login do AuthContext

  // Função para pegar o IP ou URL correta
  const getApiUrl = () => {
    // Emulador Android
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:8080/api/auth/login';  // Usado em emuladores Android
    }
    // Dispositivos físicos ou emulador iOS
    return 'http://192.168.1.2:8080/api/auth/login'; // Substitua 192.168.1.2 pelo seu IP local
  };

  const handleLogin = async () => {
    if (!cpf || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const apiUrl = getApiUrl();  // Usar a URL correta conforme o ambiente

      // Fazendo a requisição de login
      const response = await axios.post(apiUrl, { cpf, password });

      // Aqui, vamos considerar a navegação para a tela Home assim que recebermos qualquer resposta válida
      const { token } = response.data; // Apenas verificando o token

      if (token) {
        // Se o token for retornado, faz o login no contexto e navega para a tela Home
        const userData = { token };
        await login(userData); // Chama a função login do AuthContext

        // Navegar para a tela principal
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'Erro ao fazer login');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        Alert.alert('Erro', error.response.data);
      } else {
        Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      }
      console.error(error);
    }
  };

  return (
    <LinearGradient colors={['#D93083', '#9B4696', '#5F5DA5']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.loginBox}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        
        {/* Campo para CPF */}
        <TextInput 
          placeholder="CPF" 
          style={styles.input} 
          placeholderTextColor="#888" 
          keyboardType="numeric"
          autoCapitalize="none"
          value={cpf} 
          onChangeText={setCpf}
        />
        
        {/* Campo para Senha */}
        <TextInput 
          placeholder="Senha" 
          style={styles.input} 
          placeholderTextColor="#888" 
          secureTextEntry 
          value={password} 
          onChangeText={setPassword}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBox: {
    width: '95%',
    height: '60%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 30,
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 100,
    marginBottom: 35,
    marginTop: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    width: '90%',
    padding: 20,
    backgroundColor: '#964A9F',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8, 
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
