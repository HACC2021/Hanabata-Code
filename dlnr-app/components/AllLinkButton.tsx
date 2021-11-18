import React from "react";
import { Button, View } from "react-native";

export default function AllLinkButton({ navigation }) {
  return (
    <View style={{ height: 200, alignItems: 'center', justifyContent: 'space-evenly'}}>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Home")}
      />
      <Button
        title="Go to Intro"
        onPress={() => navigation.navigate("Intro")}
      />
      <Button
        title="Go to AllTrails"
        onPress={() => navigation.navigate("AllTrails")}
      />
      <Button
        title="Go to Community"
        onPress={() => navigation.navigate("Community")}
      />
        <Button
            title="Go to Account"
            onPress={() => navigation.navigate("Community")}
        />
    </View>
  );
}
