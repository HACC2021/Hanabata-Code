import React from "react";
import MapView, { Marker } from "react-native-maps";
import { ActivityIndicator, StyleSheet, Dimensions, View, Button, Alert } from "react-native";
import { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { LineChart } from "react-native-chart-kit";
import { Text, Image, Divider } from "react-native-elements";
import * as apiService from "../services/apiService";

const trailImage =
  "https://www.hawaiianbeachrentals.com/images/products/thingtodo/p215/p215_zoom_53de8ce1407766.06780368.jpg";

const GoogleBusyTimesInfo = (props) => {
  let trail = props.trail;
  let dayOfWeek = new Date().getDay() - 1;
  if (trail.traffics.google) {
    return (
      <View>
        {trail.traffics.google.map((day, index) => {
          return (
            dayOfWeek === index && (
              <View key={"day" + index}>
                <Text>Busy times for {day.name}</Text>
                <LineChart
                  data={{
                    labels: Object.keys(day.data),
                    datasets: [{ data: day.data }],
                  }}
                  width={Dimensions.get("window").width}
                  height={220}
                  yAxisLabel=""
                  yAxisSuffix=""
                  chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: "#ffa726",
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />

                {/* {
                        day.data.map((busyValue, hour) => {
                            return (
                                <Text>{busyValue}</Text>
                            )
                        })} */}
              </View>
            )
          );
        })}
      </View>
    );
  } else {
    return <Text>Popular time data not available yet</Text>;
  }
};


const checkInToTrail = async (trail) => { 
  console.log(trail.name);
  if (trail.distance === null || trail.distance === undefined || trail.distance > .5) {
    Alert.alert("You're too far away to check in.");
    return;
  }
  try {
    let result = await apiService.checkInToTrail(trail._id._str);
    console.log(result);
    if (result.error) {
      Alert.alert(result.error);
    } else {

    }
  } catch(e) {
    console.log(e);
  }
}

const TrailCheckIns = (props) => {

}

export default function TrailDetail(props) {
  // console.log(props);
  let trail = props.route.params.trail;
  return (
    <>
      <ScrollView>
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
          source={{ uri: trail.image || trailImage }}
          style={{ width: 420, height: 200 }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={styles.descriptionText}>{trail.description}</Text>
        <Divider orientation="horizontal" inset={true} insetType="middle" />
        <Text style={styles.points}>Reward Points: {trail.points}</Text>
        <Text style={styles.descriptionText}>
          Island: {trail.island}
          {"\n"}
          Open-Close: {trail.openHour}:{trail.openMinute} - {trail.closeHour}:
          {trail.closeMinute}
          {"\n"}
          Busy Level: {trail.currentBusyValue}
          {"\n"}
          Length Miles: {trail.lengthMiles} miles{"\n"}
          Difficulty: {trail.difficulty}
          {"\n"}
          Price: {trail.price}
          {"\n"}
          Location: {trail.location}
          {"\n"}
          Distance: {trail.distance} miles away
        </Text>
        <Button title="check in to trail" onPress={ function() { checkInToTrail(trail) }}/>
        <Divider orientation="horizontal" inset={true} insetType="middle" />

        <GoogleBusyTimesInfo trail={trail}/>

        <MapView
          showsUserLocation={true}
          region={{
            latitude: trail.coords?.latitude || 21.4389,
            longitude: trail.coords?.longitude || -158,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3,
          }}
          style={styles.map}
        >
          {trail.coords && (
            <Marker pinColor={trail.color} coordinate={trail.coords}></Marker>
          )}
        </MapView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  descriptionText: {
    fontSize: 16,
    padding: 13,
  },
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  map: {
    width: "100%",
    height: 250,
  },
  points: {
    fontSize: 25,
    alignSelf: "center",
    color: "red",
  },
});
