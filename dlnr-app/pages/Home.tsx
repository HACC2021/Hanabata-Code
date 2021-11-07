import * as React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useEffect } from 'react';

export default function Home(props) {
  console.log(props.trails);

  return (
    <View style={styles.container}>
      <MapView initialRegion={{
      latitude: 21.4389,
      longitude: -158,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5, }}
      style={styles.map}>

      { props.trails.map((trail, index) => (
        <Marker
          key={index}
          coordinate={trail.coords}
          title={trail.name}
          description={trail.description}
          />
        ))}

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
