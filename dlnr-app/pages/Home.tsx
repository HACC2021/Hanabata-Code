import * as React from "react";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useEffect } from "react";
import { useUserInfo } from "../services/useUserInfo";
import { getTrails } from "../services/apiService";
import { useNavigationState } from "@react-navigation/core";

export default function Home(props) {
  const { state: data, dispatch: setData } = useUserInfo();
  const navState = useNavigationState((state) => state);

  useEffect(() => {
    navState.routeNames[navState.index] === "Map" &&
      getTrails().then((res) => {
        console.log("Map");
        let dayOfWeek = new Date().getDay() - 1;
        let hour = new Date().getHours();
        let tempDayOfWeek = dayOfWeek;
        let color = "#AAAAAA";
        let busyValue;
        let points;

        const newTrails = res.map((trail) => {
          dayOfWeek < 0 && (tempDayOfWeek = 6);
          if (trail.traffics?.google) {
            busyValue = trail.traffics.google[tempDayOfWeek].data[hour];
            if (busyValue < 25) {
              color = "#00FF00";
              points = 100;
            } else if (busyValue < 60) {
              color = "#00FFFF";
              points = 80;
            } else if (busyValue < 80) {
              color = "#FFA500";
              points = 50;
            } else {
              color = "#FF0000";
              points = 20;
            }
            trail.color = color;
            trail.points = points;
          } else {
            color = "#AAAAAA";
            points = 0;
            trail.color = color;
            trail.points = points;
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
