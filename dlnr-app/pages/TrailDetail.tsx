import * as React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
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
    else {
        return(<Text>Popular time data not available yet</Text>)
    }
}

export default function TrailDetail(props) {
    let trail = props.route.params.trail;
    return (
        <ScrollView>
            <Text>{trail.name}</Text>
            <Text>{trail.lengthMiles} miles</Text>
            <Text>{trail.elevationFeet} ft elevation</Text>
            <GoogleBusyTimesInfo trail={trail}/>
        </ScrollView>
    );
}

