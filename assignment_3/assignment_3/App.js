import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, View, Button, FlatList } from 'react-native';
import { useState } from 'react';

export default function App() {
  const[number1, setNumber1] = useState(0)
  const[number2, setNumber2] = useState(0)
  const[sum, setSum] = useState(0)
  const [data, setData] = useState([])

  const addNumber = () => {
    const result = Number(number1) + Number(number2)
    setSum(result)
    setData([...data, { operation: `${number1} + ${number2}`, result }])
  }

  const minusNumber = () => {
    const result = Number(number1) - Number(number2)
    setSum(result)
    setData([...data, { operation: `${number1} - ${number2}`, result }])
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
      <View style={styles.listContainer}>
      <Text>History:</Text>
      <FlatList
        data={data}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.operation} = {item.result}
          </Text>
        )}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 150
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50
  },
  buttonView: {
    flexDirection: 'row'
  },
});
