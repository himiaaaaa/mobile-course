import { Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import uuid from 'react-native-uuid';

const firebaseConfig = {

  apiKey: "AIzaSyA32xDQqpLIQr1zddNxXeO8kPW_Mj8me_M",

  authDomain: "shopping-list-8c276.firebaseapp.com",

  databaseURL: "https://shopping-list-8c276-default-rtdb.firebaseio.com",

  projectId: "shopping-list-8c276",

  storageBucket: "shopping-list-8c276.appspot.com",

  messagingSenderId: "752924526925",

  appId: "1:752924526925:web:61cf77ef94d3a391f30f04",

  measurementId: "G-PN8PQBHYKP"

};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export default function App() {
  const [product, setProduct] = useState({
    title: '',
    amount: ''
  })
  const [data, setData] = useState([])

  useEffect(() => {
    const itemsRef = ref(database, 'items/')
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val() 
      setData(data? Object.keys(data).map(id => ({ id, ...data[id]})): [])
    })
  }, [])

  const addItem = () => {
    push(ref(database, 'items/'), product)
    setProduct({ title: '', amount: ''})
  }

  const deleteItem = (id) => {
    remove(ref(database, `items/${id}`))
  }

  console.log("data", data)
  return (
    <View style={styles.container}>
      <TextInput 
        style={{ width: 100, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
        value={product.title}
        onChangeText={(p) => setProduct({ ...product, title: p })}
        placeholder='product'
      />
      <TextInput 
        style={{ width: 100, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
        value={product.amount}
        onChangeText={(p) => setProduct({ ...product, amount: p })}
        placeholder='amount'
      />
      <View style={styles.buttonView}>
        <Button 
          title="Add" 
          onPress={addItem} 
        />
      </View>
      <View style={styles.listContainer}>
      <Text>Shopping list:</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text>
            {item.title}, {item.amount},
            <Button 
              title="delete"
              onPress={() => deleteItem(item.id)}
            />
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
