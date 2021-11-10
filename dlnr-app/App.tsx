import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./pages/Home";
import AllTrails from "./pages/AllTrails";
import Community from "./pages/Community";
import { useEffect, useState } from 'react';
import Login from "./pages/Login";

const Drawer = createDrawerNavigator();

function App() {
  const [page, setPage] = useState(1);
  const [trails, setTrails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMoreCommit = () => {
    setPage(page + 1);
  };


  useEffect(() => getTrails(), []);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Home" >
          {props => <Home trails={ trails } { ...props } />}
        </Drawer.Screen>
        <Drawer.Screen name="All Trails" >
          {props => <AllTrails trails={ trails } { ...props }/>}
        </Drawer.Screen>
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Community" component={Community} />
      </Drawer.Navigator>
    </NavigationContainer>
  );

  function getTrails() {
      console.log("getting trails from api...");
      fetch('http://localhost:3000/api/trails', { method: "GET" })
        .then(res => res.json())
        .then(response => {
          console.log("successfully receieved trails");
          setTrails(response);
          setIsLoading(false);
        })
        .catch(error => console.log(error));
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default App;