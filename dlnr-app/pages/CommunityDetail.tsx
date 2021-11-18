import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Button, Input, ListItem, SpeedDial } from "react-native-elements";
import { Swipeable } from "react-native-gesture-handler";
import {
  deleteComment,
  editComment,
  getAllComments,
  makeComment,
} from "../services/apiService";
import { useUserInfo } from "../services/useUserInfo";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CommunityDetail(props) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [detail, setDetail] = useState({ comments: [] });
  const { state: data, dispatch: setData } = useUserInfo();

  const renderItem = ({ item }) => {
    const deleteCommentButton = async () => {
      await deleteComment(
        data.userInfo.token,
        props.route.params._id,
        item._id,
        item.comment
      );
    };
    const editCommentButton = async () => {
      await editComment(
        data.userInfo.token,
        props.route.params._id,
        item._id,
        item.comment
      );
    };
    return (
      <>
        <Swipeable
          renderRightActions={() => (
            <MaterialCommunityIcons
              color="#FF0000"
              size={50}
              name="delete-outline"
              onPress={deleteCommentButton}
            />
          )}
          renderLeftActions={() => (
            <MaterialCommunityIcons
              color="#008000"
              size={50}
              name="comment-edit-outline"
              onPress={editCommentButton}
            />
          )}
        >
          <ListItem bottomDivider>
            {/* <Avatar source={{ uri: item.avatar_url }} /> */}
            <ListItem.Content>
              <ListItem.Title>{item.comment}</ListItem.Title>
              <ListItem.Subtitle>
                {item.owner + "/" + item._id}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </Swipeable>
      </>
    );
  };

  useEffect(() => {
    getAllComments(data.userInfo.token, props.route.params._id).then((res) =>
      setDetail(res)
    );
  }, [props.route.params._id]);

  const submit = async () => {
    await makeComment(
      data.userInfo.token,
      props.route.params._id,
      comment
    ).then((res) => setDetail(res));
    setComment("");
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.TopView}>
          <Text style={styles.postText}>{props.route.params.detail}</Text>
        </View>
        <View style={styles.BottomView}>
          <FlatList
            data={detail.comments}
            horizontal={false}
            style={{ marginTop: 3, backgroundColor: "#dfdfdf" }}
            renderItem={renderItem}
            keyExtractor={(item, i) => i.toString()}
          />
        </View>
        <SafeAreaView style={{ backgroundColor: "white" }}>
          <ScrollView>
            <Input
              placeholder="Comment"
              leftIcon={{ type: "font-awesome", name: "comment" }}
              value={comment}
              onChangeText={(value) => setComment(value)}
              style={{ height: "100%" }}
            />
          </ScrollView>
        </SafeAreaView>
        <Button title="Save" onPress={submit} />
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TopView: {
    flex: 0.5,
    backgroundColor: "#E2FAB5",
    padding: 20,
  },
  BottomView: {
    flex: 0.5,
  },
  postText: {
    fontSize: 17,
  },
});
