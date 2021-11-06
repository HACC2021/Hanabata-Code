import React from "react";
import { Text, View } from "react-native";
import AllLinkButton from "../components/AllLinkButton";

export default function Community({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Community Screen</Text>
	<AllLinkButton navigation={navigation}/>
    </View>
  );
}