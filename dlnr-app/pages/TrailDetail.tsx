import * as React from 'react';
import MapView from 'react-native-maps';
import { Marker, Callout } from "react-native-maps";
import { ActivityIndicator, StyleSheet, Dimensions, View } from 'react-native';
import { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
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

const GoogleBusyTimesInfo = (props) => {
    let trail = props.trail;
    if (trail.googlePlaceData?.populartimes) {
        return (
            <View>
                {trail.googlePlaceData.populartimes.map((day, index) => {
                    return(
                    <View key={"day"+index}>
                        <Text>{day.name}</Text>
                        <LineChart 
                        data={{ labels: Object.keys(day.data), datasets: [ { data: day.data}] }} 
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
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                              borderRadius: 16
                            },
                            propsForDots: {
                              r: "6",
                              strokeWidth: "2",
                              stroke: "#ffa726"
                            }
                          }}
                          bezier
                          style={{
                            marginVertical: 8,
                            borderRadius: 16
                          }}
                        />

                        {/* {
                        day.data.map((busyValue, hour) => {
                            return (
                                <Text>{busyValue}</Text>
                            )
                        })} */}
                    </View>)
                })}
            </View>
        );
    }
    return null;
}

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
