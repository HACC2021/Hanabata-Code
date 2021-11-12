import React, { useState } from "react";
import { Text } from "react-native";
import { SpeedDial } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

export default function CommunityDetail(props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ScrollView>
        <Text>{props.route.params.name}</Text>
      </ScrollView>
      <SpeedDial
        isOpen={open}
        icon={{ name: "edit", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          icon={{ name: "edit", color: "#fff" }}
          title="edit"
          onPress={() => console.log("Add Something")}
        />
        <SpeedDial.Action
          icon={{ name: "delete", color: "#fff" }}
          title="Delete"
          onPress={() => console.log("Delete Something")}
        />
      </SpeedDial>
    </>
  );
}
