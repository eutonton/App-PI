import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Units = ({ route, navigation }) => {
  const { discipline } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unidades da {discipline.disciplineName}</Text>
      <Button title="UD1" onPress={() => alert('Selecionou UD1')} />
      <Button title="UD2" onPress={() => alert('Selecionou UD2')} />
      <Button title="UD3" onPress={() => alert('Selecionou UD3')} />
    </View>
  );
};

export default Units;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
