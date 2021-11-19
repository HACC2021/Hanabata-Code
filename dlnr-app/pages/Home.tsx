import * as React from "react";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import { StyleSheet, Text, View, Alert, Dimensions } from "react-native";
import { useEffect } from "react";
import { useUserInfo } from "../services/useUserInfo";
import { getTrails } from "../services/apiService";
import { useNavigationState } from "@react-navigation/core";
import * as Location from 'expo-location';
import getDistance from 'geolib/es/getDistance';
import convertDistance from 'geolib/es/convertDistance';


export default function Home(props) {
  const { state: data, dispatch: setData } = useUserInfo();
  const navState = useNavigationState((state) => state);

  function processTrails(trails, location:Location.LocationObject) {
    let dayOfWeek = new Date().getDay() - 1;
    let hour = new Date().getHours();
    let tempDayOfWeek = dayOfWeek;
    let color = "#AAAAAA";
    let busyValue;
    let points;

    return trails.map((trail) => {
      dayOfWeek < 0 && (tempDayOfWeek = 6);
      if (trail.traffics?.google) {
        busyValue = trail.traffics.google[tempDayOfWeek].data[hour];
        if (busyValue < 25) {
          color = "#00FF00";
          points = 100;
        } else if (busyValue < 60) {
          color = "#FFFF00";
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
        points = 5;
        trail.color = color;
        trail.points = points;
      }

      if (location) {
        trail.distance = convertDistance(getDistance(
          { latitude: trail.coords.latitude, longitude: trail.coords.longitude }, 
          { latitude: location.coords.latitude, longitude: location.coords.longitude}
        ), 'mi').toFixed(1);
      }
      return trail;
    });

  }

  useEffect(() => {
    navState.routeNames[navState.index] === "Map" &&
      getTrails().then((trails) => {
        console.log("Map");
        Location.requestForegroundPermissionsAsync().then(f => {
          Location.getCurrentPositionAsync().then(loc => {
            let newTrails = processTrails(trails, loc);
            setData({
              type: "ALL_TRAILS",
              payload: {
                trails: newTrails,
              },
            });
          }).catch(e => console.error(e));
        }).catch(e => {
          Alert.alert("We need your location in order to find nearby trails and to check in to trails.");
            let newTrails = processTrails(trails, null);
          setData({
            type: "ALL_TRAILS",
            payload: {
              trails: newTrails,
            },
          });
        });

      });
  }, [navState.index]);

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
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
