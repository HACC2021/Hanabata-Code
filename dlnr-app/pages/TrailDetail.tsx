import * as React from "react";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import { ActivityIndicator, StyleSheet, Dimensions, View } from "react-native";
import { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  Text,
  Card,
  ListItem,
  Button,
  Icon,
  Image,
  Divider,
} from "react-native-elements";
import { ScreenContainer } from "react-native-screens";
import { useUserInfo } from "../services/useUserInfo";

export default function TrailDetail(props) {
  let trail = props.route.params.trail;
  const { state: userInfo, dispatch: setUserInfo } = useUserInfo();

  return (
    <>
      <Text
        h4
        style={{
          textAlignVertical: "center",
          textAlign: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        {trail.name}
      </Text>
      <Image
        source={{ uri: trail.image }}
        style={{ width: 420, height: 200 }}
        PlaceholderContent={<ActivityIndicator />}
      />

      <Text style={styles.descriptionText}>{trail.description}</Text>
      <Divider orientation="horizontal" inset={true} insetType="middle" />
      <Text style={styles.descriptionText}>Island: {trail.island}</Text>
      <Text style={styles.descriptionText}>Open-Close: {trail.open} - {trail.close}</Text>
      <Text style={styles.descriptionText}>Length Miles: {trail.length}</Text>
      <Text style={styles.descriptionText}>Difficulty: {trail.difficulty}</Text>
      <Text style={styles.descriptionText}>Rating: {trail.difficulty}</Text>
      <Text style={styles.descriptionText}>Location: {trail.location}</Text>
      <Divider orientation="horizontal" inset={true} insetType="middle" />

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
              trail.coords && <Marker coordinate={trail.coords}></Marker>
          )}
        </MapView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  descriptionText: {
    fontSize: 16,
    padding: 13,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: 400,
    height: 180,
  },
});
