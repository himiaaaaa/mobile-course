import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';

export default function App() {
  const [address, setAddress] = useState('')
  const [lon, setLon] = useState('')
  const [lat, setLat] = useState('')
  const [title, setTitle] = useState('')

  const changedAddress = address.replace(' ', '_')

  const apiUrl=`https://geocode.maps.co/search?q=${changedAddress}&api_key=65bd320c54cbb608466398kgh162a52`

  const search = () => {
    fetch(apiUrl)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.length > 0) {
        const location = responseJson[0];
        setLat(parseFloat(location.lat));
        setLon(parseFloat(location.lon));
        setTitle(location.display_name);
      } else {
        throw new Error('Invalid response format');
      }
    })
    .catch(error => {
      Alert.alert('Error', error)
    })
  }

  const simplifyAddress = (address) => {
    let parts  = address.split(',')
    if (parts.length < 2) {
      return address; 
    }
    let number = parts[0].trim()
    let street = parts[1].trim()
    return `${street} ${number}`
  }

  console.log('title', simplifyAddress(title))

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 6 }}
        initialRegion={{
          latitude: 60.200692,
          longitude: 24.934302,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
        region={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}>
        <Marker
          coordinate={{
          latitude: lat,
          longitude: lon 
          }}
          title={simplifyAddress(title)} />
      </MapView>
      <View style={styles.bottomContainer} >
        <TextInput 
          style={{ width: 100, borderBottomColor: 'gray', borderBottomWidth: 1 }}
          value={address}
          onChangeText={(address) => setAddress(address)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={search}
        >
          <Text>SHOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  bottomContainer: {
    flex: 1,
    justifyContent:'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#DDDDDD',
    marginBottom: 30,
    marginTop: 10
  }
});
