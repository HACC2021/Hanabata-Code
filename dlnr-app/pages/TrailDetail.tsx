import * as React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions, View, Text, Image } from 'react-native';
import { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
export default function TrailDetail(props) {
    let trail = props.route.params.trail;
    return (
        <>
            <Card>
                <Card.Title>{trail.name}</Card.Title>
                <Card.Divider/>
                <Card.Image source={{uri: trail.image}}></Card.Image>
                <Card.Divider/>
                <Text style={{marginBottom: 10}}>
                    {trail.description}
                </Text>
                <Card.Divider/>
                <Text></Text>
            </Card>
        </>
    );
}

