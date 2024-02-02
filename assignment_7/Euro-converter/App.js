import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {
  const [amount, setAmount] = useState(null)
  const [symbol, setSymbol] = useState('')
  const [repositories, setRepositories] = useState({})
  const [convertedNum, setConvertedNum] = useState(null)

  const apiUrl = 'https://api.apilayer.com/exchangerates_data/latest?base=EUR'

  const myHeaders = new Headers()
  myHeaders.append('apikey', 'oBTzJUljr9NhCHezg6Z3CrwKWLfY1dGe')

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const fetchExchangeRates = () => {
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(responsJson => setRepositories(responsJson.rates))
      .then(data => {
        console.log('API Response:', data);
      })
      .catch(error => {
        Alert.alert('Error', error)
      })
  }

  useEffect(() => {
    fetchExchangeRates();
  }, [])

  const convert = () => {
    const rate = repositories[symbol]

    if(rate){
      const converted = rate * amount
      setConvertedNum(converted.toFixed(2))
    } else {
      Alert.alert('Error', 'Error')
    }
  }


  return (
    <View style={styles.container}>
      <Image 
        source={{uri: 'https://media.istockphoto.com/photos/golden-euros-picture-id474045028?k=6&m=474045028&s=612x612&w=0&h=OMWEu1IUceReiL_nS91sXQCDm0R0vZi6R-Ll62Juzvw='}} 
        style={{ width:150, height: 150, marginBottom: 10}}
      />
      <Text>{convertedNum}€</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          style={{ width: 100, borderBottomColor: 'blue', borderBottomWidth: 1, marginTop: 100}}
          value={amount}
          onChangeText={(amount) => setAmount(amount)}
        />
        <Picker
          style={{ height: 20, width: 150}} 
          selectedValue={symbol}
          onValueChange={(itemValue) =>
            setSymbol(itemValue)
        }>
          {Object.keys(repositories).map((currency) => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>
      </View>
      
      <TouchableOpacity
        onPress={convert}
        style={styles.button}
      >
        <Text>CONVERT</Text>
      </TouchableOpacity>
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
  inputContainer: {
    flexDirection: 'row',
  },
  button:{
    marginTop: 80,
    backgroundColor: '#DDDDDD',
    padding: 10,
  }
});
