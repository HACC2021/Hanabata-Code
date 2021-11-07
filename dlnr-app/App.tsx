import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "./pages/Home";
import AllTrails from "./pages/AllTrails";
import Community from "./pages/Community";
import { useEffect, useState } from 'react';

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
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" >
          {props => <Home trails={ trails } />}
        </Drawer.Screen>
        <Drawer.Screen name="AllTrails" component={AllTrails} />
        <Drawer.Screen name="Community" component={Community} />
      </Drawer.Navigator>
    </NavigationContainer>
  );

  function getTrails() {
      fetch('http://localhost:3000/api/trails', { method: "GET" })
        .then(res => res.json())
        .then(response => {
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