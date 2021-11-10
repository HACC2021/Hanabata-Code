import { NavigationContainer, StackActions } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList, StatusBar } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import TrailDetail from "./TrailDetail";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function AllTrails(props) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="AllTrails">
        {p => <AllTrailsComponent {...props} />}
      </Stack.Screen>
      <Stack.Screen name="TrailDetail" component={TrailDetail}/>

    </Stack.Navigator>
  );
}

const AllTrailsComponent = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.trails}
        renderItem={item => renderItem(item.item, props.navigation)}
        keyExtractor={item => item.idKey}
      />
    </SafeAreaView>
  )
}

const renderItem = (trail, navigation) => {
  return (<TouchableHighlight onPress={() => navigation.navigate('TrailDetail', { trail })}>
    <View style={styles.item}>
      <Text style={styles.title}>{trail.name}</Text>
    </View>
  </TouchableHighlight>
)};

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