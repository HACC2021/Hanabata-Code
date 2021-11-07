import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "./pages/Home";
import AllTrails from "./pages/AllTrails";
import Community from "./pages/Community";

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="AllTrails" component={AllTrails} />
        <Drawer.Screen name="Community" component={Community} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>hello world</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
