import React from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList, StatusBar } from "react-native";

export default function AllTrails(props) {

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.name} />
  );

  return (
    // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    //   <Text>Alltrails Screen</Text>

    // </View>
    
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.trails}
        renderItem={renderItem}
        keyExtractor={item => item.idKey}
      />
    </SafeAreaView>

  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});