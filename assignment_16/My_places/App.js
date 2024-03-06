import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Header, Input, Button, ListItem, Icon } from '@rneui/themed';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue } from 'firebase/database';

export default function App() {
  const [address, setAddress] = useState('');
  const [lon, setLon] = useState('');
  const [lat, setLat] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [places, setPlaces] = useState([]);

const firebaseConfig = {
  apiKey: "AIzaSyAn3iYzOyg3GsKEaCXQwmPkVMa3uCY6A1U",
  authDomain: "my-place-9bc9d.firebaseapp.com",
  databaseURL:'https://my-place-9bc9d-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: "my-place-9bc9d",
  storageBucket: "my-place-9bc9d.appspot.com",
  messagingSenderId: "899402123533",
  appId: "1:899402123533:web:4208e1891189bb71278844"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

  useEffect(() => {
    const itemsRef = ref(database, 'address/');
    
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      setPlaces(Object.values(data));
    })
  
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('No permission to get location');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const search = (address) => {
    const changedAddress = address.replace(' ', '_');
    const apiUrl = `https://geocode.maps.co/search?q=${changedAddress}&api_key=65bd320c54cbb608466398kgh162a52`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.length > 0) {
          const location = responseJson[0];
          setLat(parseFloat(location.lat));
          setLon(parseFloat(location.lon));
          setTitle(location.display_name);
          setShowMap(true); 
        } else {
          throw new Error('Invalid response format');
        }
      })
      .catch(error => {
        Alert.alert('Error', error);
      });
  };

  const simplifyAddress = address => {
    let parts = address.split(',');
    if (parts.length < 2) {
      return address;
    }
    let number = parts[0].trim();
    let street = parts[1].trim();
    return `${street} ${number}`;
  };

  const saveItem = () => {
    push(ref(database,
    'address/'), address);
  }

  return (
    <View style={{ flex: 1 }}>
      {showMap ? ( 
        <View style={{ flex: 1 }}>
          <Header
            leftComponent={
              <TouchableOpacity style={{ paddingTop: 50 }} onPress={() => setShowMap(false)}>
                <Text style={{ color: 'white' }}>Back</Text>
              </TouchableOpacity>
            }
          />
        <MapView
          style={{ flex: 6 }}
          region={{
            latitude: lat ? lat : location?.coords?.latitude,
            longitude: lon ? lon : location?.coords?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={{ latitude: lat, longitude: lon }} title={simplifyAddress(title)} />
        </MapView>
        </View>
      ) : (
        <View>
          <Header leftComponent={{ text: 'My place', style: { color: '#fff', paddingTop: 50 }  }}/>
          <Input
            placeholder="Enter address"
            label="PLACEFINDER"
            value={address}
            onChangeText={setAddress}
          />
          <Button 
            title="Save" 
            onPress={saveItem} 
            style={{ paddingHorizontal: 30 }}
          />
          { places.map((p, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <ListItem.Title style={{display:'flex', justifyContent:'flex-start'}}>{p}</ListItem.Title>
            </View>
            </ListItem.Content>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: "center" }}>
              <Text>Show on the map</Text>
            </View>
            <ListItem.Chevron color="gray" onPress={()=> search(p)} />
          </ListItem>
          ))}
        </View>
      )}
    </View>
  );
}
