import React, { useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { ListItem, Avatar, SpeedDial } from "react-native-elements";
import { useUserInfo } from "../services/useUserInfo";
import { Swipeable } from "react-native-gesture-handler";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function Community({ navigation }) {
  const [open, setOpen] = useState(false);
  const { state: data } = useUserInfo();

  const renderItem = ({ item }) => {
    // console.log(data.posts);
    // @ts-ignore
      return (
      <>
      <Swipeable renderRightActions={() => <MaterialCommunityIcons color="#FF0000" size={50} name='delete-outline'/>}
                   renderLeftActions={() => <MaterialCommunityIcons color="#008000" size={50} name='comment-edit-outline'/> }>
      <ListItem
        bottomDivider
        onPress={() =>
          navigation.navigate("CommunityDetail", item)
        }
      >
        {/* <Avatar source={{ uri: item.avatar_url }} /> */}
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
          <ListItem.Subtitle>{item.owner}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      </Swipeable>
      </>
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
