import * as React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export default function TrailDetail(props) {
    let trail = props.route.params.trail;
    return (
        <ScrollView>
            <Text>{trail.name}</Text>
        </ScrollView>
    );
}

