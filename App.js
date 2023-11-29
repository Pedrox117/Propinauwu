import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [numberOfPeople, setNumberOfPeople] = useState('1');
  const [total, setTotal] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);
  const [totalWithTip, setTotalWithTip] = useState(0);

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const tip = (bill * tipPercentage) / 100;
    const totalAmount = bill + tip;

    setTipAmount(tip.toFixed(2));
    setTotalWithTip(totalAmount.toFixed(2));

    const perPersonTotal = totalAmount / parseInt(numberOfPeople);
    setTotal(perPersonTotal.toFixed(2));
  };

  const goToResultScreen = () => {
    const peopleArray = Array.from({ length: parseInt(numberOfPeople) }, (_, index) => ({
      id: index.toString(),
      totalPerPerson: total,
    }));

    navigation.navigate('Result', {
      peopleArray,
    });
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
        color="#BA68C8" 
      />
      <Text style={styles.resultText}>Importe de Propina: ${tipAmount}</Text>
      <Text style={styles.resultText}>Importe Total: ${totalWithTip}</Text>
      <Text style={styles.total}>Total por persona: ${total}</Text>
      <Button
        title="Ver Desglose"
        onPress={goToResultScreen}
        color="#BA68C8" 
      />
      <StatusBar style="auto" />
    </View>
  );
};

const ResultScreen = ({ route, navigation }) => {
  const { peopleArray } = route.params;
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [paidAmount, setPaidAmount] = useState('');

  const calculateChange = () => {
    if (selectedPerson !== null) {
      const paid = parseFloat(paidAmount) || 0;
      const totalPerPerson = peopleArray[selectedPerson].totalPerPerson;
      const change = paid - totalPerPerson;
      alert(`Cambio: $${change.toFixed(2)}`);
    } else {
      alert('Selecciona a una persona antes de calcular el cambio.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desglose de la Cuenta</Text>
      <FlatList
        data={peopleArray}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setSelectedPerson(index)}
            style={[
              styles.personItem,
              { backgroundColor: selectedPerson === index ? '#BA68C8' : '#FFD9E6' },
            ]}
          >
            <Text style={styles.personText}>Persona {index + 1}: ${item.totalPerPerson}</Text>
          </TouchableOpacity>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Monto Pagado"
        keyboardType="numeric"
        value={paidAmount}
        onChangeText={(text) => setPaidAmount(text)}
      />
      <Button title="Calcular Cambio" onPress={calculateChange} color="#BA68C8" />
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD9E6', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000', 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 18,
    marginRight: 5,
    color: '#000', 
  },
  percentSymbol: {
    fontSize: 18,
    marginRight: 5,
    color: '#000', 
  },
  personSymbol: {
    fontSize: 18,
    marginRight: 5,
    color: '#000', 
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    margin: 10,
    width: 200,
    textAlign: 'center',
    color: '#000', 
  },
  total: {
    fontSize: 18,
    marginTop: 10,
    color: '#000',
    textAlign: 'right', 
  },
  resultText: {
    fontSize: 18,
    marginTop: 5,
    color: '#000', 
    textAlign: 'right',
  },
  personItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  personText: {
    fontSize: 16,
    color: '#000',
  },
});
