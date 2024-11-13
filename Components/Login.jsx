import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Image, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

export default function Login({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const getApiUrl = () => {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:8080/api/auth/login';
    }
    return 'http://192.168.1.2:8080/api/auth/login';
  };

  const handleLogin = async () => {
    if (!cpf || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const apiUrl = getApiUrl();

      // Requisição de login
      const response = await axios.post(apiUrl, { cpf, password });

      // Console para verificar o conteúdo da resposta da API
      console.log("Dados recebidos da API:", response.data);

      // Extraindo dados do LoginResponseDto
      const { token, name, role, id, studentClass } = response.data;

      if (token) {
        const userData = { token, name, role, id, studentClass };

        // Console para verificar os dados enviados para Home
        console.log("Dados enviados para Home:", userData);

        // Salvar dados no contexto
        await login(userData);

        // Verificar se userData foi corretamente salvo no contexto
        console.log("Dados do usuário após login:", userData);

        // Verificação de segurança para evitar erro se studentClass estiver ausente
        if (studentClass && studentClass.nameClass) {
          console.log("Nome da classe do aluno:", studentClass.nameClass);
        } else {
          console.log("studentClass está undefined ou não contém a propriedade nameClass");
        }

        // Navegar para a tela Home com os dados do usuário
        navigation.navigate('Home', { userData });
      } else {
        Alert.alert('Erro', 'Erro ao fazer login');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        Alert.alert('Erro', error.response.data.message || 'Erro ao tentar autenticar');
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
        
        <TextInput 
          placeholder="CPF" 
          style={styles.input} 
          placeholderTextColor="#888" 
          keyboardType="numeric"
          autoCapitalize="none"
          value={cpf} 
          onChangeText={setCpf}
        />
        
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
