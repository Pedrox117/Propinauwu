import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [numberOfPeople, setNumberOfPeople] = useState('1');
  const [total, setTotal] = useState(0);

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const tip = (bill * tipPercentage) / 100;
    const totalAmount = bill + tip;
    const perPersonTotal = totalAmount / parseInt(numberOfPeople);
    setTotal(perPersonTotal.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Propinas</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.currencySymbol}>$</Text>
        <TextInput
          style={styles.input}
          placeholder="Monto de la cuenta"
          keyboardType="numeric"
          value={billAmount}
          onChangeText={(text) => setBillAmount(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.percentSymbol}>%</Text>
        <TextInput
          style={styles.input}
          placeholder="Porcentaje de propina"
          keyboardType="numeric"
          value={tipPercentage === 0 ? '' : tipPercentage.toString()}
          onChangeText={(text) => setTipPercentage(text !== '' ? parseFloat(text) : 0)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.personSymbol}>#</Text>
        <TextInput
          style={styles.input}
          placeholder="Número de personas"
          keyboardType="numeric"
          value={numberOfPeople}
          onChangeText={(text) => setNumberOfPeople(text)}
        />
      </View>
      <Button
        title="Calcular Propina"
        onPress={calculateTip}
        color="#BA68C8" // color morado claro
      />
      <Text style={styles.total}>Total por persona: ${total}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD9E6', // fondo rosado claro
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000', // texto negro
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 18,
    marginRight: 5,
    color: '#000', // texto negro
  },
  percentSymbol: {
    fontSize: 18,
    marginRight: 5,
    color: '#000', // texto negro
  },
  personSymbol: {
    fontSize: 18,
    marginRight: 5,
    color: '#000', // texto negro
  },
  input: {
    height: 40,
    borderColor: '#000', // borde negro
    borderWidth: 1,
    margin: 10,
    width: 200,
    textAlign: 'center',
    color: '#000', // texto negro
  },
  total: {
    fontSize: 18,
    marginTop: 10,
    color: '#000', // texto negro
  },
});

