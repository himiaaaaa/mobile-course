import { StyleSheet, Text, View, Alert, FlatList, Image, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [keyword, setKeyword] = useState('')
  const [repositories, setRepositories] = useState([])

  const getRepositories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(responseJson => setRepositories(responseJson.meals))
    .catch(error => {
      Alert.alert('Error', error)
    })
  }

  console.log('res', repositories)

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList 
        data={repositories}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({item}) => 
          <View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>
              {item.strMeal}
            </Text>
            <Image 
              source={{uri:`${item.strMealThumb}`}}
              style={{ width:100, height: 100}}
            />
          </View>
        }
        ItemSeparatorComponent={listSeparator}
      />
      <View>
        <TextInput 
          style={{ width: 100, borderColor: 'gray', borderWidth: 1, marginTop: 20 }}
          value={keyword}
          onChangeText={(keyword) => setKeyword(keyword)}
        />
        <Button 
          title="FIND"
          onPress={getRepositories}
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
    justifyContent: 'center',
  },
});
