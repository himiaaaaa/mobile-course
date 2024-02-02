import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [text, setText] = useState('')
  const [data, setData] = useState([])

  const addItem = () => {
    setData([...data, { name:`${text}`}])
    console.log('data', data)
    setText('')
  }

  const clearItem = () => {
    setData([])
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={{ width: 100, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <View style={styles.buttonView}>
        <Button 
          title="Add" 
          onPress={addItem} 
        />
        <Button 
          title="Clear" 
          onPress={clearItem} 
        />
      </View>
      <View style={styles.listContainer}>
      <Text>Shopping list:</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.name}
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
    marginTop: 100
  },
  buttonView: {
    flexDirection: 'row'
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50
  },
});
