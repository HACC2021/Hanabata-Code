import React from "react";
import { Text, View } from "react-native";
import AllLinkButton from "../components/AllLinkButton";

export default function AllTrails({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Alltrails Screen</Text>
	<AllLinkButton navigation={navigation}/>
    </View>
  );
}