import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const[number1, setNumber1] = useState(0)
  const[number2, setNumber2] = useState(0)
  const[sum, setSum] = useState(0)

  const addNumber = () => {
    setSum(Number(number1)+Number(number2))
  }

  const minusNumber = () => {
    setSum(Number(number1)-Number(number2))
  }

  return (
    <View style={styles.container}>
      <Text>Result: {sum}</Text>
      <TextInput 
        style={{ width: 200, borderColor:'gray', borderWidth: 1 }}
        value={number1.toString()}
        onChangeText={number1 => setNumber1(number1.toString())}
      >
      </TextInput>
      <TextInput
        style={{ width: 200, borderColor:'gray', borderWidth: 1 }}
        value={number2.toString()}
        onChangeText={number2 => setNumber2(number2.toString())}
      >
      </TextInput>
      <View style={styles.buttonView}>
        <Button 
          title="+" 
          onPress={addNumber} 
        />
        <Button 
          title="-" 
          onPress={minusNumber} 
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    flexDirection: 'row'
  },
});
