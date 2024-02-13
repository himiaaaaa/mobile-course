import { Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppinglist.db');

export default function App() {
  const [conduct, setConduct] = useState('')
  const [amount, setAmount] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppinglist (id integer primary key not null, conduct text, amount int);');
    }, 
    () => console.error('Error when creating DB'),
    updateList
    )
  }, [])

  const addItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shoppinglist (conduct, amount) values (?, ?);', [conduct, parseInt(amount)]);
    }, 
    () => console.error('Error when adding item'),
    updateList
    )
    setConduct('')
    setAmount('')
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoppinglist;', [], (_, { rows }) => 
        setData(rows._array)
      );
    }, 
    () => console.error('Error when updating list')
    , null)
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from shoppinglist where id = ?;', [id]);
      }, 
      () => console.error('Error when updating list'), 
      updateList
    )
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={{ width: 100, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
        value={conduct}
        onChangeText={(c) => setConduct(c)}
        placeholder='conduct'
      />
      <TextInput 
        style={{ width: 100, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
        value={amount}
        onChangeText={(a) => setAmount(a)}
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
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.conduct}, {item.amount} 
            <Button 
              title="bought"
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
