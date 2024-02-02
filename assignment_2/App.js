import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  const [text, setText] = useState('')
  const [show, setShow] = useState('')
  const [secret, setSecret] = useState(0)
  const [num, setNum] = useState(0)

  const random = () => {
    return Math.floor(Math.random() * 100) + 1
  }

  useEffect(() => {
    setSecret(random());
  }, [])

  const buttonPressed = () => {
    const input = parseInt(text)
    if(input < secret){
      setShow(`Your guess ${text} is too low`)
      setNum(num => num + 1)
    } else if (input > secret) {
      setShow(`Your guess ${text} is too high`)
      setNum(num => num + 1)
    } else if(input === secret){
      Alert.alert(`You guessed the number in ${num} guesses`)
      setText('');
      setShow('');
      setNum(0);
    }
  }

  return (
    <View style={styles.container}>
      <Text>{show? show : "Guess a number between 1 - 100"}</Text>
      <TextInput 
        style={{width: 100, borderColor: 'gray', borderWidth: 1, marginVertical: 10}}
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <Button 
        title="MAKE GUESS"
        onPress={buttonPressed}
      />
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
});
