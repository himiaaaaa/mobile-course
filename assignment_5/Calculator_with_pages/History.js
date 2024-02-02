import { StyleSheet, View, Text, FlatList } from 'react-native'

export default function History({ route }){
    const { data } = route.params

    return (
    <View style={styles.listContainer}>
      <Text>History:</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.operation}-${index}`}
        renderItem={({ item }) => (
          <Text>
            {item.operation} = {item.result}
          </Text>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    listContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop: 50
    },
})