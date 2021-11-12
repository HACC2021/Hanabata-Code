import React, { useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { ListItem, Avatar, SpeedDial } from "react-native-elements";
import { useUserInfo } from "../services/useUserInfo";

export default function Community({ navigation }) {
  const [open, setOpen] = useState(false);
  const { state: data } = useUserInfo();

  const renderItem = ({ item }) => {
    return (
      <ListItem
        bottomDivider
        onPress={() =>
          navigation.navigate("CommunityDetail", {
            name: item.detail,
          })
        }
      >
        <Avatar source={{ uri: item.avatar_url }} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <>
      <SafeAreaView>
        <FlatList
          data={data.posts}
          renderItem={renderItem}
          keyExtractor={(item, i) => i.toString()}
        />
      </SafeAreaView>
      <SpeedDial
        isOpen={open}
        icon={{ name: "edit", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          icon={{ name: "add", color: "#fff" }}
          title="Add"
          onPress={() => {
            setOpen(!open);
            navigation.navigate("AddPost");
          }}
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
