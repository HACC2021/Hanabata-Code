import React from "react";
import { Text, View } from "react-native";
import AllLinkButton from "../components/AllLinkButton";

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
	<AllLinkButton navigation={navigation}/>
    </View>
  );
}