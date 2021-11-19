import { useNavigationState } from "@react-navigation/core";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { ListItem, SpeedDial } from "react-native-elements";
import { getAllPosts, deletePost, editPost } from "../services/apiService";
import { useUserInfo } from "../services/useUserInfo";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Community({ navigation }) {
  const { state: data, dispatch: setData } = useUserInfo();
  const navState = useNavigationState((state) => state);
  const swipeable = useRef([]);

  useEffect(() => {
    if (navState.routeNames[navState.index] === "Community") {
      getAllPosts(data.userInfo.token).then((res) => {
        console.log("Community");
        setData({
          type: "ADD_ALL_POSTS",
          payload: {
            posts: res,
          },
        });
      });
    }
  }, [navState.index]);

  const renderItem = ({ item, index }) => {
    // @ts-ignore
    const deletePostButton = () => {
      deletePost(data.userInfo.token, item._id).then((res) => {
        setData({
          type: "ADD_ALL_POSTS",
          payload: {
            posts: res,
          },
        });
      });
      swipeable.current[index].close();
    };
    const editPostButton = () => {
      swipeable.current[index].close();
      navigation.navigate("AddPost", {
        item,
        isEditMode: true,
      });
    };
    return (
      <>
        <Swipeable
          ref={(el) => (swipeable.current[index] = el)}
          renderRightActions={() => (
            <MaterialCommunityIcons
              color="#FF0000"
              size={50}
              name="delete-outline"
              style={{ alignSelf: "center" }}
              onPress={deletePostButton}
            />
          )}
          renderLeftActions={() => (
            <MaterialCommunityIcons
              color="#008000"
              size={50}
              name="comment-edit-outline"
              style={{ alignSelf: "center" }}
              onPress={editPostButton}
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
      <SafeAreaView style={{backgroundColor:"#9ca9ff"}}>
        <FlatList
          data={data.posts}
          renderItem={renderItem}
          keyExtractor={(item, i) => i.toString()}
        />
      </SafeAreaView>
      <SpeedDial
        isOpen={false}
        icon={{ name: "add", color: "#fff" }}
        openIcon={undefined}
        onOpen={() => navigation.navigate("AddPost")}
        onClose={undefined}
        overlayColor={"transparent"}
      />
    </>
  );
}
