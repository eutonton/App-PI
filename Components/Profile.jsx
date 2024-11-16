import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../AuthContext';
import axios from 'axios';

export default function Profile() {
  const { user } = useAuth(); 
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(null);

  

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (user && user.name) {
          const response = await axios.get(`http://192.168.1.106:8080/api/users/alunos/findByNome/${user.name}`);
          
          
  
          if (response.data && response.data.length > 0) {
            // Pegando o primeiro objeto do array
            const userData = response.data[0];
            
            
            setUserDetails(userData);
          } else {
            setError('Nenhum dado encontrado para este usuário');
          }
        } else {
          setError('Nome do usuário não encontrado no contexto');
        }
      } catch (err) {
        console.error('Erro ao buscar os dados do usuário:', err);
        setError('Erro ao buscar os dados do usuário');
      }
    };
  
    fetchUserDetails();
  }, [user]); 

 
  if (error) {
    return <Text>{error}</Text>;
  }


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#D93083', '#9B4696', '#645CA5']} // Gradiente de 3 cores
        style={styles.box}
      >
        <Image source={require('../assets/profile_icon.png')} style={styles.profileIcon} />
        <Text style={styles.subiImgText}>{user.name}</Text>
        <Text style={styles.subiImgText2}>{userDetails.email}</Text>

        <View style={styles.rectangle}>
          <View style={styles.row}>
            <Text style={styles.text}>CPF</Text>
            <Text style={styles.subText}>{userDetails.cpf}</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.row}>
            <Text style={styles.text}>Nascimento</Text>
            <Text style={styles.subText}>04/09/2005</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.row}>
            <Text style={styles.text}>Classe</Text>
            <Text style={styles.subText}>{user.className}</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.row}>
            <Text style={styles.text}>Turno</Text>
            <Text style={styles.subText}>{user.shift}</Text>
          </View>
          <View style={styles.line} />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  box: {
    width: 360,
    height: 358,
    marginTop: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  profileIcon: {
    width: 160,
    height: 160,
    position: 'absolute',
    top: 40,
    borderRadius: 80,
    backgroundColor: '#F2F2F2',
  },
  subiImgText: {
    position: 'absolute',
    top: 210,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subiImgText2: {
    position: 'absolute',
    top: 230,
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  rectangle: {
    width: 321,
    height: 384,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    marginTop: 675,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#964A9F',
  },
  subText: {
    fontSize: 16,
    color: '#000',
  },
  line: {
    width: '90%',
    height: 1,
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
  },
});
