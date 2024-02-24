import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { Header, Input, Button, ListItem, Icon } from '@rneui/themed';

const db = SQLite.openDatabase('shoppinglist.db');

export default function App() {
  const [product, setProduct] = useState('')
  const [amount, setAmount] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppinglists (id integer primary key not null, product text, amount int);');
    }, 
    () => console.error('Error when creating DB'),
    updateList
    )
  }, [])

  const addItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shoppinglists (product, amount) values (?, ?);', [product, parseInt(amount)]);
    }, 
    () => console.error('Error when adding item'),
    updateList
    )
    setProduct('')
    setAmount('')
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoppinglists;', [], (_, { rows }) => 
        setData(rows._array)
      );
    }, 
    () => console.error('Error when updating list')
    , null)
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from shoppinglists where id = ?;', [id]);
      }, 
      () => console.error('Error when updating list'), 
      updateList
    )
  }

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text>
        {item.product}, {item.amount} 
      </Text>
      <Icon
          name='delete'
          color="red"
          onPress={() => deleteItem(item.id)}
      />
    </View>
  )

  return (
    <View style={styles.container}>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
        />
      <Input 
        label='PRODUCT'
        value={product}
        onChangeText={(c) => setProduct(c)}
        placeholder='product'
      />
      <Input 
        label='AMOUNT'
        value={amount}
        onChangeText={(a) => setAmount(a)}
        placeholder='amount'
      />
      <Button raised icon={{name: 'save'}} onPress={addItem} title="SAVE" />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
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
});

