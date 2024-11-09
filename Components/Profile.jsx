import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Profile() {
  return (
    <View style={styles.container}>
      {/* Box com gradiente */}
      <LinearGradient
        colors={['#D93083', '#9B4696', '#645CA5']} // Gradiente de 3 cores
        style={styles.box}
      >
        {/* Ícone de perfil dentro do gradiente */}
        <Image source={require('../assets/profile_icon.png')} style={styles.profileIcon} />
        
        {/* Nome do usuário abaixo do ícone */}
        <Text style={styles.subiImgText}>Wellinton Araújo</Text>
        <Text style={styles.subiImgText2}>wellington@email.com</Text>

        <View style={styles.rectangle}>
          {/* Informações do usuário */}
          <View style={styles.row}>
            <Text style={styles.text}>CPF</Text>
            <Text style={styles.subText}>545.646.98-78</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.row}>
            <Text style={styles.text}>Nascimento</Text>
            <Text style={styles.subText}>04/09/2005</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.row}>
            <Text style={styles.text}>Classe</Text>
            <Text style={styles.subText}>545.646.98-78</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.row}>
            <Text style={styles.text}>Turno</Text>
            <Text style={styles.subText}>545.646.98-78</Text>
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
    position: 'relative', // Permite posicionar elementos absolutos dentro
  },
  profileIcon: {
    width: 160,
    height: 160,
    position: 'absolute', // Faz o ícone ser posicionado absolutamente
    top: 40, // Ajuste a posição vertical do ícone
    borderRadius: 80,
    backgroundColor: '#F2F2F2',
  },
  subiImgText: {
    position: 'absolute', // Posiciona o nome do usuário abaixo do ícone
    top: 210, // Ajuste para a posição desejada abaixo do ícone
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subiImgText2: {
    position: 'absolute', // Posiciona o nome do usuário abaixo do ícone
    top: 230, // Ajuste para a posição desejada abaixo do ícone
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  rectangle: {
    width: 321,
    height: 384,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    marginTop: 675, // Ajuste a posição para ficar abaixo do ícone
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row', // Alinha "CPF" e número na mesma linha
    justifyContent: 'space-between', // Espaço entre os elementos
    width: '100%',
    paddingHorizontal: 10, // Margem horizontal para o conteúdo
    alignItems: 'center',
    marginBottom: 5, // Espaço entre as linhas
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#964A9F',
  },
  subText: {
    fontSize: 16,
    color: '#000', // Cor do texto para o CPF
  },
  line: {
    width: '90%', // Largura da linha
    height: 1, // Altura da linha
    backgroundColor: '#D9D9D9', // Cor da linha
    alignSelf: 'center', // Centraliza a linha
    marginVertical: 5,
    marginBottom: 20,
  },
});
