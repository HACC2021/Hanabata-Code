import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { ListItem, Avatar, SpeedDial } from "react-native-elements";
import { getAllPosts } from "../services/apiService";
import { useUserInfo } from "../services/useUserInfo";

export default function Community({ navigation }) {
  const [open, setOpen] = useState(false);
  const { state: data, dispatch: setData } = useUserInfo();

  useEffect(() => {
    getAllPosts(data.userInfo.token).then((res) => {
      console.log(res);
      setData({
        type: "ADD_ALL_POSTS",
        payload: {
          posts: res,
        },
      });
    });
  }, []);

  const renderItem = ({ item }) => {
    // console.log(data.posts);
    return (
      <ListItem
        bottomDivider
        onPress={() => navigation.navigate("CommunityDetail", item)}
      >
        {/* <Avatar source={{ uri: item.avatar_url }} /> */}
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
          <ListItem.Subtitle>{item.owner}</ListItem.Subtitle>
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
