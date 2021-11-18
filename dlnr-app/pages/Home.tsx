import * as React from "react";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useEffect } from "react";
import TrailDetail from "./TrailDetail";
import { useUserInfo } from "../services/useUserInfo";
import { getTrails } from "../services/apiService";
import { useNavigationState } from "@react-navigation/core";

// export default function Home(props) {
//   const Stack = createNativeStackNavigator();
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Map">
//         {(p) => <MapComponent {...props} />}
//       </Stack.Screen>
//       <Stack.Screen name="TrailDetail" component={TrailDetail} />
//     </Stack.Navigator>
//   );
// }

export default function Home(props) {
  const { state: data, dispatch: setData } = useUserInfo();
  const navState = useNavigationState((state) => state);

  useEffect(() => {
    navState.routeNames[navState.index] === "Home" &&
      getTrails().then((res) => {
        console.log("Home");
        let dayOfWeek = new Date().getDay() - 1;
        let hour = new Date().getHours();
        let tempDayOfWeek = dayOfWeek;
        let color = "#AAAAAA";
        let busyValue;

        const newTrails = res.map((trail) => {
          dayOfWeek < 0 && (tempDayOfWeek = 6);
          if (trail.traffics?.google) {
            busyValue = trail.traffics.google[tempDayOfWeek].data[hour];
            if (busyValue < 25) {
              color = "#00FF00";
            } else if (busyValue < 60) {
              color = "#00FFFF";
            } else if (busyValue < 80) {
              color = "#FFA500";
            } else {
              color = "#FF0000";
            }
            trail.color = color;
          } else {
            color = "#AAAAAA";
            trail.color = color;
          }
          return trail;
        });

        setData({
          type: "ALL_TRAILS",
          payload: {
            trails: newTrails,
          },
        });
      });
  }, [navState.index]);

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
        {data.trails?.map(
          (trail, index) =>
            trail?.coords && (
              <Marker
                key={index}
                pinColor={trail.color}
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
}

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
