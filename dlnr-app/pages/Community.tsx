import { useNavigationState } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { ListItem, SpeedDial } from "react-native-elements";
import { getAllPosts } from "../services/apiService";
import { useUserInfo } from "../services/useUserInfo";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Community({ navigation }) {
  const [open, setOpen] = useState(false);
  const { state: data, dispatch: setData } = useUserInfo();
  const navState = useNavigationState((state) => state);

  useEffect(() => {
    navState.routeNames[navState.index] === "Community" &&
      getAllPosts(data.userInfo.token).then((res) => {
        console.log("Community");
        setData({
          type: "ADD_ALL_POSTS",
          payload: {
            posts: res,
          },
        });
      });
  }, [navState.index]);

  const renderItem = ({ item }) => {
    // @ts-ignore
    return (
      <>
        <Swipeable
          renderRightActions={() => (
            <MaterialCommunityIcons
              color="#FF0000"
              size={50}
              name="delete-outline"
            />
          )}
          renderLeftActions={() => (
            <MaterialCommunityIcons
              color="#008000"
              size={50}
              name="comment-edit-outline"
            />
          )}
        >
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
