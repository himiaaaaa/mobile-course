import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contact, setContact] = useState({});

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
    
      const { data } = await Contacts.getContactsAsync(
      { fields: [Contacts.Fields.PhoneNumbers] }

      );

      //console.log('data', data[0].phoneNumbers[0].number, data.length, data[0].name)

      if (data.length > 0) {
        setContact({data})
      }
    }
  }

  return (
    <View style={styles.container}>
      {contact.data && contact.data.map((c) => (
        <Text key={c.id}>{c.name} {c.phoneNumbers[0].number}</Text>
      ))}
      <Button title="Get Contact" onPress={getContacts} />
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
