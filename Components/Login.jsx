import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Image, Alert  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
      if (!email || !password) {
          Alert.alert('Erro', 'Por favor, preencha todos os campos.');
          return;
      }

      // Aqui você pode adicionar a lógica de autenticação
      // Simulando um login bem-sucedido
      navigation.navigate('Home'); // Navega para a tela principal após o login
  };
    return (
        <LinearGradient colors={['#D93083', '#9B4696', '#5F5DA5']} style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.loginBox}>
                {/* Imagem no topo */}
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <TextInput placeholder="Email" style={styles.input} placeholderTextColor="#888" TextEntry value={email} onChangeText={setEmail}/>
                <TextInput placeholder="Senha" style={styles.input} placeholderTextColor="#888" secureTextEntry value={password} onChangeText={setPassword}/>
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
    width: 180,    // Ajuste o tamanho da imagem conforme necessário
    height: 100,
    marginBottom: 35,
    marginTop: 15, // Espaço entre a imagem e o título
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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


