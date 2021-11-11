import * as React from "react";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TrailDetail from "./TrailDetail";
import { useUserInfo } from "../services/useUserInfo";

export default function Home(props) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map">
        {(p) => <MapComponent {...props} />}
      </Stack.Screen>
      <Stack.Screen name="TrailDetail" component={TrailDetail} />
    </Stack.Navigator>
  );
}

const MapComponent = (props) => {
  const { state: userInfo, dispatch: setUserInfo } = useUserInfo();
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 21.4389,
          longitude: -158,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        style={styles.map}
      >
        {userInfo.trails?.map(
          (trail, index) =>
            trail.coords && (
              <Marker
                key={index}
                coordinate={trail.coords}
                title={trail.name}
                description={trail.description}
                onCalloutPress={() =>
                  props.navigation.navigate("TrailDetail", { trail })
                }
              >
                <Callout>
                  <View>
                    <Text>{trail.name}</Text>
                  </View>
                </Callout>
              </Marker>
            )
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
